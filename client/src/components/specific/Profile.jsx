import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";

const Profile = () => {
  return (
    <Stack direction={"column"} alignItems={"center"} spacing={"2rem"}>
      <Avatar sx={{
        width:200,
        height:200,
        objectFit:"contain",
        marginBottom:"1rem",
        border:"5px solid white"
      }}/>
      <ProfileCard heading={"Bio"} text={"This is the user bio."} />
      <ProfileCard
        heading={"Username"}
        text={"anonymous"}
        Icon={<UserNameIcon />}
      />
      <ProfileCard heading={"Name"} text={"Sujit Sah"} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Joined"}
        text={moment('2025-05-15T18:15:00.000Z').fromNow()}
       
        Icon={<CalendarIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({text, Icon, heading}) =><Stack

    direction={"row"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
    alignItems={"center"}

>
  {Icon && Icon}
  <Stack>
    <Typography variant="body1">{text}</Typography>
    <Typography color={"gray"} variant="caption">{heading}</Typography>
  </Stack>


</Stack>;

export default Profile;
