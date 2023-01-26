import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

import { thumbnail } from '@cloudinary/url-gen/actions/resize';

export default function FestivalPictureAccount({ cover_image }) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    },
  });

  const myImage = cld.image(cover_image);

  myImage.resize(thumbnail().width(220).height(240));

  return (
    <>
      <AdvancedImage cldImg={myImage} />
    </>
  );
}
