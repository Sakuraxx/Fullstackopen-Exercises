import express, { Request, Response } from 'express';
import { calculateBmi } from './calculateBmi'; 
import { calculateExercises, ExerciseRes } from './calculateExercises';

const app = express();

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
    const heightStr = req.query.height;
    const weightStr = req.query.weight;

    // Basic validation
    if (!heightStr || !weightStr) {
        return res.status(400).json({ error: 'Missing height or weight query parameters' });
    }

    const height = Number(heightStr);
    const weight = Number(weightStr);

    if (isNaN(height) || isNaN(weight)) {
        return res.status(400).json({ error: 'Malformatted parameters: height and weight must be numbers' });
    }

    try {
        const bmiResult = calculateBmi(height, weight);
        return res.json({ 
            weight: weight,
            height: height,
            bmi: bmiResult 
        });
    } catch (error: unknown) {
        let errorMessage = 'BMI calculation failed.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message; 
        }
        
        return res.status(400).json({ error: errorMessage }); 
    }
});

app.use(express.json());

app.post('/exercises', (req: Request, res: Response) => {
    const { daily_exercises, target } = req.body;
    
    console.log('[post] req.body:', req.body);

    if (daily_exercises === undefined || target === undefined) {
        return res.status(400).json({ error: 'parameters missing' });
    }

    if (!Array.isArray(daily_exercises) || !daily_exercises.every(item => typeof item === 'number')) {
        return res.status(400).json({ error: 'malformatted parameters: daily_exercises must be an array of numbers' });
    }

    if (typeof target !== 'number' || isNaN(target)) {
        return res.status(400).json({ error: 'malformatted parameters: target must be a number' });
    }

    try {
        const result: ExerciseRes = calculateExercises(target, daily_exercises);
        return res.json(result);
    } catch (error: unknown) {
        let errorMessage = 'Exercises calculation failed.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message; 
        }
        
        return res.status(400).json({ error: errorMessage }); 
    }

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});