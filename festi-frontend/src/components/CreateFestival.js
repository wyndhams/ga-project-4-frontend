import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Container,
  Box,
  Button,
  Grid,
  // FormControl,
  // InputLabel,
  // Select,
  // MenuItem,
} from '@mui/material';
import { API } from '../lib/api';
import { NOTIFY } from '../lib/notifications';

export default function CreateFestival() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    genres: '',
    artist: '',
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      const data = formData.festivals
        ? formData
        : {
            name: formData.name,
            genres: formData.genres,
            artist: formData.artist,
            country: formData.country,
            cost: formData.cost,
            month: formData.month,
            capacity: formData.capacity,
          };

      const apiReqBody = {
        ...formData,
        cover_image: cloudinaryResponse.data.public_id,
      };

      console.log(data);

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
      <h1>Create Festival</h1>
      {/* <img src={HomeImage} alt='Festival Image' /> */}

      <Container
        maxWidth='lg'
        sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type='text'
                value={formData.name}
                onChange={handleChange}
                error={error}
                label='Name'
                name='name'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
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
                className='textfield'
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
                className='textfield'
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
                className='textfield'
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
                className='textfield'
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
                className='textfield'
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
                className='textfield'
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
            sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
            type='submit'
            variant='contained'
            color='primary'
          >
            Create New Festival
          </Button>
        </form>
      </Container>
      {/* <img src={HomeImage} alt='Home Festival' /> */}
    </>
  );
}
