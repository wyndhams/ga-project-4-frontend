import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import { styled } from '@mui/material/styles';
import { Button, Container, Grid, Paper } from '@mui/material';
// import '../styles/images.scss';
import { useNavigate } from 'react-router-dom';
import FestivalCard from './common/FestivalCard';
import Search from './common/Search';

const AllFestivals = ({ searchedFestivals }) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
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
      <div className='background'>
        <Search value={searchQuery} handleChange={setSearchQuery} />
        <Container className='margins' maxWidth='lg'>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            justifyContent='center'
            alignItems='center'
          >
            {festivals &&
              filterFestivals().map((festival) => (
                <Grid item xs={6} key={festival.id}>
                  <Item
                    className='hover'
                    onClick={() => handleClick(festival.id)}
                  >
                    <FestivalCard
                      component='img'
                      sx={{ height: 20, width: 230 }}
                      image={festival.cover_image}
                    ></FestivalCard>
                    {festival.name}
                    {festival.country}
                  </Item>
                </Grid>
              ))}
          </Grid>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            onClick={handleCreateFestival}
          >
            Create New Festival
          </Button>
        </Container>
      </div>
    </>
  );
};

export default AllFestivals;
