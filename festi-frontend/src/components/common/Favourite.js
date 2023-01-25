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
    >
      Favourite
    </Button>
  );
}
