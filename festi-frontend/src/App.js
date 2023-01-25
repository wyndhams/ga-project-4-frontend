import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/Navbar';
import Home from './components/Home';
import AllFestivals from './components/AllFestivals';
import SingleFestival from './components/SingleFestival';
import CreateFestival from './components/CreateFestival';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';

import { createTheme, ThemeProvider } from '@mui/material';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      light: '',
    },
  },
});

window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  const [searchedFestivals, setSearchedFestivals] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar
          setSearchedFestivals={setSearchedFestivals}
          searchedFestivals={searchedFestivals}
          position='sticky'
        />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/festivals' element={<AllFestivals />} />
          <Route path='festivals/:id' element={<SingleFestival />} />
          <Route path='/festivals/create' element={<CreateFestival />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account' element={<Account />} />
        </Routes>
        <ToastContainer theme='colored' />
      </Router>
    </ThemeProvider>
  );
}

export default App;