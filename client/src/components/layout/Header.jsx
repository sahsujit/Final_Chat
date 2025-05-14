import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, Suspense, useState } from "react";
import { orange } from "../../constants/color";
import {
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const  SearchDialog =lazy(()=>import("../specific/Search")) ;
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));
const NotificationsDialog = lazy(() => import("../specific/Notifications"));

const Header = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const handleMobile = () => {
    setIsMobile(!isMobile);
  };
  const openSearch = () => {
    setIsSearch(!isSearch);
    console.log("Search dialog opened");
  };
  const openNotification = () => {
    setIsNotification(!isNotification);
    console.log("Notification dialog opened");
  };
  const openNewGroup = () => {
    setIsNewGroup(!isNewGroup);
    console.log("New group dialog opened");
  };
  const navigateToGroup = () => navigate("/groups");
  const logoutHandler = () => {
    console.log("Logout clicked");
    // Add your logout logic here
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height="4rem">
        <AppBar position="static" sx={{ bgcolor: orange }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Chat App
            </Typography>

            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn
                onClick={openSearch}
                title="Search"
                icon={<SearchIcon />}
              />

              <IconBtn
                onClick={openNewGroup}
                title="New Group"
                icon={<AddIcon />}
              />

              <IconBtn
                onClick={navigateToGroup}
                title="Manage Groups"
                icon={<GroupIcon />}
              />
              <IconBtn
                onClick={openNotification}
                title="Notifications"
                icon={<NotificationsIcon />}
              />
              <IconBtn
                onClick={logoutHandler}
                title="Logout"
                icon={<LogoutIcon />}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<div>Loading...</div>}>
          <SearchDialog open={isSearch} onClose={openSearch} />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<div>Loading...</div>}>
          <NewGroupDialog open={isNewGroup} onClose={openNewGroup} />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<div>Loading...</div>}>
          <NotificationsDialog open={isNotification} onClose={openNotification} />
        </Suspense>
      )}
    </>
  );
};
const IconBtn = ({ onClick, title, icon }) => {
  return (
    <Tooltip title={title} arrow>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
