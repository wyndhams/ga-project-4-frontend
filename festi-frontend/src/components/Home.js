import * as React from 'react';
import { Link } from 'react-router-dom';
// import HomeImage from '../assets/home-background.png';
import '../styles/Home.scss';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Home = () => (
  <Grid className='Home' container component='main' sx={{ height: '100vh' }}>
    <Typography
      align='center'
      component='div'
      variant='body1'
      style={{
        height: 100,
        width: '100%',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '70vh',
          justify: 'center',
          left: '46%',
          zIndex: 'tooltip',
        }}
      >
        <Link
          style={{ color: 'inherit', textDecoration: 'inherit' }}
          to='/workout-directory'
        >
          <Button
            className='homeButton'
            sx={{
              border: 3,
              fontSize: 32,
              width: 200,
              height: 60,
              pt: 2,
            }}
            color='secondary'
            variant='outlined'
            size='large'
          >
            Submit!
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          // position: 'absolute',
          top: 0,
          // left: '50%',
          zIndex: 'modal',
        }}
      >
        {/* <img src={HomeImage} alt='Festival Main Image' /> */}
      </Box>
    </Typography>
  </Grid>
);

export default Home;
