import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

const LayoutLoader = () => {
  return (
    <Grid container height={"calc(100vh - 4rem)"} spacing={"1rem"}>
      {/* Left sidebar */}
      <Grid
        size={{ md: 3, sm: 4 }}
        sx={{ display: { xs: "none", sm: "block" } }}
        height={"100%"}
      >
        <Skeleton variant="rectangular" height={"100vh"} />
      </Grid>

      {/* Main content */}
      <Grid size={{ md: 5, sm: 8, xs: 12, lg: 6 }} height="100%">
        <Stack spacing={"1rem"} >
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={"5rem"} />
          ))}
        </Stack>
      </Grid>

      {/* Right sidebar */}
      <Grid
        size={{ lg: 3, md: 4 }}
        sx={{ display: { xs: "none", md: "block" } }}
        height="100%"
      >
        <Skeleton variant="rectangular" height={"100vh"} />
      </Grid>
    </Grid>
  );
};

export default LayoutLoader;
