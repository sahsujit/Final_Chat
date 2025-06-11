import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Drawer, Grid, Skeleton } from "@mui/material";
import ChatList from "../specific/ChatList";
import { sampleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "../../redux/reducers/misc";
import { useErrors } from "../../hooks/hook";
import { getSocket } from "../../socket";

const AppLayout = (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const { chatId } = params;

    const socket = getSocket();
    console.log(socket);

    const dispatch = useDispatch();

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
    useErrors([{ isError, error }]);
    const { isMobile } = useSelector((state) => state.misc);
        const { user } = useSelector((state) => state.auth);

    const handleDeleteChat = (chatId) => {
      console.log("Delete chat with id: ", chatId);
      // Add your delete chat logic here
    };
    const handleMobileClose = () => dispatch(setIsMobile(false));

    return (
      <>
        <Title />
        <Header />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              // handleDeleteChat={handleDeleteChat}
              // newMessagesAlert={newMessagesAlert}
              // onlineUsers={onlineUsers}
            />
          </Drawer>
        )}
        <Grid container height="calc(100vh - 4rem)">
          {/* Left sidebar */}
          <Grid
            size={{ md: 3, sm: 4 }}
            sx={{ display: { xs: "none", sm: "block" } }}
            height="100%"
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={[
                  {
                    chatId: "1",
                    count: 4,
                  },
                ]}
              />
            )}
          </Grid>

          {/* Main content */}
          <Grid
            size={{ md: 5, sm: 8, xs: 12, lg: 6 }}
            height="100%"
            bgcolor="primary.main"
          >
            <WrappedComponent {...props} />
          </Grid>

          {/* Right sidebar */}
          <Grid
            size={{ lg: 3, md: 4 }}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
            height={"100%"}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
