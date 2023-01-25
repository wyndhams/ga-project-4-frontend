import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { ImageListItem } from '@mui/material';
import Favourite from './common/Favourite';

import {
  Container,
  Box,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@mui/material';

export default function SingleFestival() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [singleFestival, setSingleFestival] = useState(['']);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    API.GET(API.ENDPOINTS.singleFestival(id))
      .then(({ data }) => {
        setSingleFestival(data);
        console.log(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
    setIsUpdated(false);
  }, [id, isUpdated]);

  const goToAllFestivals = () => navigate('/festivals');

  return (
    <>
      <Box
        className='backgroundId'
        sx={{ backgroundColor: 'black', height: '100vh' }}
      >
        <Container
          maxWidth='400px'
          sx={{ display: 'flex', pt: 15 }}
          className='Festival'
        >
          <Box className='info'>
            <CardContent>
              <Typography
                className='festival-heading'
                variant='h5'
                component='p'
                style={{ font: 12, color: 'white' }}
              >
                {singleFestival?.name}
              </Typography>

              <Typography color='white' sx={{ fontSize: 15 }} gutterBottom>
                Country: {singleFestival.country}
              </Typography>

              {/* <Typography color='text.primary'>
              {singleFestival.muscleGroup.name}
            </Typography> */}
            </CardContent>
            <CardActions>
              <Button
                className='Button'
                size='small'
                onClick={goToAllFestivals}
              >
                🔙
              </Button>
              <Favourite />

              <button className='signUp'>
                {/* onClick={getAnotherFestival} */}
                Get Another Festival!{' '}
              </button>
            </CardActions>
          </Box>
          <ImageListItem key={singleFestival?.cover_image}>
            <img
              className='singleCard'
              style={{
                width: '50vw',
                height: '50vh',
                padding: 50,
                objectFit: 'cover',
              }}
              src={singleFestival?.cover_image}
              alt={singleFestival?.name}
            />
          </ImageListItem>
        </Container>
      </Box>
    </>
  );
}
