import express from 'express';
import { newUser , login, getMyProfile, logout} from '../controllers/user.js';
import { multerUpload } from '../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { loginValidator, registerValidator, validateHandler } from '../lib/validators.js';
const router = express.Router();



router.post('/new',multerUpload, registerValidator(),
 validateHandler, newUser)
router.post('/login',loginValidator(), validateHandler, login)


router.use(isAuthenticated)

router.get('/me', getMyProfile)
router.get('/logout', logout)

export default router;