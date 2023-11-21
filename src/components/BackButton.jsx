import * as React from 'react';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";


export default function BackButton({ onClearButtonClick }) {
  let navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      onClick={() => navigate(-1)}
    >
      <ArrowBackIcon/> Go back
    </Button>
  );
}
