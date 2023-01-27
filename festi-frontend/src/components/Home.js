import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { API } from '../lib/api';

import '../styles/button.css';
import '../App.css';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '10vh',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
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
    margin: 10,
  },
  textField: {
    width: 200,
  },
  InputLabel: {
    backgroundColor: 'white',
    border: '2px black solid',
    borderRadius: '10px',
    margin: '5px',
    minWidth: '100px',
    maxHeight: '50px',
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
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      filter: 'blur(5px) brightness(40%)',
      zIndex: -1,
    },
  },
  selected: {
    backgroundColor: '#f00',
    color: 'white',
  },
  notSelected: {
    backgroundColor: 'white',
    color: 'black',
  },
}));

const Home = () => {
  const classes = useStyles();
  const [results, setResults] = useState([]);
  const [festivals, setFestivals] = useState(null);
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({
    genres: '',
    artists: '',
    country: '',
    cost: '',
    month: '',
    capacity: '',
  });
  const [selected, setSelected] = useState([]);

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

  useEffect(() => {
    API.GET(API.ENDPOINTS.allGenres)
      .then(({ data }) => {
        setGenres(data);
        console.log(API.ENDPOINTS.allGenres);
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

  const handleSelect = (id) => {
    if (selected.includes(id)) {
      const newSelection = selected.filter((genreId) => genreId !== id);
      setSelected(newSelection);
      console.log(selected);
    } else {
      setSelected([...selected, id]);
      console.log(selected);
    }
  };

  return (
    <>
      <div className={classes.image}></div>
      <Typography
        className='font-link-title'
        align='center'
        component='div'
        variant='header'
        style={{
          width: '100%',
          position: 'relative',
          marginTop: '12vh',
          color: 'white',
        }}
        fontWeight='fontWeightMedium'
        fontSize={70}
      >
        Welcome
      </Typography>
      <Typography
        className='font-link-reg'
        align='center'
        component='div'
        variant='header'
        style={{
          width: '100%',
          position: 'relative',
          margin: '4vh',
          color: 'white',
        }}
        fontSize={24}
      >
        Looking for a new festival for the summer? <br />
        <br />
        We've got you covered... <br />
        <br />
        Use the filters below and find the perfect festival for you!
      </Typography>
      {/* START OF FILTER FORM */}

      <form onSubmit={handleSubmit}>
        <Grid container className={classes.root}>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            {/* <FormControl className={classes.formControl}>
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
            </FormControl> */}
            <FormControl>
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
                  minWidth: '150px',
                  maxHeight: '50px',
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
                <MenuItem value='Albania'>Albania</MenuItem>
                <MenuItem value='Belgium'>Belgium</MenuItem>
                <MenuItem value='Bulgaria'>Bulgaria</MenuItem>
                <MenuItem value='Canada'>Canada</MenuItem>
                <MenuItem value='Colombia'>Colombia</MenuItem>
                <MenuItem value='France'>France</MenuItem>
                <MenuItem value='Germany'>Germany</MenuItem>
                <MenuItem value='Italy'>Italy</MenuItem>
                <MenuItem value='Netherlands'>Netherlands</MenuItem>
                <MenuItem value='Portugal'>Portugal</MenuItem>
                <MenuItem value='Romania'>Romania</MenuItem>
                <MenuItem value='Serbia'>Serbia</MenuItem>
                <MenuItem value='Slovenia'>Slovenia</MenuItem>
                <MenuItem value='Spain'>Spain</MenuItem>
                <MenuItem value='UK'>UK</MenuItem>
                <MenuItem value='USA'>USA</MenuItem>
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
                  minWidth: '150px',
                  maxHeight: '50px',
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
                  minWidth: '150px',
                  maxHeight: '50px',
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
                  minWidth: '150px',
                  maxHeight: '50px',
                }}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {/* {festivals.map((festival) => (
                  <MenuItem value={festival.id}>{
                    festival.capacity
                    }</MenuItem>
                ))} */}
                <MenuItem value='500 - 1k'>500 - 1k</MenuItem>
                <MenuItem value='1k - 5k'>1k - 5k</MenuItem>
                <MenuItem value='5k - 10k'>5k - 10k</MenuItem>
                <MenuItem value='10k - 15k'>10k - 15k</MenuItem>
                <MenuItem value='15k - 20k'>15k - 20k</MenuItem>
                <MenuItem value='20k - 30k'>20k - 30k</MenuItem>
                <MenuItem value='30k - 40k'>30k - 40k</MenuItem>
                <MenuItem value='40k - 50k'>40k - 50k</MenuItem>
                <MenuItem value='50k - 75k'>50k - 75k</MenuItem>
                <MenuItem value='75k - 100k'>75k - 100k</MenuItem>
                <MenuItem value='100k - 150k'>100k - 150k</MenuItem>
                <MenuItem value='150k - 200k'>150k - 200k</MenuItem>
                <MenuItem value='200k+'>200k+</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Typography
          className='font-link-title'
          align='center'
          component='div'
          variant='header'
          style={{
            width: '100%',
            position: 'relative',
            marginTop: '1vh',
            marginBottom: '3vh',
            color: 'white',
          }}
          fontWeight='fontWeightMedium'
          fontSize={38}
        >
          Select Genres
        </Typography>
        <Grid
          container
          spacing={1}
          sx={{
            justifyContent: 'center',
            width: '50vw',
            marginLeft: '25%',
            mt: '8px',
            mb: '8px',
          }}
        >
          {genres.map((genre) => (
            <Grid
              Item
              md={3}
              sx={{ display: 'flex', justifyContent: 'center', width: '25%' }}
            >
              <button
                key={genre.id}
                id={genre.id}
                className={
                  selected.includes(genre.id)
                    ? classes.selected
                    : classes.notSelected
                }
                type='submit'
                variant='contained'
                color='inherit'
                sx={{
                  border: '2px black solid',
                  borderRadius: '10px',
                  margin: '20px',
                  minWidth: '130px',
                }}
                onClick={() => handleSelect(genre.id)}
              >
                {genre.name}
              </button>
            </Grid>
          ))}
          {/* <Grid item xs>
            <div className='grid-elements'></div>
          </Grid> */}
        </Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
          <Grid item xs={2}>
            <Button
              type='submit'
              variant='contained'
              color='inherit'
              sx={{
                marginRight: '43px',
                minWidth: '150px',
                '&:hover': {
                  background: '#f00',
                  color: 'white',
                },
              }}
            >
              Search
            </Button>
            <Link
              style={{ color: 'inherit', textDecoration: 'inherit' }}
              to='/festivals'
            >
              <Button
                className='font-link-title'
                color='inherit'
                variant='contained'
                sx={{
                  marginLeft: '43px',
                  minWidth: '150px',
                  '&:hover': {
                    background: '#f00',
                    color: 'white',
                  },
                }}
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
