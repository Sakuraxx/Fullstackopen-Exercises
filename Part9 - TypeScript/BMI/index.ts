import express, { Request, Response } from 'express';
import { calculateBmi } from './calculateBmi'; 
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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});