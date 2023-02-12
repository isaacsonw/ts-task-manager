import React, { FC, ReactElement } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { TaskTitleField } from './_taskTitleField';
import { TaskDiscriptionField } from './_taskDescriptionField';
import { TaskDateField } from './_taskDateField';
import { TaskSelectField } from './TaskSelectField';
import { Priority } from './enums/Priority';
import { Status } from './enums/Status';

export const CreateTaskForm: FC = (): ReactElement => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      px={4}
      py={6}
    >
      <Typography mb={2} variant="h6" component="h2">
        Create Task Form
      </Typography>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <TaskTitleField />
        <TaskDiscriptionField />
        <TaskDateField />
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: '100%' }}
        >
          <TaskSelectField
            label="Status"
            name="status"
            items={[
              {
                label: Status.todo.toUpperCase(),
                value: Status.todo,
              },
              {
                label: Status.inProgress.toUpperCase(),
                value: Status.inProgress,
              },
              {
                label: Status.completed.toUpperCase(),
                value: Status.completed,
              },
            ]}
          />
          <TaskSelectField
            label="Priority"
            name="priority"
            items={[
              {
                label: Priority.high,
                value: Priority.high,
              },
              {
                label: Priority.normal,
                value: Priority.normal,
              },
              {
                label: Priority.low,
                value: Priority.low,
              },
            ]}
          />
        </Stack>
      </Stack>
    </Box>
  );
};
