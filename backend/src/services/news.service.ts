// src/services/news.service.ts

import * as newsRepository from '../db/news.repository'; // Import all exported functions from the repository
import { News } from '../types/news.interface'; // Import the NewsArticle interface

/**
 * Adds a new news article after applying business rules.
 * @param newsData - The data for the new news article (excluding ID).
 * @returns The ID of the newly created news article, or null if creation failed.
 */
export const addNewsArticle = async (newsData: Omit<News, 'id'>): Promise<number | null> => {
    // Business logic: Basic validation for required fields
    if (!newsData.title || newsData.title.trim() === '') {
        throw new Error('News article title is required.');
    }
    if (!newsData.description || newsData.description.trim() === '') {
        throw new Error('News article content is required.');
    }
    if (!newsData.author || newsData.author.trim() === '') {
        throw new Error('News article author is required.');
    }
    const newsId = await newsRepository.createArticle(newsData) 
    return newsId;
};

/**
 * Retrieves all news articles.
 * @returns A promise that resolves to an array of NewsArticle objects.
 */
export const getAllNews = async (): Promise<News[]> => {
    return newsRepository.getAllArticles();
};

/**
 * Retrieves a single news article by its ID.
 * @param id - The ID of the news article to retrieve.
 * @returns A promise that resolves to a NewsArticle object or null if not found.
 */
export const getSingleNewsArticle = async (id: number): Promise<News | null> => {
    // Business logic: Ensure ID is a valid number before querying
    if (isNaN(id) || id <= 0) {
        throw new Error('Invalid news article ID.');
    }
    return newsRepository.getArticleById(id);
};

/**
 * Updates an existing news article.
 * @param id - The ID of the news article to update.
 * @param updateData - The partial data to update the news article with (excluding ID).
 * @returns A promise that resolves to true if the update was successful, false otherwise.
 */
export const updateNewsArticle = async (id: number, updateData: Partial<Omit<News, 'id'>>): Promise<boolean> => {
    // Business logic: Validate ID
    if (isNaN(id) || id <= 0) {
        throw new Error('Invalid news article ID.');
    }

    if (Object.keys(updateData).length === 0) {
        throw new Error('No update data provided.');
    }

    const existingNewsArticle = await newsRepository.getArticleById(id);
    if (!existingNewsArticle) {
        return false;
    }
    return newsRepository.updateArticle(id, updateData);
};

/**
 * Deletes an existing news article.
 * @param id - The ID of the news article to delete.
 * @returns A promise that resolves to true if the deletion was successful, false otherwise.
 */
export const deleteNewsArticle = async (id: number): Promise<boolean> => {
    // Business logic: Validate ID
    if (isNaN(id) || id <= 0) {
        throw new Error('Invalid news article ID.');
    }

    // Ensure the news article exists before attempting to delete
    const existingNewsArticle = await newsRepository.getArticleById(id);
    if (!existingNewsArticle) {
        return false; // News article not found
    }

    return newsRepository.deleteArticle(id);
};