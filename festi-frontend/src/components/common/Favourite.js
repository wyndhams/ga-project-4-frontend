import { Button } from '@mui/material';
import React, { useState } from 'react';

export default function Favourite() {
  return (
    <Button
      className='Button'
      type='submit'
      variant='contained'
      color='inherit'
      sx={{
        border: '2px black solid',
        borderRadius: '10px',
        margin: '5px',
        minWidth: '100px',
      }}
    >
      Favourite
    </Button>
  );
}
