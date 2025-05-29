
import { auth } from 'express-oauth2-jwt-bearer';
import * as dotenv from 'dotenv';

dotenv.config();

const checkJwt = auth({
  audience: 'https://my-awesome-backend.com', 
  issuerBaseURL: process.env.AUTH0_DOMAIN, 
  tokenSigningAlg: 'RS256'
});

export default checkJwt;