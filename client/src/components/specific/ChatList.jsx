import { Stack } from '@mui/material'
import React from 'react'
import ChatItem from '../shared/ChatItem'

const ChatList = ({w="100%", chatId, chats=[],    handleDeleteChat,
    onlineUsers=["1","2"],newMessagesAlert=[
    {
        chatId:"",
        count:0
    },
]}) => {
  return (
    <Stack width={w} direction={"column"}  overflow={"auto"} height={"100%"}>
        {
            chats.map((data, index)=>{
                const {avatar, _id, groupChat, name, members} = data;
                const newMessageAlert = newMessagesAlert.find(({chatId})=>chatId === _id );
                const isOnline = members.some((member)=>onlineUsers.includes(_id))
                return(
                    <ChatItem
                    newMessageAlert={newMessageAlert}
                    name={name}
                    isOnline={isOnline}
                    _id ={_id}
                    avatar={avatar}
                    groupChat={groupChat}
                    sameSender={chatId===_id}
                    index={index}
                    key={_id}
                    handleDeleteChat={handleDeleteChat}

                    />
                )
            })
        }
    </Stack>
  )
}

export default ChatList