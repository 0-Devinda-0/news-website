import express from 'express';
import checkJwt from './middleware/auth.middleware';
import errorHandler from './middleware/error.middleware';
import apiRoutes from './routes/index';

var cors = require('cors')
const app = express();
app.use(express.json()); 
app.use(cors())
 // Importing routes
app.use('/api', apiRoutes); // Importing routes

// app.get('/api/public', (req, res) => {
//   res.json({ message: 'Hello from a public endpoint!' });
// });

// Protected route (requires a valid access token)

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

app.use(errorHandler);
// app.get('/api/private', checkJwt, (req, res) => {

//   console.log('Authenticated user ID:', req.auth?.payload.sub);
//   res.json({ message: 'Hello from a private endpoint! You are authenticated.' });
// });



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});