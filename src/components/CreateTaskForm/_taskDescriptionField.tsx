import React, { FC, ReactElement } from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@mui/material';
import { ITextField } from './interfaces/ITextField';

export const TaskDiscriptionField: FC<ITextField> = (
  props,
): ReactElement => {
  const {
    onChange = (e) => console.log(e),
    disabled = false,
  } = props;

  return (
    <TextField
      id="description"
      name="description"
      label="Description"
      placeholder="Description"
      variant="outlined"
      size="small"
      fullWidth
      multiline
      rows={4}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

TaskDiscriptionField.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};
