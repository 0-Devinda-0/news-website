
export interface News {
    id: number;
    title: string;
    description?: string;
    author?: string; 
    category?: string;
    likes?: number;
    views?: number;
    created_at?: Date;
    updated_at?: Date; 
}