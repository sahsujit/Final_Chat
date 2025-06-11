import express from "express";
import {
  newUser,
  login,
  getMyProfile,
  logout,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getMyNotifications,
  getMyFriends
} from "../controllers/user.js";
import { multerUpload } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  acceptRequestValidator,
  loginValidator,
  registerValidator,
  sendRequestValidator,
  validateHandler,
} from "../lib/validators.js";
const router = express.Router();

router.post(
  "/new",
  multerUpload,
  registerValidator(),
  validateHandler,
  newUser
);
router.post("/login", loginValidator(), validateHandler, login);

router.use(isAuthenticated);

router.get("/me", getMyProfile);
router.get("/logout", logout);

router.get("/search", searchUser);

router.put(
  "/sendrequest",
  sendRequestValidator(),
  validateHandler,
  sendFriendRequest
);

router.put(
  "/acceptrequest",
  acceptRequestValidator(),
  validateHandler,
  acceptFriendRequest
);


router.get("/notifications", getMyNotifications);
router.get("/friends", getMyFriends);

export default router;
