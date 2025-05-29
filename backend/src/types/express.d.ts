// This file is typically located in your 'types' folder
// or directly in your 'src' folder if you prefer.
// It needs to be picked up by your tsconfig.json.

import { Request } from 'express';
import { JWTPayload } from 'express-oauth2-jwt-bearer'; // Import JwtPayload type

// Extend the JwtPayload provided by express-oauth2-jwt-bearer
// to include your custom namespaced claim.
export interface CustomJwtPayload extends JWTPayload {
  'https://my-app.example.com/roles'?: string[]; // Your custom roles claim
  // Add other custom claims here if needed
}

// Extend the Request interface to include the 'auth' property
// with your custom payload type.
declare global {
  namespace Express {
    interface Request {
      auth?: {
        payload: CustomJwtPayload;
        // Other properties like header, token, etc. are also available from express-oauth2-jwt-bearer
      };
    }
  }
}