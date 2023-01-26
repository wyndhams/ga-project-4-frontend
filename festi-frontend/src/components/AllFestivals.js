import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

import { API } from '../lib/api';
import { useAuthenticated } from '../hooks/useAuthenticated';
// import { AUTH } from '../lib/auth';
import Search from './common/Search';
import FestivalPictureSmall from './common/FestivalPictureSmall';

import '../App.css';
import '../styles/button.css';

const useStyles = makeStyles(() => ({
  selected: {
    backgroundColor: '#f00',
    color: 'white',
  },
  notSelected: {
    backgroundColor: 'white',
    color: 'black',
  },
}));

const AllFestivals = ({ searchedFestivals, likedFestivals }) => {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const [isLoggedIn] = useAuthenticated();
  const [festivals, setFestivals] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState([]);
  const classes = useStyles();

  const filterFestivals = () => {
    const regex = new RegExp(searchQuery, 'i');
    const filteredFestivals = festivals.filter((festival) => {
      return festival.name.match(regex);
    });
    return filteredFestivals;
  };

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
    setFestivals(searchedFestivals);
  }, [searchedFestivals]);

  const navigate = useNavigate();

  const handleClick = (id) => {
    console.log(id);
    navigate(`/festivals/${id}`);
  };

  const handleCreateFestival = (e) => navigate('/festivals/create');

  const handleFavourite = (id) => {
    if (selected.includes(id)) {
      const newSelection = selected.filter((festivalId) => festivalId !== id);
      setSelected(newSelection);
      console.log(selected);
    } else {
      setSelected([...selected, id]);
      console.log(selected);
    }
  };

  return (
    <>
      <Box
        className='background'
        sx={{
          backgroundColor: 'black',
          mt: '8vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Container className='margins'>
          <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {isLoggedIn && (
              <Button
                type='submit'
                variant='contained'
                size='small'
                color='inherit'
                onClick={handleCreateFestival}
                sx={{
                  border: '4px black solid',
                  borderRadius: '10px',
                  mt: '15px',
                  maxWidth: '310px',
                  maxHeight: '60px',
                  '&:hover': {
                    background: '#f00',
                    color: 'white',
                  },
                }}
              >
                Create New Festival
              </Button>
            )}
            <Search value={searchQuery} handleChange={setSearchQuery} />
          </Container>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {festivals &&
              filterFestivals().map((festival) => (
                <Grid item xs={6} key={festival.id}>
                  <Item
                    className={
                      selected.includes(festival.id)
                        ? classes.selected
                        : classes.notSelected
                    }
                    onClick={() => handleClick(festival.id)}
                    sx={{
                      '&:hover': {
                        background: '#f00',
                        cursor: 'pointer',
                      },
                    }}
                  >
                    {festival.cover_image && (
                      <FestivalPictureSmall
                        cover_image={festival?.cover_image}
                      ></FestivalPictureSmall>
                    )}
                  </Item>
                  <Container
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      margin: 0,
                    }}
                  >
                    <Typography
                      className='font-link-reg'
                      component='div'
                      variant='header'
                      style={{
                        width: '100%',
                        position: 'relative',
                        color: 'white',
                      }}
                      fontWeight='fontWeightMedium'
                      sx={{ color: 'white', mt: '12px' }}
                    >
                      {festival.name}, {festival.country}
                    </Typography>
                    {isLoggedIn && (
                      <div key={festival.id}>
                        <Button
                          key={festival.id}
                          className='font-link-reg'
                          type='submit'
                          variant='contained'
                          color='inherit'
                          sx={{
                            border: '2px black solid',
                            borderRadius: '10px',
                            margin: '5px',
                            minWidth: '100px',
                          }}
                          onClick={() => handleFavourite(festival)}
                        >
                          Favourite
                        </Button>
                      </div>
                    )}
                  </Container>
                </Grid>
              ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default AllFestivals;
