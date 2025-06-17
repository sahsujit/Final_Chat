import express from "express";
import {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMembers,
  leaveGroup,
  sendAttachments,
  getChatDetails,
  renameGroup,
  deleteChat,
  getMessages,
} from "../controllers/chat.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import {
  addMemberValidator,
  chatIdValidator,
  newGroupValidator,
  removeMemberValidator,
  sendAttachmentsValidator,
  validateHandler,
} from "../lib/validators.js";
const router = express.Router();

router.use(isAuthenticated);

router.post("/new", newGroupValidator(), validateHandler, newGroupChat);
router.get("/my", getMyChats);
router.get("/my/groups", getMyGroups);
router.put("/addmembers", addMemberValidator(), validateHandler, addMembers);
router.put(
  "/removemembers",
  removeMemberValidator(),
  validateHandler,
  removeMembers
);

router.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);
router.post(
  "/message",
  attachmentsMulter,
  sendAttachmentsValidator(),
  validateHandler,
  sendAttachments
);

router.get("/message/:id", getMessages);

router.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);

export default router;
