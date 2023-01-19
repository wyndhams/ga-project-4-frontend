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
  image,
  muscleGroup,
  difficulty,
  totalTime,
  id,
}) {
  const navigate = useNavigate();
  const navigateToFestival = () => navigate(`/festivals/${id}`);

  return (
    <Card sx={{ maxWidth: 345, height: 450 }}>
      <CardActionArea onClick={navigateToFestival}>
        <CardMedia
          component='img'
          image={image}
          alt={name}
          sx={{ maxHeight: 345, objectFit: 'contain' }}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {name}
          </Typography>

          <Typography variant='body2' color='text.secondary'>
            {muscleGroup}
          </Typography>

          <Typography variant='body2' color='text.secondary'>
            {difficulty}
          </Typography>

          <Typography variant='body2' color='text.secondary'>
            {totalTime}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
