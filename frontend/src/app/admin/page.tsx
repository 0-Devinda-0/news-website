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
  const { user, error, isLoading } = useUser();
  const { roles } = useUserRoles();

  const getNews = async () => {
    try {
      const response = await apiClient("http://localhost:3001/api/news", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("News fetched successfully:", response);
      setNews(response as NewsArticle[]);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

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
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <header className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          {user && (
            <p className="text-lg text-gray-700">
              Welcome, <span className="font-semibold">{user.name || user.email}</span>!
            </p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Access Level: <span className="font-medium text-blue-600">{roles.join(", ") || "None"}</span>
          </p>
          <p className="text-gray-600 mt-4 italic">
            This content is visible to all authenticated users.
          </p>
        </div>
      </header>

      <main>
        <section className="bg-white shadow rounded-lg p-6">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest News Articles</h2>
          </div>

          {news.length === 0 ? (
            <p className="text-gray-600 text-lg">No news available at the moment. Check back soon!</p>
          ) : (
            <div className="flex flex-col items-center justify-center">
              {news.map((article) => (
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