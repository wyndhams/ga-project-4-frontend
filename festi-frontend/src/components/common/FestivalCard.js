import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from '@mui/material';

export default function FestivalCard({
  name,
  cover_image,
  genres,
  artist,
  id,
}) {
  const navigate = useNavigate();
  const navigateToFestival = () => navigate(`/festivals/${id}`);

  return (
    <Card sx={{ maxWidth: 345, height: 450 }}>
      <CardActionArea onClick={navigateToFestival}>
        <CardMedia
          component='img'
          image={cover_image}
          alt={name}
          sx={{ maxHeight: 345, objectFit: 'contain' }}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {name}
          </Typography>

          <Typography variant='body2' color='text.secondary'>
            {genres}
          </Typography>

          <Typography variant='body2' color='text.secondary'>
            {artist}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
