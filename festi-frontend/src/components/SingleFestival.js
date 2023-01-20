import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { ImageListItem } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// import Likes from './common/Likes';

import '../styles/images.scss';

import {
  Container,
  Box,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

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
      <ThemeProvider theme={darkTheme}>
        <div className='backgroundId'>
          <Container
            maxWidth='400px'
            sx={{ display: 'flex', pt: 15 }}
            className='Festival'
          >
            <Box className='info'>
              <CardContent>
                <Typography
                  variant='h5'
                  component='p'
                  style={{ font: 12, color: 'gray' }}
                >
                  {singleFestival?.name}
                </Typography>

                <Typography color='gray' sx={{ fontSize: 15 }} gutterBottom>
                  {singleFestival.description}
                </Typography>

                <Typography color='gray' sx={{ fontSize: 15 }}>
                  {singleFestival?.image}
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
                <button className='favourite'>Add to Favourites!</button>

                <button className='signUp'>
                  {/* onClick={getAnotherFestival} */}
                  Get Another Festival!{' '}
                </button>
              </CardActions>
            </Box>
            <ImageListItem key={singleFestival?.image}>
              <img
                className='singleCard'
                style={{
                  width: 800,
                  height: 400,
                  padding: 100,
                  // borderRadius: '45%',
                  objectFit: 'cover',
                }}
                src={singleFestival?.image}
                alt={singleFestival?.name}
              />
            </ImageListItem>
            <Container maxWidth='lg'> </Container>
          </Container>
        </div>
      </ThemeProvider>
    </>
  );
}
