import express from "express";
import { allChats, allUsers, allMessages, getDashboardStats } from "../controllers/admin.js";

const router = express.Router();



router.get('/users', allUsers)
router.get('/chats', allChats)
router.get("/messages", allMessages);
router.get("/stats", getDashboardStats);



export default router;