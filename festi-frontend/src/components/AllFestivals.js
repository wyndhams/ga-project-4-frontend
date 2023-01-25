import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Grid, Paper } from '@mui/material';
// import '../styles/images.scss';
import { useNavigate } from 'react-router-dom';
import FestivalCard from './common/FestivalCard';
import Search from './common/Search';
import Favourite from './common/Favourite';

const AllFestivals = ({ searchedFestivals }) => {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  // const [isHover, setIsHover] = useState(false);

  // const handleMouseEnter = () => {
  //   setIsHover(true);
  // };
  // const handleMouseLeave = () => {
  //   setIsHover(false);
  // };

  const [festivals, setFestivals] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <>
      <Box className='background' sx={{ backgroundColor: 'black', mt: '7vh' }}>
        <Container className='margins' maxWidth='lg'>
          <Search value={searchQuery} handleChange={setSearchQuery} />
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {festivals &&
              filterFestivals().map((festival) => (
                <Grid item xs={6} key={festival.id}>
                  <Item
                    className='hover'
                    onClick={() => handleClick(festival.id)}
                  >
                    <FestivalCard component='img' image={festival?.cover_image}>
                      {festival.name}, {festival.country}
                    </FestivalCard>
                    <Favourite sx={{ backgroundColor: 'red' }} />
                  </Item>
                </Grid>
              ))}
          </Grid>
          <Button
            type='submit'
            variant='contained'
            color='inherit'
            onClick={handleCreateFestival}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            Create New Festival
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default AllFestivals;
