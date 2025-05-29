import React, { useState, useEffect } from "react";
import EditNewsModal from "./editNews"; 
import { apiClient } from "@/lib/apiClient";

interface NewsCardProps {
    role: string;
    title: string;
    description: string;
    likes: number;
    views: number;
    category: string; 
    onLike?: () => void;
    maxDescriptionLength?: number;
    newsId: number;
    onDeleteSuccess?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
    role,
    title,
    description,
    likes,
    category,
    views,
    onLike,
    maxDescriptionLength = 150,
    newsId,
    onDeleteSuccess,
}) => {
    const [canEdit, setCanEdit] = useState(false); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (role === "Admin" || role === "Editor") {
            setCanEdit(true);
        } else {
            setCanEdit(false);
        }
    }, [role]);

    const getTruncatedDescription = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    };

    const displayedDescription = getTruncatedDescription(description, maxDescriptionLength);

    const handleEditClick = () => {
        setIsModalOpen(true);
        setError(null); 
    };

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

    const handleSaveEditedNews = async (newTitle: string, newDescription: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await apiClient(`http://localhost:3001/api/news/edit-article`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: newsId, 
                    title: newTitle,
                    description: newDescription,
                }),
            });

            console.log("News updated successfully:", response);
            setIsModalOpen(false);

        } catch (err: unknown) {
            console.error("Error updating news:", err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred during save.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteConfirmed = async () => {
        setIsLoading(true);
        setError(null);

        try {
            await apiClient(`http://localhost:3001/api/news/delete-article`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: newsId }),
            });

            setIsDeleteModalOpen(false);
            onDeleteSuccess?.();
        } catch (err: any) {
            console.error("Error deleting news:", err);
            setError(err.message || "Failed to delete article");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="container font-roboto py-3">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-100 dark:border-gray-200">
                    <a href="#">
                        <h5 className="mb-2 text-2xl tracking-tight text-blue-900">
                            {title}
                        </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-600">
                        {displayedDescription}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={onLike}
                                className="flex items-center text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                                title="Like"
                            >
                                <svg
                                    className="w-5 h-5 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-sm font-medium">{likes}</span>
                            </button>
                            <div
                                className="flex items-center text-gray-700 dark:text-gray-400"
                                title="Views"
                            >
                                <svg
                                    className="w-5 h-5 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-sm font-medium">{views}</span>
                          
                             <p className="ms-3">{category.charAt(0).toUpperCase() + category.slice(1)}</p>
                            </div>
                            
                        </div>
                        <div className="d-flex items-center space-x-4 rtl:space-x-reverse">
                            <a
                                href="#"
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Read more
                                <svg
                                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </svg>
                            </a>
                            {canEdit && (
                                <>
                                    <button
                                        onClick={handleEditClick}
                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-800"
                                    >
                                        Edit News
                                        <svg
                                            className="w-4 h-4 ml-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            ></path>
                                        </svg>
                                    </button>
                                    <button
                                        onClick={handleDeleteClick}
                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <EditNewsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                newsTitle={title}
                newsDescription={description}
                newsCategory={category}
                onSave={handleSaveEditedNews}
                isLoading={isLoading}
                error={error}
            />

            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm bg-opacity-10">
                    <div className="bg-white p-6 rounded-lg shadow-md w-96">
                        <h2 className="text-lg font-semibold text-red-600 mb-2">Delete Article</h2>
                        <p className="mb-4 text-gray-700">Are you sure you want to delete this article?</p>
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirmed}
                                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                                disabled={isLoading}
                            >
                                {isLoading ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NewsCard;
