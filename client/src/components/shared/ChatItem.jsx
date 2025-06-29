import React, { memo } from 'react'
import { Link } from '../styles/StyledComponent'
import { Box, Stack, Typography } from '@mui/material'
import AvatarCard from './AvatarCard'
import{motion} from 'framer-motion'

const ChatItem = ({
    avatar=[],
    name,
    _id,
    groupChat=false, 
    sameSender,
    newMessageAlert,
    isOnline,
    handleDeleteChat,
    index =0
}) => {
  return (
    <Link sx={{padding:0}} to={`/chat/${_id}`} 
    onContextMenu={(e)=>handleDeleteChat(e, _id, groupChat)}
    >
      <motion.div
       initial={{ opacity: 0, y: "-100%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * index }}
      style={{
         display: "flex",
          gap: "1rem",
          alignItems: "center",
          backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "white" : "unset",
          position: "relative",
          padding: "1rem",
      }}
      >
        <AvatarCard avatar={avatar} />
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
               sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
              />
            )
          }
        </Stack>

      </motion.div>
    </Link>
  )
}

export default memo(ChatItem)