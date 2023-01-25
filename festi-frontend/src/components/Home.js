import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { API } from '../lib/api';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '10vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  topBottomRow: {
    height: '8vh',
  },
  middleRow: {
    height: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formControl: {
    minWidth: 120,
  },
  textField: {
    width: 200,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${'https://res.cloudinary.com/dep5f7nys/image/upload/v1674583429/Festi/home-image_kilogl.png'})`,
    backgroundSize: 'cover',
    zIndex: -1,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      filter: 'blur(5px) brightness(80%)',
      zIndex: -1,
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const [results, setResults] = useState([]);
  const [festivals, setFestivals] = useState(null);
  const [filters, setFilters] = useState({
    genres: '',
    artists: '',
    country: '',
    cost: '',
    month: '',
    capacity: '',
  });

  useEffect(() => {
    API.GET(API.ENDPOINTS.allFestivals)
      .then(({ data }) => {
        setFestivals(data);
        console.log(API.ENDPOINTS.allFestivals);
        console.log(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const filteredResults = festivals.filter((festival) => {
      if (
        (filters.genres === '' || festival.genres.includes(filters.genres)) &&
        (filters.artists === '' ||
          festival.artists.includes(filters.artists)) &&
        (filters.country === '' || festival.country === filters.country) &&
        (filters.cost === '' || festival.cost === filters.cost) &&
        (filters.month === '' || festival.month === filters.month) &&
        (filters.capacity === '' || festival.capacity === filters.capacity)
      ) {
        return true;
      }
      return false;
    });
    setResults(filteredResults);
  };

  return (
    <>
      <div className={classes.image}></div>
      <Typography
        align='center'
        component='div'
        variant='header'
        style={{
          width: '100%',
          position: 'relative',
          marginTop: '15vh',
          color: 'white',
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
        style={{
          width: '100%',
          position: 'relative',
          margin: '4vh',
          color: 'white',
        }}
        fontSize={20}
      >
        Looking for a new festival for the summer? We've got you covered... Use
        the filters below and find the perfect festival for you!
      </Typography>
      {/* START OF FILTER FORM */}

      <form onSubmit={handleSubmit}>
        <Grid container className={classes.root}>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id='genres-label'>Genres</InputLabel>
              <Select
                labelId='genres-label'
                id='genres'
                name='genres'
                value={filters.genres}
                onChange={handleChange}
                sx={{
                  backgroundColor: 'white',
                  border: '2px black solid',
                  borderRadius: '10px',
                  margin: '5px',
                  minWidth: '100px',
                }}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value='rock'>Rock</MenuItem>
                <MenuItem value='pop'>Pop</MenuItem>
                <MenuItem value='jazz'>Jazz</MenuItem>
                <MenuItem value='blues'>Blues</MenuItem>
                <MenuItem value='hip-hop'>Hip-Hop</MenuItem>
                <MenuItem value='house'>House</MenuItem>
                <MenuItem value='techno'>Techno</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id='artists-label'>Artists</InputLabel>
              <Select
                labelId='artists-label'
                id='artists'
                name='artists'
                value={filters.artists}
                onChange={handleChange}
                sx={{
                  backgroundColor: 'white',
                  border: '2px black solid',
                  borderRadius: '10px',
                  margin: '5px',
                  minWidth: '100px',
                }}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value='artist1'>Artist 1</MenuItem>
                <MenuItem value='artist2'>Artist 2</MenuItem>
                <MenuItem value='artist3'>Artist 3</MenuItem>
                <MenuItem value='artist4'>Artist 4</MenuItem>
                <MenuItem value='artist5'>Artist 5</MenuItem>
                <MenuItem value='artist6'>Artist 6</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id='country-label'>Country</InputLabel>
              <Select
                labelId='country-label'
                id='country'
                name='country'
                value={filters.country}
                onChange={handleChange}
                sx={{
                  backgroundColor: 'white',
                  border: '2px black solid',
                  borderRadius: '10px',
                  margin: '5px',
                  minWidth: '100px',
                }}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {/* {results.map((festival) => (
                  <MenuItem key={festival.country} value={festival.country}>
                    {festival.country}
                  </MenuItem>
                ))} */}
                <MenuItem value='US'>US</MenuItem>
                <MenuItem value='Canada'>Canada</MenuItem>
                <MenuItem value='Germany'>Germany</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id='cost-label'>Cost</InputLabel>
              <Select
                labelId='cost-label'
                id='cost'
                name='cost'
                value={filters.cost}
                onChange={handleChange}
                sx={{
                  backgroundColor: 'white',
                  border: '2px black solid',
                  borderRadius: '10px',
                  margin: '5px',
                  minWidth: '100px',
                }}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value='expensive'>Expensive</MenuItem>
                <MenuItem value='medium'>Medium</MenuItem>
                <MenuItem value='cheap'>Cheap</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id='month-label'>Month</InputLabel>
              <Select
                labelId='month-label'
                id='month'
                name='month'
                value={filters.month}
                onChange={handleChange}
                sx={{
                  backgroundColor: 'white',
                  border: '2px black solid',
                  borderRadius: '10px',
                  margin: '5px',
                  minWidth: '100px',
                }}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value='January'>January</MenuItem>
                <MenuItem value='February'>February</MenuItem>
                <MenuItem value='March'>March</MenuItem>
                <MenuItem value='April'>April</MenuItem>
                <MenuItem value='May'>May</MenuItem>
                <MenuItem value='June'>June</MenuItem>
                <MenuItem value='July'>July</MenuItem>
                <MenuItem value='August'>August</MenuItem>
                <MenuItem value='September'>September</MenuItem>
                <MenuItem value='October'>October</MenuItem>
                <MenuItem value='November'>November</MenuItem>
                <MenuItem value='December'>December</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id='capacity-label'>Capacity</InputLabel>
              <Select
                labelId='capacity-label'
                id='capacity'
                name='capacity'
                value={filters.capacity}
                onChange={handleChange}
                sx={{
                  backgroundColor: 'white',
                  border: '2px black solid',
                  borderRadius: '10px',
                  margin: '5px',
                  minWidth: '100px',
                }}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value='expensive'>Expensive</MenuItem>
                <MenuItem value='medium'>Medium</MenuItem>
                <MenuItem value='cheap'>Cheap</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container className={classes.root}>
          <Grid item xs={2}>
            <Button
              type='submit'
              variant='contained'
              color='inherit'
              sx={{ margin: '5px' }}
            >
              Search
            </Button>
            <Link
              style={{ color: 'inherit', textDecoration: 'inherit' }}
              to='/festivals'
            >
              <Button
                className='homeButton'
                color='inherit'
                variant='contained'
                sx={{ margin: '5px' }}
              >
                ALL FESTIVALS
              </Button>
            </Link>
          </Grid>
        </Grid>
      </form>
      {/* END OF FILTER FORM */}
    </>
  );
};

export default Home;
