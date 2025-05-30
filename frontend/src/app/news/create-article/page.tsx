"use client";

import { useUser } from "@auth0/nextjs-auth0";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";

interface ApiResponse {
  id?: string | number; // Adjust based on the actual type of `id`
  error?: string; // Optionally include error details
  // Add other properties as needed
}

export default function CreateNewsPage() {
    
    const router = useRouter();
    const { user, error, isLoading } = useUser();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("tech");
    const [disError, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({
        title: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);

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


    const validateFields = () => {
        const errors: { title?: string; description?: string } = {};
        if (!title.trim()) errors.title = "Title is required.";
        if (!description.trim()) errors.description = "Description is required.";
        setFieldErrors({
            title: errors.title ?? "",
            description: errors.description ?? "",
        });
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!validateFields()) return;

        setLoading(true);
        try {
            const response:ApiResponse = await apiClient("http://localhost:3001/api/news/create-article", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    author: user?.name ?? "Unknown",
                    category,
                }),
            });

            if (response?.id) { 
                router.push("/news");
            } else {
                setError(`Failed to create article. Try again. ${response}`);
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError(`Something went wrong. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-roboto">
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold text-blue-600 mb-6">Create New Article</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={`mt-1 block w-full border ${fieldErrors.title ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500`}
                        />
                        {fieldErrors.title && <p className="text-red-600 text-sm mt-1">{fieldErrors.title}</p>}
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={5}
                            className={`mt-1 block w-full border ${fieldErrors.description ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500`}
                        ></textarea>
                        {fieldErrors.description && (
                            <p className="text-red-600 text-sm mt-1">{fieldErrors.description}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="tech">Tech</option>
                            <option value="politics">Politics</option>
                            <option value="sports">Sports</option>
                            <option value="world">World</option>
                        </select>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            {loading ? "Creating..." : "Create Article"}
                        </button>
                    </div>

                    {disError && <p className="text-red-600 text-sm mt-4">{disError}</p>}
                </form>
            </div>
        </div>
    );
}
