import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

import { thumbnail } from '@cloudinary/url-gen/actions/resize';

export default function FestivalPicture({ cover_image }) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    },
  });

  const myImage = cld.image(cover_image);

  myImage.resize(thumbnail().width(700).height(700));

  return (
    <div>
      <AdvancedImage cldImg={myImage} />
    </div>
  );
}
