import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <>
      {/* <Router>
        <Navbar
          setSearchedFestivals={setSearchedFestivals}
          searchedFestivals={searchedFestivals}
        />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/fesitvals' element={<AllFestivals />} />
          <Route path='fesitvals/:id' element={<SingleFesitval />} />
          <Route path='/fesitvals' element={<SelectedMuscleFesitvalsList />} />
          <Route path='/fesitvals/create' element={<CreateFesitval />} />
          <Route path='fesitval-log' element={<FesitvalLog />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account' element={<Account />} />
        </Routes>
      </Router> */}
    </>
  );
}

export default App;
