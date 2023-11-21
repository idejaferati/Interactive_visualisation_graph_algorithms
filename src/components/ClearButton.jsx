import * as React from 'react';
import { Button } from '@mui/material';

export default function ClearButton({ onClearButtonClick }) {
  const clear = (event) => {
    onClearButtonClick('manual');
  };

  return (
    <Button
      variant="outlined"
      color="error"
      onClick={clear}
    >
      Clear graph data
    </Button>
  );
}
