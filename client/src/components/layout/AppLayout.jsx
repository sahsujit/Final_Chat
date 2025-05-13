import React from 'react';
import Header from './Header';
import Title from '../shared/Title';
import { Grid } from '@mui/material';

const AppLayout = (WrappedComponent) => {
  return (props) => (
    <>
      <Title />
      <Header />
      <Grid container 
       height="calc(100vh - 4rem)">
        {/* Left sidebar */}
        <Grid
          item
          xs={0}
          sm={4}
          md={3}
          sx={{ display: { xs: 'none', sm: 'block' } }}
          height="100%"
        >
          First
        </Grid>

        {/* Main content */}
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          lg={6}
          height="100%"
          bgcolor="primary.main"
        >
          <WrappedComponent {...props} />
        </Grid>

        {/* Right sidebar */}
        <Grid
          item
          xs={0}
          md={4}
          lg={3}
          sx={{ display: { xs: 'none', md: 'block' } }}
          height="100%"
        >
          Third
        </Grid>
      </Grid>
    </>
  );
};

export default AppLayout;
