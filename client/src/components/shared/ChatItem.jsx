import React, { memo } from 'react'
import { Link } from '../styles/StyledComponent'
import { Box, Stack, Typography } from '@mui/material'

const ChatItem = ({
    avatar=[],
    name,
    _id,
    groupChat=false, 
    sameSender,
    newMessageAlert,
    isOnline,
    handleDeleteChatOpen,
    index =0
}) => {
  return (
    <Link sx={{padding:0}} to={`/chat/${_id}`} 
    onContextMenu={(e)=>handleDeleteChatOpen(e, _id, groupChat)}
    >
      <div
      style={{
        display: "flex",
       gap: "1rem",
        alignItems: "center",
        padding: "1rem",
        color: sameSender ? "white" : "unset",
        backgroundColor:sameSender ? "black": "unset",
        position: "relative"
      }}
      >
        <Stack>
          <Typography>{name}</Typography>
          {
            newMessageAlert && (
              <Typography>{newMessageAlert.count} New message </Typography>
            )
          }

          {
            isOnline && (
              <Box
                sx={{ width: 10, height: 10, bgcolor: 'green', borderRadius: '50%'
                , position: 'absolute', top: 0, right: 0, border: '2px solid white'
                , zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'
                , fontSize: '0.8rem', color: 'white', fontWeight: 'bold'
                , transform: 'translate(50%, -50%)'
                 }}
              />
            )
          }
        </Stack>

      </div>
    </Link>
  )
}

export default memo(ChatItem)