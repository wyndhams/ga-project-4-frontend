import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import { NOTIFY } from '../lib/notifications';
import { Checkbox, FormControlLabel } from '@mui/material';
import { makeStyles } from '@material-ui/core';
// import '../styles/RegisterStyling.scss';

const useStyles = makeStyles((theme) => ({
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${'https://res.cloudinary.com/dep5f7nys/image/upload/v1674648553/Festi/festi-img2_yfssgh.png'})`,
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

export default function Register() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [formFields, setFormFields] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
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
        profile_image: cloudinaryResponse.data.public_id,
      };
      console.log(apiReqBody);
      await API.POST(API.ENDPOINTS.register, apiReqBody);

      const loginData = await API.POST(API.ENDPOINTS.login, {
        email: formFields.email,
        password: formFields.password,
      });

      AUTH.setToken(loginData.data.token);

      NOTIFY.SUCCESS(loginData.data.message);

      navigate('/');
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleAlreadyRegistered = (e) => {
    navigate('/login/');
  };

  return (
    <>
      <div className={classes.image}></div>
      <Container component='main' maxWidth='sm'>
        <CssBaseline />
        <form onSubmit={handleCreateUser}>
          <Box
            sx={{
              mt: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component='h1'
              variant='h5'
              className='text'
              sx={{ color: 'white', mb: '20px', fontSize: '32px' }}
            >
              Register{' '}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  className={classes.textField}
                  autoComplete='given-name'
                  name='first_name'
                  required
                  fullWidth
                  id='first_name'
                  type='text'
                  label='First Name'
                  value={formFields.first_name}
                  onChange={handleChange}
                  error={error}
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  className={classes.textField}
                  required
                  fullWidth
                  id='last_name'
                  type='text'
                  label='Last Name'
                  value={formFields.last_name}
                  onChange={handleChange}
                  error={error}
                  name='last_name'
                  autoComplete='family-name'
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
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
                  className={classes.textField}
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
                  className={classes.textField}
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
                  className={classes.textField}
                  required
                  fullWidth
                  name='password_confirmation'
                  label='Password Confirmation'
                  type='password'
                  id='password_confirmation'
                  value={formFields.password_confirmation}
                  onChange={handleChange}
                  error={error}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  required
                  fullWidth
                  name='profile_image'
                  id='profile_image'
                  type='file'
                  onChange={handleFileChange}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  className='text'
                  control={
                    <Checkbox
                      value='allowExtraEmails'
                      color='secondary'
                      label='My checkbox'
                    />
                  }
                  label='I want to get updates about new festivals!'
                  sx={{ color: 'white' }}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              color='inherit'
              fullWidth
              variant='contained'
              sx={{ mt: 1, mb: 2 }}
            >
              Register
            </Button>

            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link
                  href='#'
                  variant='body2'
                  onClick={handleAlreadyRegistered}
                  sx={{ color: 'white' }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Container>
    </>
  );
}
