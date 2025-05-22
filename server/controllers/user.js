import {User} from "../models/user.js";
 const newUser = async(req, res, next)=>{
    const { name, username, password, bio } = req.body;

    const file = req.file;
  
    if (!file) return next(new ErrorHandler("Please Upload Avatar"));

    const avatar = {
        public_id: "",
        url: "",
      };

      const user = await User.create({
        name,
        bio,
        username,
        password,
        avatar,
      })

      res.status(201).json({
        success: true,
        message: "User Created Successfully",
        user,
      });

}


export {newUser}