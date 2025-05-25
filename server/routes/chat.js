import express from 'express';
import { newGroupChat,getMyChats, getMyGroups, addMembers, removeMembers} from '../controllers/chat.js';
import { isAuthenticated } from '../middlewares/auth.js';
const router = express.Router();



router.use(isAuthenticated)

router.post('/new', newGroupChat)
router.get('/my', getMyChats)
router.get('/my/groups', getMyGroups)
router.put('/addmembers', addMembers)
router.put('/removemembers', removeMembers)



export default router;