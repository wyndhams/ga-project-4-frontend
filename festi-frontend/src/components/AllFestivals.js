import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { IconButton } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { API } from '../lib/api';
import { useAuthenticated } from '../hooks/useAuthenticated';
// import { AUTH } from '../lib/auth';
import Search from './common/Search';
import FestivalPictureSmall from './common/FestivalPictureSmall';

import '../App.css';
import '../styles/button.css';

const useStyles = makeStyles(() => ({
  root: {
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

  const handleFavourite = (festival) => {
    if (selected.includes(festival)) {
      const newSelection = selected.filter((i) => i !== festival);
      setSelected(newSelection);
      console.log('SELECTED', selected);
    } else {
      setSelected([...selected, festival]);
      console.log('SELECTED', selected);
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
                        <button
                          key={festival.id}
                          className={
                            selected.includes(festival)
                              ? classes.root
                              : classes.notSelected
                          }
                          variant='contained'
                          color='inherit'
                          onClick={() => handleFavourite(festival)}
                        >
                          FAVOURITE
                        </button>
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
