import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Box,
  Stack,
  Typography,
  LinearProgress,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';
import { TaskTitleField } from './_taskTitleField';
import { TaskDiscriptionField } from './_taskDescriptionField';
import { TaskDateField } from './_taskDateField';
import { TaskSelectField } from './_taskSelectField';
import { Priority } from './enums/Priority';
import { Status } from './enums/Status';
import { ICreateTasks } from './interfaces/ICreateTasks';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';

export const CreateTaskForm: FC = (): ReactElement => {
  const initialState = {
    title: '',
    date: new Date(),
    description: '',
    priority: Priority.normal,
    status: Status.todo,
  };

  const queryClient = useQueryClient();

  const [taskInputs, setTaskInputs] =
    useState<ICreateTasks>(initialState);
  const { mutate, isLoading, isSuccess } = useMutation(
    (data: ICreateTasks) =>
      sendApiRequest({
        route: '/tasks',
        method: 'POST',
        data,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks']);
      },
    },
  );

  const [showSuccess, setShowSuccess] =
    useState<boolean>(false);

  const handleSubmit = useCallback(() => {
    if (
      !taskInputs.title ||
      !taskInputs.description ||
      !taskInputs.date
    ) {
      return;
    }

    const task = {
      ...taskInputs,
      date: taskInputs.date.toString(),
    };

    mutate(task);
    setTaskInputs(initialState);
  }, [taskInputs]);

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      setTaskInputs(initialState);
    }

    const successTimeOut = setTimeout(() => {
      setShowSuccess(false);
    }, 7000);

    return () => {
      clearTimeout(successTimeOut);
    };
  }, [isSuccess]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      px={4}
      py={6}
    >
      {showSuccess && (
        <Alert
          severity="success"
          sx={{
            width: '100%',
            marginBottom: '16px',
            border: '1px solid',
            borderColor: 'success.light',
          }}
        >
          <AlertTitle>Success</AlertTitle>
          The task has been successfully created
        </Alert>
      )}

      <Typography mb={2} variant="h6" component="h2">
        Create Task Form
      </Typography>
      <Stack sx={{ width: '100%' }} spacing={4}>
        <TaskTitleField
          disabled={isLoading}
          onChange={(e) =>
            setTaskInputs({
              ...taskInputs,
              title: e.target.value,
            })
          }
        />
        <TaskDiscriptionField
          disabled={isLoading}
          onChange={(e) =>
            setTaskInputs({
              ...taskInputs,
              description: e.target.value,
            })
          }
        />
        <TaskDateField
          value={taskInputs.date}
          disabled={isLoading}
          onChange={(date) =>
            setTaskInputs({
              ...taskInputs,
              date: date,
            })
          }
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: '100%' }}
        >
          <TaskSelectField
            label="Status"
            name="status"
            disabled={isLoading}
            value={taskInputs.status}
            onChange={(status) =>
              setTaskInputs({
                ...taskInputs,
                status: status.target.value as string,
              })
            }
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
            disabled={isLoading}
            value={taskInputs.priority}
            onChange={(priority) =>
              setTaskInputs({
                ...taskInputs,
                priority: priority.target.value as string,
              })
            }
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
        {isLoading && <LinearProgress />}
        <Button
          disabled={
            !taskInputs.title ||
            !taskInputs.date ||
            !taskInputs.description ||
            !taskInputs.date ||
            !taskInputs.priority ||
            !taskInputs.status ||
            isLoading
          }
          onClick={handleSubmit}
          variant="contained"
          size="large"
          fullWidth
        >
          Create a Task
        </Button>
      </Stack>
    </Box>
  );
};
