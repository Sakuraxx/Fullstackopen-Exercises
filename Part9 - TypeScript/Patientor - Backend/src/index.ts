import express from 'express';
import cors from 'cors';
import diagnoses from './routes/diagnoses';


const app = express();

// For all requests
// app.use(cors());
const corsOptions = {
  origin: 'http://localhost:5173', 
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));


app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoses);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});