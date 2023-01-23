import { Link } from 'react-router-dom';
import HomeImage from '../assets/home-image.png';
// import '../styles/Home.scss';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  topBottomRow: {
    height: '10vh',
  },
  middleRow: {
    height: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Typography
        align='center'
        component='div'
        variant='header'
        color='primary'
        style={{
          height: 100,
          width: '100%',
          position: 'relative',
          marginTop: '15vh',
        }}
        fontWeight='fontWeightMedium'
        fontSize={50}
      >
        Welcome
      </Typography>
      <Typography
        align='center'
        component='div'
        variant='header'
        color='primary'
        style={{
          height: 100,
          width: '100%',
          position: 'relative',
        }}
        fontSize={20}
      >
        Looking for a new festival for the summer? We've got you covered... Use
        the filters below and find the perfect festival for you!
      </Typography>
      <Grid
        container
        className={classes.root}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Grid item xs={12} className={classes.middleRow}>
          <img
            src={HomeImage}
            alt='Graphic of people dancing around a drum'
            style={{ maxWidth: '100%' }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          className={classes.topBottomRow}
          marginLeft={20}
          marginRight={20}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            className='homeButton'
            sx={{
              border: 3,
              fontSize: 20,
              width: 200,
              height: 60,
            }}
            color='primary'
            variant='outlined'
            size='small'
          >
            SEARCH
          </Button>
          <Button
            className='homeButton'
            sx={{
              border: 3,
              fontSize: 20,
              width: 200,
              height: 60,
            }}
            color='primary'
            variant='outlined'
            size='small'
          >
            ALL FESTIVALS
          </Button>
        </Grid>
      </Grid>
      {/* <Box sx={{ flexGrow: 1 }}>
        <Grid
          className='Home'
          container
          spacing={1}
          component='main'
          color='primary'
          sx={{ height: '100vh' }}
        >
          <Typography

          >
            <Grid container item spacing={3}>
              <Box
                component='img'
                sx={{
                  position: 'relative',
                  top: '10vh',
                  height: '80vh',
                  zIndex: 'tooltip',
                }}
                alt='Festival Graphic'
                src={HomeImage}
              />
            </Grid>
            <Link
              style={{ color: 'inherit', textDecoration: 'inherit' }}
              to='/festivals'
            >
              <Grid container item spacing={2}>
                <Box
                  sx={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    className='homeButton'
                    sx={{
                      border: 3,
                      fontSize: 20,
                      width: 200,
                      height: 60,
                    }}
                    color='primary'
                    variant='outlined'
                    size='small'
                  >
                    SEARCH
                  </Button>
                  <Button
                    className='homeButton'
                    sx={{
                      border: 3,
                      fontSize: 20,
                      width: 200,
                      height: 60,
                    }}
                    color='primary'
                    variant='outlined'
                    size='small'
                  >
                    ALL FESTIVALS
                  </Button>
                </Box>
              </Grid>
            </Link>
          </Typography>
        </Grid>
      </Box> */}
    </>
  );
};

export default Home;
