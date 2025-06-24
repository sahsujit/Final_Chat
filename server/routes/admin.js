// import express from "express";
// import { allChats, allUsers, allMessages, getDashboardStats , adminLogin, adminLogout, getAdminData} from "../controllers/admin.js";
// import { adminLoginValidator, validateHandler } from "../lib/validators.js";
// import { adminOnly } from "../middlewares/auth.js";

// const router = express.Router();

// router.post("/verify", adminLoginValidator(), validateHandler,adminLogin)
// router.get("/logout", adminLogout)


// router.use(adminOnly)
// router.get("/", getAdminData)
// router.get('/users', allUsers)
// router.get('/chats', allChats)
// router.get("/messages", allMessages);
// router.get("/stats", getDashboardStats);



// export default router;




import express from "express";
import {
  adminLogin,
  adminLogout,
  allChats,
  allMessages,
  allUsers,
  getAdminData,
  getDashboardStats,
} from "../controllers/admin.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

app.post("/verify", adminLoginValidator(), validateHandler, adminLogin);

app.get("/logout", adminLogout);

// Only Admin Can Accecss these Routes

app.use(adminOnly);

app.get("/", getAdminData);

app.get("/users", allUsers);
app.get("/chats", allChats);
app.get("/messages", allMessages);

app.get("/stats", getDashboardStats);

export default app;
