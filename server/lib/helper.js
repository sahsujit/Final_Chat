import { userSocketIDs } from "../app";

export const getOtherMembers = (members, userId) =>
  members.find((member) => member._id.toString() !== userId.toString());



export const getSockets = (users=[])=>{
return users.map((user)=>userSocketIDs.get(user.toString()))
}