import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationCount: 0,
  newMessagesAlert:[{
    chatId:"",
    count:0
  }]
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
   incrementNotification:(state)=>{
    state.notificationCount +=1
   },
   resetNotification:(state)=>{
    state.notificationCount = 0
   }   ,
   setNewMessageAlert:(state,action)=>{
    const chatId = action.payload.chatId
       const index = state.newMessagesAlert.findIndex((item)=>item.chatId === chatId)

       if(index !== -1){
        state.newMessagesAlert[index].count +=1
       }else{
        state.newMessagesAlert.push({
            chatId,
            count:1
        })
       }
   }
  },
});

export default chatSlice;
export const {
 incrementNotification,
 resetNotification,
 setNewMessageAlert
} =chatSlice.actions;
