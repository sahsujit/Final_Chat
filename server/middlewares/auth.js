import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";
import { adminSecretKey } from "../app.js";

const isAuthenticated = TryCatch(async (req, res, next) => {
  const token = req.cookies["chattu-token"];

  if (!token)
    return next(new ErrorHandler("Please Login to access this resource", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user =  decoded._id;

  next();
});


const adminOnly = (req, res, next) => {
  const token = req.cookies["chattu-admin-token"];

  if (!token)
    return next(new ErrorHandler("Only Admin can access this route", 401));

  const secretKey = jwt.verify(token, process.env.JWT_SECRET);

  const isMatched = secretKey === adminSecretKey;

  if (!isMatched)
    return next(new ErrorHandler("Only Admin can access this route", 401));

  next();
};


export { isAuthenticated, adminOnly };
