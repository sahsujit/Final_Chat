import React, { useState } from "react";
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import {CameraAlt as CameraAltIcon} from '@mui/icons-material'
import { VisuallyHiddenInput } from "../components/styles/StyledComponent";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin =()=>{
    setIsLogin(!isLogin);
  }
  return (
    <Container component={"main"} maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
         
        height: "100%",
      }}>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>
            <form 
            style={{ width: "100%", marginTop: "1rem" }}
            >
              <TextField
                required
                margin="normal"
                label="Username"
                variant="outlined"
                fullWidth
              />
              <TextField
                required
                margin="normal"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <Button 
              type="submit" 
              sx={{ mt: "1rem" }}
              variant="contained"
                fullWidth
               color="primary">
                Login
              </Button>
              <Typography
              textAlign={"center"}
              m={'1rem'}
              >OR</Typography>

              <Button
                fullWidth
                variant="text"
                onClick={toggleLogin}
               >
                Sign Up Instead
              </Button>
            </form>
          </>
        ) : (
            <>
            <Typography variant="h5">Sign Up</Typography>
            <form 
            style={{ width: "100%", }}
            >

                <Stack
                position={"relative"}
                width={"10rem"}
                margin={"auto"}
                >
                    <Avatar
                    sx={{
                        width:"10rem",
                        height:"10rem",
                        objectFit:"contain"
                    }}
                    />
                    <IconButton
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        bgcolor:"rgba(255, 255, 255, 0.5)",
                        "&:hover": {
                            bgcolor: "rgba(255, 255, 255, 0.8)",
                        },
                    }}
                    >
                        <>
                    <CameraAltIcon/>
                    <VisuallyHiddenInput type="file"/>
                        </>
                    </IconButton>

                </Stack>
              <TextField
                required
                margin="normal"
                label="Username"
                variant="outlined"
                fullWidth
              />
              <TextField
                required
                margin="normal"
                label="Name"
                variant="outlined"
                fullWidth
              />
              <TextField
                required
                margin="normal"
                label="Bio"
                variant="outlined"
                fullWidth
              />
              <TextField
                required
                margin="normal"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <Button 
              type="submit" 
              sx={{ mt: "1rem" }}
              variant="contained"
                fullWidth
               color="primary">
                Sign Up
              </Button>
              <Typography
              textAlign={"center"}
              m={'1rem'}
              >OR</Typography>

              <Button
                fullWidth
                variant="text"
                onClick={toggleLogin}
               >
                Login Instead
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
