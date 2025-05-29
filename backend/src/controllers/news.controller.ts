
import { Request, Response, NextFunction } from 'express';
import * as newsService from '../services/news.service'; 

export const getAllNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, sortBy, order } = req.query;

    const validSortFields = ['date', 'likes', 'views'];
    const validOrder = ['ASC', 'DESC'];

    const safeSortBy = validSortFields.includes(sortBy as string) ? (sortBy as any) : 'date';
    const safeOrder = validOrder.includes(order as string) ? (order as any) : 'DESC';

    const news = await newsService.getAllNews(
      category as string,
      safeSortBy,
      safeOrder
    );

    res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};


export const getNewsById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const newsItem = await newsService.getSingleNewsArticle(id); 
        if (!newsItem) {
            res.status(404).json({ message: 'News article not found' });
            return;
        }
        res.status(200).json(newsItem);
    } catch (error) {
        next(error);
    }
};

export const createNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const newsData = req.body;
        const newNews = await newsService.addNewsArticle(newsData); 
        res.status(200).json({ id: newNews });
    } catch (error) {
        next(error);
    }
};

export const updateNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = Number(req.body.id);
        const updateData = req.body;
        const updatedNews = await newsService.updateNewsArticle(id, updateData); 

        if (!updatedNews) {
            res.status(404).json({ message: 'News article not found' });
            return;
        }
        res.status(200).json(updatedNews);
    } catch (error) {
        next(error);
    }
};

export const deleteNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = Number(req.body.id);
        const deleted = await newsService.deleteNewsArticle(id); 

        if (!deleted) {
            res.status(404).json({ message: 'News article not found' });
            return;
        }
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};