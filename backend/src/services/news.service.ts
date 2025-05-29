import * as newsRepository from '../db/news.repository';
import { News } from '../types/news.interface';

/**
 * Adds a new news article after applying business rules.
 * @param newsData - The data for the new news article (excluding ID).
 * @returns The ID of the newly created news article, or null if creation failed.
 */
export const addNewsArticle = async (newsData: Omit<News, 'id'>): Promise<number | null> => {

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
export const getAllNews = async (
  category?: string,
  sortBy?: 'date' | 'likes' | 'views',
  order?: 'ASC' | 'DESC'
): Promise<News[]> => {
  return newsRepository.getAllArticles(category, sortBy || 'date', order || 'DESC');
};


/**
 * Retrieves a single news article by its ID.
 * @param id - The ID of the news article to retrieve.
 * @returns A promise that resolves to a NewsArticle object or null if not found.
 */
export const getSingleNewsArticle = async (id: number): Promise<News | null> => {
  
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

  if (isNaN(id) || id <= 0) {
    throw new Error('Invalid news article ID.');
  }


  const existingNewsArticle = await newsRepository.getArticleById(id);
  if (!existingNewsArticle) {
    return false;
  }

  return newsRepository.deleteArticle(id);
};