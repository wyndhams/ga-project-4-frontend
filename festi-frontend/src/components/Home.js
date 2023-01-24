import { Link } from 'react-router-dom';
import HomeImage from '../assets/home-image.png';
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
      <Typography
        align='center'
        component='div'
        variant='header'
        color='primary'
        style={{
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
          width: '100%',
          position: 'relative',
          margin: '4vh',
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
            <TextField
              className={classes.textField}
              label='Capacity'
              id='capacity'
              name='capacity'
              value={filters.capacity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button type='submit' variant='contained' color='primary'>
              Search
            </Button>
            <Link
              style={{ color: 'inherit', textDecoration: 'inherit' }}
              to='/festivals'
            >
              <Button
                className='homeButton'
                color='primary'
                variant='contained'
              >
                ALL FESTIVALS
              </Button>
            </Link>
          </Grid>
        </Grid>
      </form>
      {/* END OF FILTER FORM */}
      <Grid item xs={1} className={classes.middleRow}>
        <img
          src={HomeImage}
          alt='Graphic of people dancing around a drum'
          style={{ maxWidth: '100%', maxHeight: '60vh' }}
        />
      </Grid>
    </>
  );
};

export default Home;
