import React, { FC, ReactElement } from 'react';
import { Grid, Box } from '@mui/material';
import { format } from 'date-fns';
import { TaskCounter } from '../TaskCounter/taskCounter';

export const TaskArea: FC = (): ReactElement => {
  return (
    <Grid item md={8} p={4}>
      <Box mb={8} px={4}>
        <h2>
          Status of your task as on the{' '}
          {format(new Date(), 'PPPP - h:m:a')}
        </h2>
      </Box>

      <Grid
        container
        display="flex"
        justifyContent="center"
      >
        <Grid
          item
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          md={10}
          xs={12}
          mb={8}
        >
          {' '}
          <TaskCounter />
          <TaskCounter />
          <TaskCounter />
        </Grid>
        <Grid
          item
          display="flex"
          flexDirection="column"
          md={10}
          xs={10}
        >
          <Box>Task will come here</Box>
          <Box>Task will come here</Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
