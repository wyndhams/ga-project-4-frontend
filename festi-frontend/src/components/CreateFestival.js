import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Container,
  Box,
  Button,
  Grid,
  Typography,
  // FormControl,
  // InputLabel,
  // Select,
  // MenuItem,
} from '@mui/material';
import { API } from '../lib/api';
import { NOTIFY } from '../lib/notifications';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${'https://res.cloudinary.com/dep5f7nys/image/upload/v1674656584/Festi/festi-img3_rlueb8.png'})`,
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
  textField: {
    backgroundColor: 'white',
    border: '2px black solid',
    borderRadius: '10px',
  },
}));

export default function CreateFestival() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    genres: [],
    artist: 0,
    country: '',
    cost: '',
    month: '',
    capacity: '',
  });

  const [file, setFile] = useState('');
  const [error, setError] = useState(false);
  const [festivals, setFestivals] = useState(['']);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allFestivals)
      .then(({ data }) => setFestivals(data))
      .catch((e) => console.log(e));
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'genres') {
      setFormData({
        ...formData,
        genres: [...formData.genres, parseInt(e.target.value)],
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageData = new FormData();
    imageData.append('file', file);
    imageData.append(
      'upload_preset',
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const cloudinaryResponse = await API.POST(
        API.ENDPOINTS.cloudinary,
        imageData
      );

      const apiReqBody = {
        ...formData,
        cover_image: cloudinaryResponse.data.public_id,
      };

      console.log(apiReqBody);

      await API.POST(
        API.ENDPOINTS.allFestivals,
        apiReqBody,
        API.getHeaders()
      ).then(({ data }) => {
        NOTIFY.SUCCESS(`Created ${data.name}`);
        navigate(`/festivals/${data.id}`);
      });
    } catch (e) {
      if (e.status === 301) {
        setError(true);
      }
      console.log(e);
    }
  };

  return (
    <>
      <div className={classes.image} />
      <h1>Create Festival</h1>
      {/* <img src={HomeImage} alt='Festival Image' /> */}

      <Container
        maxWidth='sm'
        sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Typography
              align='center'
              component='div'
              variant='header'
              style={{
                width: '100%',
                position: 'relative',
                marginTop: '5vh',
                color: 'white',
              }}
              fontWeight='fontWeightMedium'
              fontSize={50}
            >
              Create A New Festival
            </Typography>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                required
                fullWidth
                type='text'
                value={formData.name}
                onChange={handleChange}
                error={error}
                label='Name'
                name='name'
                sx={{ mt: '40px' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                required
                fullWidth
                type='text'
                value={formData.genres}
                onChange={handleChange}
                error={error}
                label='Genre'
                name='genres'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                required
                fullWidth
                name='artist'
                id='artist'
                type='text'
                label='Artist'
                value={formData.artist}
                onChange={handleChange}
                error={error}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                required
                fullWidth
                id='country'
                type='text'
                label='Country'
                value={formData.country}
                onChange={handleChange}
                error={error}
                name='country'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                required
                fullWidth
                id='cost'
                label='Cost'
                name='cost'
                type='text'
                value={formData.cost}
                onChange={handleChange}
                error={error}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                required
                fullWidth
                id='month'
                label='Month'
                name='month'
                autoComplete='month'
                value={formData.month}
                onChange={handleChange}
                error={error}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                required
                fullWidth
                name='capacity'
                label='Capacity'
                id='capacity'
                autoComplete='capacity'
                value={formData.capacity}
                onChange={handleChange}
                error={error}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                required
                fullWidth
                name='cover_image'
                id='cover_image'
                type='file'
                onChange={handleFileChange}
              />
            </Grid>
          </Grid>

          <Button
            type='submit'
            color='inherit'
            fullWidth
            variant='contained'
            sx={{ mt: 2 }}
          >
            Create New Festival
          </Button>
        </form>
      </Container>
      {/* <img src={HomeImage} alt='Home Festival' /> */}
    </>
  );
}
