import React, { FC, ReactElement } from 'react';
// import PropTypes from 'prop-types';
import { Box, Avatar, Typography } from '@mui/material';

export const TaskCounter: FC = (): ReactElement => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar>
          <Typography>10</Typography>
        </Avatar>
        <Typography>Subtitle</Typography>
      </Box>
    </>
  );
};

// TaskCounter.propTypes = {};
