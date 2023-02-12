import React, { FC, ReactElement } from 'react';
import { Grid } from '@mui/material';
import { Profile } from '../Profile/profile';
import { CreateTaskForm } from '../CreateTaskForm/createTaskForm';

export const Sidebar: FC = (): ReactElement => {
  return (
    <Grid
      item
      md={4}
      sx={{
        height: '100vh',
        position: 'fixed',
        right: 0,
        top: 0,
        width: '100%',
        backgroundColor: 'background.paper',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Profile name="Emma" />
      <CreateTaskForm />
    </Grid>
  );
};
