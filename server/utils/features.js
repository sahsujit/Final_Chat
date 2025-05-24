import jwt from 'jsonwebtoken';


const cookieOption = {
    maxAge: 15* 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true,
    sameSite:"none",
    secure: true,

}
const sendToken = (res, user, code, message)=>{

    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)

    return res.status(code).cookie("chattu-token", token, cookieOption).json({
        success: true,
        message,
      
        
    })
}

const emitEvent = (req,event, users,data ) =>{
    console.log("Emitting event: ", event);
}

export {sendToken, cookieOption, emitEvent}