import { Button } from '@mui/material';
import React, { useState } from 'react';

export default function Favourite() {
  const [favourite, setFavourite] = useState(false);

  const handleClick = () => setFavourite(!favourite);

  return (
    <Button
      className='Button'
      type='submit'
      variant='contained'
      color='inherit'
      onClick={handleClick}
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
