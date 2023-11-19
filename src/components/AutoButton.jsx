import * as React from 'react';
import { Button } from '@mui/material';

export default function AutoButton({ onAutoButtonClick }) {
  const runAutoMode = (event) => {
    onAutoButtonClick('auto');
  };

  return (
    <Button
      variant="outlined"
      onClick={runAutoMode}
    >
      Run auto mode
    </Button>
  );
}
