import React, { useState, useEffect } from "react";

interface EditNewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    newsTitle: string;
    newsDescription: string;
    newsCategory: string;
    onSave: (newTitle: string, newDescription: string) => void;
    isLoading: boolean;
    error: string | null;
}

const EditNewsModal: React.FC<EditNewsModalProps> = ({
    isOpen,
    onClose,
    newsTitle,
    newsDescription,
    newsCategory,
    onSave,
    isLoading,
    error,
}) => {
    const [title, setTitle] = useState(newsTitle);
    const [description, setDescription] = useState(newsDescription);
    const [category, setCategory] = useState(newsCategory);
    useEffect(() => {
        setTitle(newsTitle);
        setDescription(newsDescription);
    }, [newsTitle, newsDescription]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(title, description);
    };

    return (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/30 backdrop-blur-sm p-6 rounded-lg shadow-xl w-11/12 md:w-1/2 lg:w-1/3 relative">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 ">Edit News</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline ml-2">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700  mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700  mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
                            rows={6}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            disabled={isLoading}
                        ></textarea>
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
                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 "
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditNewsModal;