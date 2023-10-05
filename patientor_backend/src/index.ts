import express from 'express';
import diagnosisRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
const app = express();
import cors = require('cors');
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('Pinged!');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
