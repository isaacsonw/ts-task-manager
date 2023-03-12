import React, { FC, ReactElement } from 'react';
import {
  Alert,
  Box,
  Grid,
  LinearProgress,
} from '@mui/material';
import { format } from 'date-fns';
import { TaskCounter } from '../TaskCounter/taskCounter';
import { Task } from '../Task/task';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ITaskApi } from './interfaces/ITaskApi';
import { Status } from '../CreateTaskForm/enums/Status';
import { IUpdateTask } from './interfaces/IUpdateTask';
import { countTasks } from './helpers/countTasks';

export const TaskArea: FC = (): ReactElement => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(
    ['tasks'],
    async () => {
      return await sendApiRequest<ITaskApi[]>({
        route: '/tasks',
        method: 'GET',
      });
    },
  );

  const { mutate } = useMutation(
    (data: IUpdateTask) =>
      sendApiRequest({
        route: '/tasks',
        method: 'PUT',
        data,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['tasks'],
        });
      },
    },
  );

  function onStatusChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) {
    mutate({
      id,
      status: e.target.checked
        ? Status.inProgress
        : Status.todo,
    });
  }

  function markCompleteHandler(
    e:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) {
    mutate({
      id,
      status: Status.completed,
    });
  }

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
          <TaskCounter
            status={Status.todo}
            count={
              data
                ? countTasks(data, Status.todo)
                : undefined
            }
          />
          <TaskCounter
            status={Status.inProgress}
            count={
              data
                ? countTasks(data, Status.inProgress)
                : undefined
            }
          />
          <TaskCounter
            status={Status.completed}
            count={
              data
                ? countTasks(data, Status.completed)
                : undefined
            }
          />
        </Grid>
        <Grid
          item
          display="flex"
          flexDirection="column"
          md={10}
          xs={10}
        >
          <>
            {error && (
              <Alert severity="error">
                An error occurred while loading tasks
              </Alert>
            )}

            {!error &&
              Array.isArray(data) &&
              data.length === 0 && (
                <Alert severity="warning">
                  An error occurred while loading tasks
                </Alert>
              )}
          </>

          {isLoading ? (
            <LinearProgress />
          ) : (
            Array.isArray(data) &&
            data.length > 0 &&
            data.map((task, index) =>
              task.status === Status.inProgress ||
              task.status === Status.todo ? (
                <Task
                  key={index + task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  status={task.status}
                  date={new Date(task.date)}
                  onStatusChange={onStatusChangeHandler}
                  onClick={markCompleteHandler}
                />
              ) : null,
            )
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
