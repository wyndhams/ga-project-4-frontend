import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { NOTIFY } from '../lib/notifications';
import { AUTH } from '../lib/auth';
import { useAuthenticated } from '../hooks/useAuthenticated';

// import LoginText from '../assets/login-black.png';

import {
  // Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  // Typography,
} from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({ email: false, password: false });
  const [isLoggedIn] = useAuthenticated();

  if (isLoggedIn) {
    navigate('/');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    API.POST(API.ENDPOINTS.login, formFields)
      .then(({ data }) => {
        NOTIFY.SUCCESS('You are now logged in!');
        AUTH.setToken(data.token);
        navigate('/');
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data.message === 'That password seems to be incorrect') {
          setError({ ...error, password: true });
        } else {
          setError({ email: true, password: true });
        }
      });
  };

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleNotRegistered = (e) => {
    navigate('/register/');
  };

  return (
    <Box sx={{ backgroundColor: 'black', flexGrow: 1 }}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://res.cloudinary.com/dep5f7nys/image/upload/v1674660452/Festi/festi-img5_tcwque.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            filter: 'blur(0.5px) brightness(50%)',
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* <Typography component='h1' variant='h5'>
              Log in
            </Typography> */}
            <Box
              sx={{
                mt: 20,
                mb: 4,
                height: 100,
                width: 400,
              }}
            />
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                type='email'
                label='Email Address'
                helperText={error.email && 'Incorrect E-mail Address'}
                value={formFields.email}
                onChange={handleChange}
                error={error.email}
                name='email'
                autoComplete='email'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                value={formFields.password}
                onChange={handleChange}
                error={error.password}
                autoComplete='current-password'
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href='#' variant='body2' onClick={handleNotRegistered}>
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
