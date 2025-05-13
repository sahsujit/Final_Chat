import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponent";
import {useFileHandler, useInputValidation, useStrongPassword} from "6pp"
import { usernameValidator } from "../utils/validators";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  const avatar = useFileHandler("single")


  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = (e) => {
    e.preventDefault()

  }

  const handleSignUp = (e) => {
    e.preventDefault()

  }
  return (
   <div
   style={
    {
      backgroundImage: `url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100%",
    }
   }
   >
     <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",

        height: "100%",
      }}
    >
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
            <form style={{ width: "100%", marginTop: "1rem" }}
            onSubmit={handleLogin}
            >
              <TextField
                required
                margin="normal"
                label="Username"
                value={username.value}
                onChange={username.changeHandler}
                variant="outlined"
                fullWidth
              />
              <TextField
                required
                margin="normal"
                label="Password"
                type="password"
                value={password.value}
                onChange={password.changeHandler}
                variant="outlined"
                fullWidth
              />
              <Button
                type="submit"
                sx={{ mt: "1rem" }}
                variant="contained"
                fullWidth
                color="primary"
              >
                Login
              </Button>
              <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>

              <Button fullWidth variant="text" onClick={toggleLogin}>
                Sign Up Instead
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">Sign Up</Typography>
            <form style={{ width: "100%", marginTop: "1rem" }}
            onSubmit={handleSignUp}
            >
              <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                <Avatar
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    objectFit: "contain",
                  }}
                  src={avatar.preview}
                />
               
                <IconButton
                  component="label"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    color: "white",
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                    "&:hover": {
                      bgcolor: "rgba(0, 0, 0, 0.7)",
                    },
                  }}
                >
                  <CameraAlt />
                  <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                </IconButton>
              </Stack>
              {
                avatar.error && (
                  <Typography color="error" m={"1rem auto"} variant="caption">
                    {avatar.error}
                  </Typography>
                )
              }
              <TextField
                required
                margin="normal"
                label="Username"
                value={username.value}
                onChange={username.changeHandler}
                variant="outlined"
                fullWidth
              />
              {
                username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )
              }
              <TextField
                required
                margin="normal"
                label="Name"
                variant="outlined"
                value={name.value}
                onChange={name.changeHandler}
                fullWidth
              />
              <TextField
                required
                margin="normal"
                label="Bio"
                value={bio.value}
                onChange={bio.changeHandler}
                variant="outlined"
                fullWidth
              />
              <TextField
                required
                margin="normal"
                label="Password"
                type="password"
                value={password.value}
                onChange={password.changeHandler}
                variant="outlined"
                fullWidth
              />
              {
                password.error && (
                  <Typography color="error" variant="caption">
                    {password.error}
                  </Typography>
                )
              }
              <Button
                type="submit"
                sx={{ mt: "1rem" }}
                variant="contained"
                fullWidth
                color="primary"
              >
                Sign Up
              </Button>
              <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>

              <Button fullWidth variant="text" onClick={toggleLogin}>
                Login Instead
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
   </div>
  );
};

export default Login;
