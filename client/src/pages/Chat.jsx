import React, { useRef } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Skeleton, Stack } from "@mui/material";
import { grayColor, orange } from "../constants/color";
import {InputBox} from "../components/styles/StyledComponent";

import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import FileMenu from '../components/dialogs/FileMenu';
import { sampleMessage } from '../constants/sampleData';
import MessageComponent from '../components/shared/MessageComponent';

let user ={
  _id: "skahdfg",
  name: "John Doe",
}

const Chat = () => {
  const containerRef = useRef(null)
  const fileMenuRef = useRef(null)
   
  return (
    <>
    <Stack
      ref={containerRef}
      boxSizing={"border-box"}
      padding={"1rem"}
      spacing={"1rem"}
      bgcolor={grayColor}
      height={"90%"}
      sx={{
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      {
        sampleMessage.map((i, index)=>(
          <MessageComponent key={index} user={user} message={i}/>
        ))
      }
      
    </Stack>

    <form
      style={{
        height: "10%",
      }}
      // onSubmit={submitHandler}
    >
      <Stack
        direction={"row"}
        height={"100%"}
        padding={"1rem"}
        alignItems={"center"}
        position={"relative"}
      >
        <IconButton
          sx={{
            position: "absolute",
            left: "1.5rem",
            rotate: "30deg",
          }}
          ref={fileMenuRef}
          // onClick={handleFileOpen}
        >
          <AttachFileIcon />
        </IconButton>

        <InputBox
          placeholder="Type Message Here..."
          // value={message}
          // onChange={messageOnChange}
        />

        <IconButton
          type="submit"
          sx={{
            rotate: "-30deg",
            bgcolor: orange,
            color: "white",
            marginLeft: "1rem",
            padding: "0.5rem",
            "&:hover": {
              bgcolor: "error.dark",
            },
          }}
        >
          <SendIcon />
        </IconButton>
      </Stack>
    </form>
    <FileMenu anchorE1={fileMenuRef.current}/>

    {/* <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} /> */}
  </>
  )
}

export default AppLayout(Chat)