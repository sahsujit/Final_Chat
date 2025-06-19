import { Drawer, Grid, Skeleton } from "@mui/material";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../../constants/events";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { useMyChatsQuery } from "../../redux/api/api";
import {
  incrementNotification,
  setNewMessageAlert,
} from "../../redux/reducers/chat";
import { setIsMobile } from "../../redux/reducers/misc";
import { getSocket } from "../../socket";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile";
import Header from "./Header";
import { useEffect } from "react";
import { getOrSaveFromStorage } from "../../lib/features";

const AppLayout = (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const { chatId } = params;

    const socket = getSocket();
    console.log(socket);

    const dispatch = useDispatch();

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
    useErrors([{ isError, error }]);
    const { newMessagesAlert } = useSelector((state) => state.chat);


    useEffect(()=>{
      getOrSaveFromStorage({key:NEW_MESSAGE_ALERT,value:newMessagesAlert})
    },[newMessagesAlert])

    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);


    const handleDeleteChat = (chatId) => {
      console.log("Delete chat with id: ", chatId);
      // Add your delete chat logic here
    };
    const handleMobileClose = () => dispatch(setIsMobile(false));

    const newMessageAlertListener = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessageAlert(data));
      },
      [chatId]
    );

    const newRequestListener = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const refetchListener = useCallback(() => {
      refetch();
    }, []);

    const onlineUsersListener = useCallback((data) => {
      // dispatch(setOnlineUsers(data))
    }, []);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertListener,
      [NEW_REQUEST]: newRequestListener,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE_USERS]: onlineUsersListener,
    };

    useSocketEvents(socket, eventHandlers);

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
              newMessagesAlert={newMessagesAlert}
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
                newMessagesAlert={newMessagesAlert}
              />
            )}
          </Grid>

          {/* Main content */}
          <Grid
            size={{ md: 5, sm: 8, xs: 12, lg: 6 }}
            height="100%"
            bgcolor="primary.main"
          >
            <WrappedComponent {...props} chatId={chatId} user={user} />
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
