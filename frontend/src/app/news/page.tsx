"use client";

import { useUserRoles } from "../../context/authContext";
import { useUser } from "@auth0/nextjs-auth0";
import "../globals.css";
import NewsCard from "../components/newsCard";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";

interface NewsArticle {
  id: number;
  title: string;
  description: string;
  author: string;
  likes: number;
  views: number;
  created_at: Date;
  updated_at: Date;
}

export default function AdminPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [sortBy, setSortBy] = useState<"date" | "likes" | "views">("date");
  const { user, error, isLoading } = useUser();
  const { roles } = useUserRoles();
  const [category, setCategory] = useState<string>("");


  const getNews = async () => {
  try {
    const query = new URLSearchParams();
    if (category) query.append("category", category);
    if (sortBy) query.append("sortBy", sortBy);
    query.append("order", "DESC"); // optional: or make dynamic

    const response = await apiClient(`http://localhost:3001/api/news?${query.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setNews(response as NewsArticle[]);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};


  useEffect(() => {
    getNews();
  }, [category, sortBy]); 

  const sortedNews = [...news].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else if (sortBy === "likes") {
      return b.likes - a.likes;
    } else if (sortBy === "views") {
      return b.views - a.views;
    }
    return 0;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <p className="text-xl text-red-700">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-roboto bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <header className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="container mx-auto">
          <h1 className="text-2xl text-blue-400 font-semibold">
            Welcome to <span className="text-blue-700" >.Next News</span>{user && <span className="text-blue-600">, {user.name}!</span>}
          </h1>

          <p className="text-md text-gray-500 mt-1 italic text-lg">Breaking News, Unbroken Trust.</p>


        </div>
      </header>

      <main>
        <section className="bg-white shadow rounded-lg p-6">
          <div className="container mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-500">Latest News Articles</h2>
              <div className="mt-4 sm:mt-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
  <div>
    <label className="mr-2 font-medium text-gray-700">Category:</label>
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="border text-black border-gray-300 rounded px-3 py-1"
    >
      <option value="">All</option>
      <option value="tech">Tech</option>
      <option value="politics">Politics</option>
      <option value="sports">Sports</option>
      <option value="world">World</option>
      {/* Add more if needed */}
    </select>
  </div>

  <div>
    <label className="mr-2 font-medium text-gray-700">Sort by:</label>
    <select
      value={sortBy}
      onChange={(e) =>
        setSortBy(e.target.value as "date" | "likes" | "views")
      }
      className="border text-black border-gray-300 rounded px-3 py-1"
    >
      <option value="date">Date (Newest First)</option>
      <option value="likes">Likes (Most First)</option>
      <option value="views">Views (Most First)</option>
    </select>
  </div>
</div>

              </div>
            </div>
          </div>

          {sortedNews.length === 0 ? (
            <p className="text-gray-600 text-lg">
              No news available at the moment. Check back soon!
            </p>
          ) : (
            <div className="flex flex-col items-center justify-center">
              {sortedNews.map((article) => (
                <NewsCard
                  key={article.id}
                  role={roles.join(", ")}
                  title={article.title}
                  description={article.description}
                  likes={article.likes}
                  views={article.views}
                  newsId={article.id}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
