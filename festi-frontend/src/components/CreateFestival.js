import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Container,
  Box,
  Button,
  // FormControl,
  // InputLabel,
  // Select,
  // MenuItem,
} from '@mui/material';
import { API } from '../lib/api';
// import HomeImage from '../assets/home-background.png';
import '../styles/Createstyle.scss';

export default function CreateFestival() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    reps: 0,
    sets: 0,
    rest: 0,
    difficulty: '',
    totalTime: 0,
    caloriesBurned: 0,
    equipmentRequired: '',
    muscleGroup: '',
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = formData.muscleGroup
      ? formData
      : {
          name: formData.name,
          image: formData.image,
          description: formData.description,
          reps: formData.reps,
          sets: formData.sets,
          rest: formData.rest,
          difficulty: formData.difficulty,
          totalTime: formData.totalTime,
          caloriesBurned: formData.caloriesBurned,
          equipmentRequired: formData.equipmentRequired,
          muscleGroup: formData.muscleGroup,
        };

    API.POST(API.ENDPOINTS.allFestivals, data, API.getHeaders())
      .then(({ data }) => {
        navigate(`/festivals/${data._id}`);
      })
      .catch((e) => {
        if (e.status === 301) {
          setError(true);
        }
        console.log(e);
      });
  };

  return (
    <>
      <h1>Create Festival</h1>
      {/* <img src={HomeImage} alt='Fesitval Image' /> */}

      <Container
        maxWidth='lg'
        sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              size='small'
              type='text'
              value={formData.name}
              onChange={handleChange}
              error={error}
              label='Name'
              name='name'
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              size='small'
              type='text'
              value={formData.description}
              onChange={handleChange}
              error={error}
              label='Description'
              name='description'
            />
          </Box>

          <div>{festivals.name}</div>

          <Button type='submit'>Create New Festival</Button>
        </form>
      </Container>
      {/* <img src={HomeImage} alt='Home Festival' /> */}
    </>
  );
}
