
import { auth } from 'express-oauth2-jwt-bearer';
import * as dotenv from 'dotenv';

dotenv.config();

const checkJwt = auth({
  audience: 'https://my-awesome-backend.com', //process.env.AUTH0_AUDIENCE, // Your API Identifier from Auth0 dashboard
  issuerBaseURL: process.env.AUTH0_DOMAIN, // 'https://dev-2a5gffnn5ls8goim.us.auth0.com/',// `https://${process.env.AUTH0_DOMAIN}/`, // Your Auth0 Domain
  tokenSigningAlg: 'RS256' // Usually RS256 for Auth0
});

export default checkJwt;