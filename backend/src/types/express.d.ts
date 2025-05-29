
import { Request } from 'express';
import { JWTPayload } from 'express-oauth2-jwt-bearer'; 

export interface CustomJwtPayload extends JWTPayload {
  'https://my-app.example.com/roles'?: string[]; 
 
}


declare global {
  namespace Express {
    interface Request {
      auth?: {
        payload: CustomJwtPayload;
       
      };
    }
  }
}