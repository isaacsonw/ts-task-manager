import React, { FC, ReactElement } from 'react';
import { Grid } from '@mui/material';
import { TaskArea } from '../../components/TaskArea/taskArea';
import { Sidebar } from '../../components/Sidebar/sidebar';

export const Dashbaord: FC = (): ReactElement => {
  return (
    <Grid container minHeight="100vh" p={0} m={0}>
      <TaskArea />
      <Sidebar />
    </Grid>
  );
};
