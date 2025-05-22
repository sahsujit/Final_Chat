import express from 'express';
import { newUser } from '../controllers/user.js';
import { multerUpload } from '../middlewares/multer.js';
const router = express.Router();



router.post('/new',multerUpload, newUser)

export default router;