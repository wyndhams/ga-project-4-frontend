import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuthenticated } from '../hooks/useAuthenticated';
// import { AUTH } from '../lib/auth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Logo from '../assets/logo-small-white.png';

const Navbar = ({ setSearchedWorkouts, SearchedWorkouts }) => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAuthenticated();

  const logout = () => {
    AUTH.logout();
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' color='error'>
        <Toolbar>
          {/* logo */}
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link to='/'>
              <Box
                component='img'
                sx={{
                  mt: 4,
                  height: 50,
                  width: 200,
                }}
                alt='Full stacked logo.'
                src={Logo}
              />
            </Link>
          </Typography>
          {/* logo end */}
          {/* start of burger */}
          <div>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='primary'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link
                  style={{ color: 'inherit', textDecoration: 'inherit' }}
                  to='/'
                >
                  <Typography
                    variant='h6'
                    color='inherit'
                    component='div'
                    sx={{ mr: 2 }}
                  >
                    Home
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  style={{ color: 'inherit', textDecoration: 'inherit' }}
                  to='/workouts'
                >
                  <Typography
                    variant='h6'
                    color='inherit'
                    component='div'
                    sx={{ mr: 2 }}
                  >
                    Workouts
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  style={{ color: 'inherit', textDecoration: 'inherit' }}
                  to='/workout-directory'
                >
                  <Typography
                    variant='h6'
                    color='inherit'
                    component='div'
                    sx={{ mr: 2 }}
                  >
                    Muscle Groups
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  style={{ color: 'inherit', textDecoration: 'inherit' }}
                  to='/workout-log'
                >
                  <Typography
                    variant='h6'
                    color='inherit'
                    component='div'
                    sx={{ mr: 2 }}
                  >
                    Workout Log
                  </Typography>
                </Link>
              </MenuItem>
              {isLoggedIn ? (
                <>
                  <MenuItem onClick={handleClose}>
                    <Link
                      style={{ color: 'inherit', textDecoration: 'inherit' }}
                      to='/'
                      onClick={logout}
                    >
                      <Typography
                        variant='h6'
                        color='inherit'
                        component='div'
                        sx={{ mr: 2 }}
                      >
                        Log Out
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                      style={{ color: 'inherit', textDecoration: 'inherit' }}
                      to='/account '
                    >
                      <Typography
                        variant='h6'
                        color='inherit'
                        component='div'
                        sx={{ mr: 2 }}
                      >
                        Account
                      </Typography>
                    </Link>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleClose}>
                    <Link
                      style={{ color: 'inherit', textDecoration: 'inherit' }}
                      to='/login'
                    >
                      <Typography
                        variant='h6'
                        color='inherit'
                        component='div'
                        sx={{ mr: 2 }}
                      >
                        Login
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                      style={{ color: 'inherit', textDecoration: 'inherit' }}
                      to='/register'
                    >
                      <Typography
                        variant='h6'
                        color='inherit'
                        component='div'
                        sx={{ mr: 2 }}
                      >
                        Register
                      </Typography>
                    </Link>
                  </MenuItem>
                </>
              )}
            </Menu>
          </div>
          {/* end of burger */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
