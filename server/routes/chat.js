import express from "express";
import {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMembers,
  leaveGroup,
  sendAttachment,
  getChatDetails,
  renameGroup,
  deleteChat,
} from "../controllers/chat.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentMulter } from "../middlewares/multer.js";
const router = express.Router();

router.use(isAuthenticated);

router.post("/new", newGroupChat);
router.get("/my", getMyChats);
router.get("/my/groups", getMyGroups);
router.put("/addmembers", addMembers);
router.put("/removemembers", removeMembers);

router.delete("/leave/:id", leaveGroup);
router.post("/message", attachmentMulter, sendAttachment);

router.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);

export default router;
