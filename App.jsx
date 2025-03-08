import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField, Grid, Card, CardContent, Typography, IconButton, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import './App.css';

function App() {
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = () => {
    axios.get('http://localhost:8080/foods')
      .then(response => setFoods(response.data))
      .catch(error => console.error('Lỗi:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFood = { name, price: parseFloat(price) };
    axios.post('http://localhost:8080/foods', newFood)
      .then(() => {
        setName('');
        setPrice('');
        fetchFoods();
      })
      .catch(error => console.error('Lỗi:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/foods/${id}`)
      .then(() => fetchFoods())
      .catch(error => console.error('Lỗi:', error));
  };

  return (
    <Container maxWidth="md" style={{ padding: '20px' }}>
      <Typography variant="h3" align="center" gutterBottom style={{ fontWeight: 'bold', color: '#1976d2' }}>
        Danh sách món ăn 🍽️
      </Typography>
      <Grid container spacing={3}>
        {foods.map(food => (
          <Grid item xs={12} sm={6} md={4} key={food.id}>
            <Card className="food-card">
              <CardContent>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>{food.name}</Typography>
                <Typography color="textSecondary">{food.price} $</Typography>
                <IconButton color="error" onClick={() => handleDelete(food.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '30px', fontWeight: 'bold', color: '#1976d2' }}>
        Thêm món ăn mới 📝
      </Typography>
      <form onSubmit={handleSubmit} className="form-container">
        <TextField
          label="Tên món ăn"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Giá ($)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
          required
          inputProps={{ step: '0.01' }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth startIcon={<AddIcon />}>
          Thêm món
        </Button>
      </form>
    </Container>
  );
}

export default App;