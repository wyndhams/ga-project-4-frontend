import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import { NOTIFY } from '../lib/notifications';
import '../styles/RegisterStyling.scss';
import Abs from '../assets/abs.png';

export default function Register() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const [file, setFile] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) =>
    setFormFields({ ...formFields, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const handleCreateUser = async (e) => {
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
        ...formFields,
        cloudinaryImageId: cloudinaryResponse.data.public_id,
      };
      await API.POST(API.ENDPOINTS.register, apiReqBody);

      const loginData = await API.POST(API.ENDPOINTS.login, {
        email: formFields.email,
        password: formFields.password,
      });

      AUTH.setToken(loginData.data.token);

      NOTIFY.SUCCESS('Login Success💪🏼');
      navigate('/workouts');
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const theme = createTheme();

  return (
    <>
      <img className='form' src={Abs} alt='pull-ups' />
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          {/* <form onSubmit={handleCreateUser}> */}
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5' className='text'>
              Register{' '}
            </Typography>
            <Box
              className='form'
              component='form'
              noValidate
              onSubmit={handleCreateUser}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className='textfield'
                    autoComplete='given-name'
                    name='firstName'
                    required
                    fullWidth
                    id='firstName'
                    type='text'
                    label='First Name'
                    value={formFields.firstName}
                    onChange={handleChange}
                    error={error}
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    className='textfield'
                    required
                    fullWidth
                    id='lastName'
                    type='text'
                    label='Last Name'
                    value={formFields.lastName}
                    onChange={handleChange}
                    error={error}
                    name='lastName'
                    autoComplete='family-name'
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    className='textfield'
                    required
                    fullWidth
                    id='username'
                    label='Username'
                    name='username'
                    type='text'
                    value={formFields.username}
                    onChange={handleChange}
                    error={error}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    className='textfield'
                    required
                    fullWidth
                    id='email'
                    type='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    value={formFields.email}
                    onChange={handleChange}
                    error={error}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    className='textfield'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='new-password'
                    value={formFields.password}
                    onChange={handleChange}
                    error={error}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    className='textfield'
                    required
                    fullWidth
                    name='passwordConfirmation'
                    label='Password Confirmation'
                    type='password'
                    id='passwordConfirmation'
                    value={formFields.passwordConfirmation}
                    onChange={handleChange}
                    error={error}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    className='text'
                    control={
                      <Checkbox value='allowExtraEmails' color='primary' />
                    }
                    label='Spam me with workout info 🏋🏽‍♀️ '
                  />
                </Grid>
              </Grid>

              <Grid>
                <TextField
                  className='textfield'
                  size='small'
                  name='profile-picture'
                  id='profile-picture'
                  type='file'
                  onChange={handleFileChange}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Register{' '}
              </Button>

              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Link href='#' variant='body2'>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* </form> */}
        </Container>
      </ThemeProvider>
    </>
  );
}
