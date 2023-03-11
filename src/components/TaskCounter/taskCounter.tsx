import React, { FC, ReactElement } from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Typography } from "@mui/material";
import { ITaskCounter } from "./interfaces/ITaskCounter";
import { Status } from "../CreateTaskForm/enums/Status";
import { emmitCorrectBorderColor } from "./helpers/emmitCorrectBorderColor";
import { emmitCorrectLabel } from "./helpers/emmitCorrectLabel";

export const TaskCounter: FC<ITaskCounter> = (props): ReactElement => {
  const {
    count = 0,
    status = Status.completed
  } = props

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
        sx={{
          backgroundColor:'transparent',
          border: '5px solid',
          width: '96px',
          height: '96px',
          marginBottom: '16px',
          borderColor: `${emmitCorrectBorderColor(status)}`
        }}
        >
          <Typography color="#ffffff" variant='h4'>{count}</Typography>
        </Avatar>
        <Typography color='#ffffff' fontWeight='bold' fontSize='20px' variant='h5'>{emmitCorrectLabel(status)}</Typography>
      </Box>
    </>
  );
};

TaskCounter.propTypes = {
  count: PropTypes.number,
  status: PropTypes.oneOf([Status.todo, Status.inProgress, Status.inProgress])

};
