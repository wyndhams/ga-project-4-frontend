import React, { useState } from 'react';

export default function Favourite() {
  const [favourite, setFavourite] = useState(false);

  const handleClick = () => setFavourite(!favourite);

  return (
    <button onClick={handleClick}>
      <div className='favourite'>
        <span>Favourite</span>
      </div>
    </button>
  );
}
