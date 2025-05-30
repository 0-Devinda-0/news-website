import express, { Request, Response, NextFunction } from 'express';
import errorHandler from './middleware/error.middleware';
import apiRoutes from './routes/index';

var cors = require('cors')
const app = express();
app.use(express.json()); 
app.use(cors())

app.use('/api', apiRoutes); 

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Not Found' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});