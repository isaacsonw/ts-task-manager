import React, { FC, ReactElement } from 'react';
import { Box } from '@mui/material';
import { TaskHeader } from './_taskHeader';
import { TaskDescription } from './_taskDescription';
import { TaskFooter } from './_taskFooter';
import { ITask } from './interfaces/ITask';
import { Priority } from '../CreateTaskForm/enums/Priority';
// import { Status } from '../CreateTaskForm/enums/Status';
import PropTypes from 'prop-types';
import { emmitPriorityBorderColor } from './helpers/emmitPriorityBorderColor';

export const Task: FC<ITask> = (props): ReactElement => {
  const {
    priority = Priority.normal,
    onStatusChange = (e) => console.log(e),
    // status = Status.completed,
    title = 'First task title',
    date = new Date(),
    onClick = (e) => console.log(e),
    description = 'First task description',
  } = props;
  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="flex-start"
      flexDirection="column"
      p={2}
      mb={4}
      sx={{
        width: '100%',
        backgroundColor: 'background.paper',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: emmitPriorityBorderColor(priority),
      }}
    >
      <TaskHeader date={date} title={title} />
      <TaskDescription description={description} />
      <TaskFooter
        onStatusChange={onStatusChange}
        onClick={onClick}
      />
    </Box>
  );
};

Task.propTypes = {
  priority: PropTypes.string,
  onStatusChange: PropTypes.func,
  status: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  onClick: PropTypes.func,
  description: PropTypes.string,
};
