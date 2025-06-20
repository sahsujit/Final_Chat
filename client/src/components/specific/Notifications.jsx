import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography
} from "@mui/material";
import { memo } from "react";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from "../../redux/api/api";
import { transformImage } from "../../lib/features";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/misc";

const Notifications = () => {
  const dispatch = useDispatch()

  const {isNotification} = useSelector((state)=>state.misc)

  const {isLoading, data, error, isError} = useGetNotificationsQuery()

  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation)
  const friendRequestHandler = async({ _id, accept }) => {
    dispatch(setIsNotification(false));

     await acceptRequest("Accepting...", { requestId: _id, accept });
  //  try {
  //   const res = await acceptRequest({ requestId:_id, accept })

  //   if(res.data?.success){
  //     toast.success(res.data.message)
  //   }else{
  //     toast.error(res?.error?.data?.message || "Something went wrong")
  //   }
  //  } catch (error) {
  //   console.log(error);
  //  }
  };
   
  const closeHandler = ()=>dispatch(setIsNotification(false))

  useErrors([{ error, isError }]);
  return (
    <Dialog open = {isNotification} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
         {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests.length > 0 ? (
              data?.allRequests?.map(({ sender, _id }) => (
                <NotificationItem
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                  key={_id}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>0 notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={transformImage(avatar)} />

        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {`${name} sent you a friend request.`}
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
