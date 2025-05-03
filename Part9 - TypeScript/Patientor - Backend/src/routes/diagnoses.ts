import express, { Request, Response } from 'express';
import diagnoseService  from "../services/diagnoseService";

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  try {
    const diagnoses = diagnoseService.getDiagnoseEntries();
    res.json(diagnoses);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(500).send(errorMessage);
  }
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnoses!');
});

export default router;