import React from 'react';
import Header from './Header';
import Title from '../shared/Title';
import { Grid } from '@mui/material';
import ChatList from '../specific/ChatList';
import { sampleChats } from '../../constants/sampleData';
import { useParams } from 'react-router-dom';
import Profile from '../specific/Profile';

const AppLayout = (WrappedComponent) => {
 
  return (props) => {
    const params = useParams();
    const { chatId } = params;
    const handleDeleteChat = (chatId) => {
      console.log("Delete chat with id: ", chatId);
      // Add your delete chat logic here
    }
    
    return(
      <>
      <Title />
      <Header />
      <Grid container 
       height="calc(100vh - 4rem)">
        {/* Left sidebar */}
        <Grid
          size={{ md: 3, sm: 4 }}
          
       
         
          sx={{ display: { xs: 'none', sm: 'block' } }}
          height="100%"
        >
         <ChatList chats={sampleChats} chatId={chatId} handleDeleteChat={handleDeleteChat} newMessagesAlert={[
          {
            chatId:"1",
            count:4
          }
         ]}/>
        </Grid>

        {/* Main content */}
        <Grid
          size={{ md: 5, sm: 8, xs:12, lg:6 }}
         
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
          <Profile/>
        </Grid>
      </Grid>
    </>
    )
  }
    
    
 ;
};

export default AppLayout;
