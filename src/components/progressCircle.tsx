import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const ProgressCircle = () => {
  return (
    <Box sx={{ marginTop: '40vh' }}>
      <CircularProgress size={100} />
    </Box>
  );
};
