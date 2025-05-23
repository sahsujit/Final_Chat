import express from 'express';
import { newUser , login, getMyProfile} from '../controllers/user.js';
import { multerUpload } from '../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/auth.js';
const router = express.Router();



router.post('/new',multerUpload, newUser)
router.post('/login', login)
router.get('/me', isAuthenticated, getMyProfile)

export default router;