import * as React from 'react';
// import AccountText from '../assets/account-text-white.png';
// import ProfilePic from '../assets/profile-pic.jpg';

import {
  // Container,
  Box,
  // Card,
  // CardContent,
  // Button,
  Typography,
  Grid,
  Stack,
  Avatar,
  // ImageListItem,
  ImageList,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const commonStyles = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  width: '12.5rem',
  height: '12.5rem',
};

// get height and weight from API
function createData(height, weight, bmi) {
  return { height, weight, bmi };
}
const rows = [createData(181, 106, 32)];

// const photoReel = [{}];

const Account = () => (
  <>
    <Box sx={{ backgroundColor: 'black' }}>
      <Box
        component='img'
        sx={{
          position: 'absolute',
          top: '8vh',
          justify: 'center',
          left: '40%',
          // zIndex: 'tooltip',
          mt: 4,
          mb: 20,
          height: 100,
          width: 400,
        }}
        alt='Account page text'
        // src={AccountText}
      />

      <Box
        sx={{
          // backgroundColor: 'pink',
          position: 'absolute',
          top: '23vh',
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
              {/* {photoReel.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading='lazy'
                  />
                </ImageListItem>
              ))} */}
            </ImageList>
          </Stack>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: '47vh',
          justify: 'center',
          left: '15%',
          // zIndex: 'tooltip',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Stack>
            <Box sx={{ ...commonStyles, borderRadius: '50%' }}>
              <Avatar
                alt='Profile picture'
                // src={ProfilePic}
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
                Ulas Temel
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: '50vh',
          justify: 'center',
          left: '38%',
          mt: 4,
          mb: 20,
          // height: 400,
          width: '36%',
        }}
      >
        <Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='left'>Height&nbsp;(cm)</TableCell>
                  <TableCell align='left'>Weight&nbsp;(kg)</TableCell>
                  <TableCell align='left'>BMI&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align='left'>&ensp;{row.height}</TableCell>
                    <TableCell align='left'>&ensp;{row.weight}</TableCell>
                    <TableCell align='left'>&ensp;{row.bmi}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Box>

      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justify='center'
        style={{ minHeight: '100vh' }}
        // sx={{ backgroundColor: 'black' }}
      ></Grid>
    </Box>
  </>
);

export default Account;
