import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import express from 'express';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
  } else {
    const bmi = calculateBmi(height, weight);
    res.json({ weight: weight, height: height, bmi: bmi });
  }
});

app.post('/exercises', (req, res) => {
  const body = req.body as { daily_exercises: number[]; target: number };
  const daily_exercises = body.daily_exercises;
  const target = body.target;

  if (!target || !daily_exercises || daily_exercises.length === 0) {
    return res.status(400).json({ error: 'missing parameters' });
  }

  let nanFound = false;

  if (isNaN(target)) {
    nanFound = true;
  }

  daily_exercises.forEach((daily_exercise) => {
    if (isNaN(daily_exercise)) {
      nanFound = true;
    }
  });

  if (nanFound) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(target, daily_exercises);

  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
