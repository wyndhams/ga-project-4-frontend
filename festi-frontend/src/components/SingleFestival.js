import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { CardMedia } from '@mui/material';
import {
  Container,
  Box,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@mui/material';

import { API } from '../lib/api';
import Favourite from './common/Favourite';
import FestivalPicture from './common/SingleFestivalPicture';
import { NOTIFY } from '../lib/notifications';
import { useAuthenticated } from '../hooks/useAuthenticated';

import '../styles/button.css';
import '../App.css';

export default function SingleFestival() {
  const navigate = useNavigate();
  const [isLoggedIn] = useAuthenticated();
  const { id } = useParams();
  const [singleFestival, setSingleFestival] = useState(['']);
  const [newFestivals, setNewFestivals] = useState(['']);
  const [isUpdated, setIsUpdated] = useState(false);
  const [favourite, setFavourite] = useState(false);

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

  const goBack = () => navigate(-1);

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

  const deleteFestival = (e) => {
    e.preventDefault();
    API.DELETE(API.ENDPOINTS.singleFestival(id), API.getHeaders())
      .then(() => {
        NOTIFY.SUCCESS('Successfully Deleted!');
        setIsUpdated(true);
        navigate('/festivals');
      })
      .catch((e) => console.log(e));
  };

  const handleFavourite = (e) => {
    if (favourite === false) {
      setFavourite(true);
    } else {
      setFavourite(false);
    }
  };

  return (
    <>
      <Box
        className='backgroundId'
        sx={{ backgroundColor: 'black', height: '100vh' }}
      >
        <Container
          maxWidth='800px'
          sx={{ display: 'flex', pt: 15, marginLeft: '8vw', mt: '5vh' }}
          className='Festival'
        >
          <CardMedia
            // component='img'
            // image={singleFestival?.cover_image}
            // alt={singleFestival?.name}
            sx={{
              maxHeight: 500,
              maxWidth: 1000,
              objectFit: 'contain',
              display: 'block',
            }}
          >
            {singleFestival.cover_image && (
              <FestivalPicture cover_image={singleFestival.cover_image} />
            )}
          </CardMedia>
          <Box className='info' sx={{ marginLeft: '5vw', width: '40vw' }}>
            <CardContent>
              <Typography
                className='font-link-title'
                align='center'
                component='div'
                variant='header'
                style={{
                  width: '100%',
                  position: 'relative',
                  marginTop: '10vh',
                  color: 'white',
                }}
                fontWeight='fontWeightMedium'
                fontSize={70}
              >
                {singleFestival?.name}
              </Typography>

              <Typography
                className='font-link-head'
                align='center'
                component='div'
                variant='header'
                style={{
                  width: '100%',
                  position: 'relative',
                  marginTop: '5vh',
                  color: 'white',
                }}
                fontWeight='fontWeightMedium'
                sx={{ fontSize: 22 }}
                gutterBottom
              >
                Country: {singleFestival?.country}
              </Typography>

              <Typography
                className='font-link-head'
                align='center'
                component='div'
                variant='header'
                style={{
                  width: '100%',
                  position: 'relative',
                  marginTop: '2vh',
                  color: 'white',
                }}
                fontWeight='fontWeightMedium'
                sx={{ fontSize: 22 }}
                gutterBottom
              >
                Month: {singleFestival?.month}
              </Typography>

              <Typography
                className='font-link-head'
                align='center'
                component='div'
                variant='header'
                style={{
                  width: '100%',
                  position: 'relative',
                  marginTop: '2vh',
                  color: 'white',
                }}
                fontWeight='fontWeightMedium'
                sx={{ fontSize: 22 }}
                gutterBottom
              >
                Capacity: {singleFestival?.capacity}
              </Typography>

              <Typography
                className='font-link-head'
                align='center'
                component='div'
                variant='header'
                style={{
                  width: '100%',
                  position: 'relative',
                  marginTop: '2vh',
                  color: 'white',
                }}
                fontWeight='fontWeightMedium'
                sx={{ fontSize: 22 }}
                gutterBottom
              >
                Cost: {singleFestival?.cost}
              </Typography>

              {/* <Typography color='text.primary'>
                    {singleFestival.muscleGroup.name}
                  </Typography> */}
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                className='Button'
                type='submit'
                variant='contained'
                color='inherit'
                sx={{ margin: '5px' }}
                onClick={goBack}
              >
                Back
              </Button>
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
              {isLoggedIn && (
                <>
                  <button
                    className={favourite ? '' : 'favourite'}
                    variant='contained'
                    color='inherit'
                    onClick={handleFavourite}
                  >
                    FAVOURITE
                  </button>
                  <Button
                    className='Button'
                    type='submit'
                    variant='contained'
                    color='inherit'
                    sx={{ margin: '5px' }}
                    onClick={deleteFestival}
                  >
                    Delete Festival
                  </Button>
                </>
              )}
            </CardActions>
          </Box>
        </Container>
      </Box>
    </>
  );
}
