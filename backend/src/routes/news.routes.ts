import { Router } from 'express';
import checkJwt from '../middleware/auth.middleware';
import checkRoles from '../middleware/checkRole.middleware'; 
import * as newsController from '../controllers/news.controller';
const router = Router();

router.get('/', checkJwt, checkRoles(['Admin','Editor','Basic']), newsController.getAllNews, (req, res) => {
    console.log('Authenticated user ID:', req.auth?.payload.sub);
    res.json({ message: 'Hello from a private endpoint! You are authenticated.' });
});

router.post('/create-article', checkJwt, checkRoles(['Admin', 'Editor']),newsController.createNews, (req, res) => {
  console.log('Authenticated user ID:', req.auth?.payload.sub);
    res.json({ message: 'Article created by Admin or Editor.' });
});

router.post('/edit-article', checkJwt, checkRoles(['Admin', 'Editor']),newsController.updateNews, (req, res) => {
    res.json({ message: 'Article created by Admin or Editor.' });
});

router.delete('/delete-data', checkJwt, checkRoles(['Admin']),newsController.deleteNews, (req, res) => {
    console.log('Attempting to delete data by Admin:', req.auth?.payload.sub);
    res.json({ message: 'Data deleted by Admin.' });
});

export default router;
