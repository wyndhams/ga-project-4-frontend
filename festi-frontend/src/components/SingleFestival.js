import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { CardMedia } from '@mui/material';
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
  const [newFestivals, setNewFestivals] = useState(['']);
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

  const getRandomFestival = (e) => {
    e.preventDefault();
    API.GET(API.ENDPOINTS.allFestivals)
      .then(({ data }) => {
        setNewFestivals(data);
        var randomInteger = Math.ceil(Math.random() * data.length - 1);
        if (randomInteger === 0) {
          randomInteger = 1;
        }
        navigate(`/festivals/${randomInteger}`);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  };

  return (
    <>
      <Box
        className='backgroundId'
        sx={{ backgroundColor: 'black', height: '100vh' }}
      >
        <Container
          maxWidth='800px'
          sx={{ display: 'flex', pt: 15 }}
          className='Festival'
        >
          <CardMedia
            component='img'
            image={singleFestival?.cover_image}
            alt={singleFestival?.name}
            sx={{
              maxHeight: 500,
              maxWidth: 1000,
              objectFit: 'contain',
              display: 'block',
            }}
          />
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
                Country: {singleFestival?.country}
              </Typography>

              <Typography color='white' sx={{ fontSize: 15 }} gutterBottom>
                Month: {singleFestival?.month}
              </Typography>

              <Typography color='white' sx={{ fontSize: 15 }} gutterBottom>
                Capacity: {singleFestival?.capacity}
              </Typography>

              <Typography color='white' sx={{ fontSize: 15 }} gutterBottom>
                Cost: {singleFestival?.cost}
              </Typography>

              {/* <Typography color='text.primary'>
                    {singleFestival.muscleGroup.name}
                  </Typography> */}
            </CardContent>
            <CardActions>
              <Button
                className='Button'
                type='submit'
                variant='contained'
                color='inherit'
                sx={{ margin: '5px' }}
                onClick={goToAllFestivals}
              >
                Back
              </Button>
              <Favourite />
              <Button
                className='Button'
                type='submit'
                variant='contained'
                color='inherit'
                sx={{ margin: '5px' }}
                onClick={getRandomFestival}
              >
                Get Another Festival!{' '}
              </Button>
            </CardActions>
          </Box>
        </Container>
      </Box>
    </>
  );
}
