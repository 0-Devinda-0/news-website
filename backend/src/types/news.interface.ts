
export interface News {
    id: number;
    title: string;
    description?: string;
    author?: string; 
    created_at?: Date; // Assuming your DB has this
    updated_at?: Date; // Assuming your DB has this
}