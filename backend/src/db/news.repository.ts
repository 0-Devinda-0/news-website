
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import pool from '../config/db.config';
import { News } from '../types/news.interface';

export const createArticle = async (article: Omit<News, 'id'>): Promise<number | null> => {
    const [result] = await pool.execute<ResultSetHeader>(
        'INSERT INTO articles (title, description, author, category) VALUES (?, ?, ?, ?)',
        [article.title, article.description, article.author, article.category]
    );
    return result.insertId;
};

export const getAllArticles = async (
    category?: string,
    sortBy: 'date' | 'likes' | 'views' = 'date',
    order: 'ASC' | 'DESC' = 'DESC'
): Promise<News[]> => {
    let query = 'SELECT * FROM articles';
    const params: any[] = [];

    if (category) {
        query += ' WHERE category = ?';
        params.push(category);
    }

    query += ` ORDER BY ${sortBy} ${order}`;

    const [rows] = await pool.execute<RowDataPacket[]>(query, params);
    return rows as News[];
};



export const getArticleById = async (id: number): Promise<News | null> => {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM articles WHERE id = ?', [id]);
    if (rows.length === 0) {
        return null;
    }
    return rows[0] as News;
};

export const updateArticle = async (id: number, article: Partial<Omit<News, 'id'>>): Promise<boolean> => {
    const fields = Object.keys(article);
    const values = Object.values(article);

    if (fields.length === 0) {
        return false;
    }

    const setClauses = fields.map(field => `${field} = ?`).join(', ');
    const query = `UPDATE articles SET ${setClauses} WHERE id = ?`;

    const [result] = await pool.execute<ResultSetHeader>(query, [...values, id]);
    return result.affectedRows > 0;
};

export const deleteArticle = async (id: number): Promise<boolean> => {
    const [result] = await pool.execute<ResultSetHeader>('DELETE FROM articles WHERE id = ?', [id]);
    return result.affectedRows > 0;
};