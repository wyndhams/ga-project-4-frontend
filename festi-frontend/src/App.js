import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import AllFestivals from './components/AllFestivals';
import SingleFestival from './components/SingleFestival';
import CreateFestival from './components/CreateFestival';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [searchedFestivals, setSearchedFestivals] = useState(null);

  return (
    <>
      <Router>
        <Navbar
          setSearchedFestivals={setSearchedFestivals}
          searchedFestivals={searchedFestivals}
        />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/fesitvals' element={<AllFestivals />} />
          <Route path='fesitvals/:id' element={<SingleFestival />} />
          <Route path='/fesitvals/create' element={<CreateFestival />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account' element={<Account />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
