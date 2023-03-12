import PropTypes from 'prop-types';
import React, { FC, ReactElement } from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { ITaskFooter } from './interfaces/ITaskFooter';
import { Status } from '../CreateTaskForm/enums/Status';

export const TaskFooter: FC<ITaskFooter> = (
  props,
): ReactElement => {
  const {
    onStatusChange = (e) => console.log(e),
    onClick = (e) => console.log(e),
    id,
    status,
  } = props;
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={4}
    >
      <FormControlLabel
        label="In Progress"
        control={
          <Switch
            onChange={(e) => onStatusChange(e, id)}
            color="warning"
            checked={status === Status.inProgress}
          />
        }
      />
      {status === Status.inProgress && (
        <Button
          variant="contained"
          size="small"
          color="success"
          sx={{ color: '#ffffff' }}
          onClick={(e) => onClick(e, id)}
        >
          Mark complete
        </Button>
      )}
    </Box>
  );
};

TaskFooter.propTypes = {
  status: PropTypes.string,
  onStatusChange: PropTypes.func,
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired,
};
