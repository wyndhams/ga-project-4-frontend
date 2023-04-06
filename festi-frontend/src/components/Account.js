import { useEffect, useState } from 'react';
import { API } from '../lib/api';

// import AccountText from '../assets/account-text-white.png';
// import ProfilePic from '../assets/profile-pic.jpg';

import {
  Box,
  Typography,
  Grid,
  Stack,
  Avatar,
  ImageList,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ImageListItem,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/system';
import FestivalPictureAccount from './common/FestivalPictureAccount';
import { useNavigate } from 'react-router-dom';

const commonStyles = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  width: '12.5rem',
  height: '12.5rem',
};

const photoReel = [
  {
    image:
      'https://res.cloudinary.com/dep5f7nys/image/upload/v1674583429/Festi/home-image_kilogl.png',
    title: 'Festi-Graphic-1',
  },
  {
    image:
      'https://res.cloudinary.com/dep5f7nys/image/upload/v1674648157/Festi/cover_eppw91.png',
    title: 'Festi-Graphic-1',
  },
  {
    image:
      'https://res.cloudinary.com/dep5f7nys/image/upload/v1674648553/Festi/festi-img2_yfssgh.png',
    title: 'Festi-Graphic-1',
  },
  {
    image:
      'https://res.cloudinary.com/dep5f7nys/image/upload/v1674583429/Festi/home-image_kilogl.png',
    title: 'Festi-Graphic-1',
  },
];

const Account = ({}) => {
  const [festivals, setFestivals] = useState([]);
  const navigate = useNavigate();

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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

  const handleClick = (id) => {
    console.log(id);
    navigate(`/festivals/${id}`);
  };

  return (
    <>
      <Box sx={{ backgroundColor: 'black' }}>
        <Box
          sx={{
            backgroundColor: 'black',
            position: 'absolute',
            top: '12vh',
            justify: 'center',
            left: '15%',
            // zIndex: 'tooltip',
            mt: 4,
            mb: 20,
            height: 350,
            width: '70%',
          }}
        >
          <Box>
            <Stack direction='row' spacing={2}>
              <ImageList
                sx={{ width: '100%', height: 350 }}
                cols={4}
                rowHeight={164}
              >
                {photoReel.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading='lazy'
                    />
                    {/* <div>{festivals}</div> */}
                  </ImageListItem>
                ))}
              </ImageList>
            </Stack>
          </Box>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: '30vh',
            justify: 'center',
            left: '18%',
            // zIndex: 'tooltip',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack>
              <Box sx={{ ...commonStyles, borderRadius: '50%' }}>
                <Avatar
                  alt='Profile picture'
                  src={
                    'https://res.cloudinary.com/dep5f7nys/image/upload/v1674690391/dvogphbafabgtvglboej.jpg'
                  }
                  sx={{
                    height: '12rem',
                    width: '12rem',
                    // position: 'absolute',
                    top: '2%',
                    justify: 'center',
                    left: '2%',
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant='h4'
                  gutterBottom
                  align='center'
                  sx={{
                    color: 'white',
                    width: '200px',
                    mt: 3,
                    fontSize: 50,
                  }}
                >
                  admin
                </Typography>
                <Typography
                  variant='h4'
                  gutterBottom
                  align='center'
                  sx={{
                    color: 'white',
                    width: '200px',
                    mt: 3,
                    fontSize: 18,
                  }}
                >
                  BIO: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                  aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: '40vh',
            justify: 'center',
            left: '38%',
            // height: 400,
            width: '36%',
          }}
        >
          <Grid>
            <TableContainer component={Paper}>
              <TableContainer sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='left'>Username</TableCell>
                    <TableCell align='left'>Email</TableCell>
                    <TableCell align='left'>Password</TableCell>
                    <TableCell align='left'>Address</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='left'>admin</TableCell>
                    <TableCell align='left'>admin@admin.com</TableCell>
                    <TableCell align='left'>*****</TableCell>
                    <TableCell align='left'>
                      Lorem Ipsum Dolor Sit Amet
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody></TableBody>
              </TableContainer>
            </TableContainer>
          </Grid>
          <Typography
            align='center'
            component='div'
            variant='header'
            style={{
              width: '100%',
              position: 'relative',
              marginTop: '2vh',
              color: 'white',
            }}
            fontWeight='fontWeightMedium'
            fontSize={50}
          >
            Favourite Festivals
          </Typography>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ mt: 1 }}
          >
            {festivals.map((festival) => (
              <Grid item xs={6} key={festival.id}>
                <Item
                  className='hover'
                  onClick={() => handleClick(festival.id)}
                  sx={{
                    '&:hover': {
                      background: '#f00',
                      cursor: 'pointer',
                    },
                  }}
                >
                  {festival.cover_image && (
                    <FestivalPictureAccount
                      cover_image={festival?.cover_image}
                    ></FestivalPictureAccount>
                  )}
                </Item>
                <Container
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: 0,
                  }}
                >
                  <Typography sx={{ color: 'white', mt: '12px' }}>
                    {festival.name}, {festival.country}
                  </Typography>
                </Container>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Account;
