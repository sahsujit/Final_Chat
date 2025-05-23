import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";

const isAuthenticated = TryCatch(async (req, res, next) => {
  const token = req.cookies["chattu-token"];
  console.log("token:", token);

  if (!token)
    return next(new ErrorHandler("Please Login to access this resource", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await decoded._id;

  next();
});

export { isAuthenticated };
