import express, { Request, Response } from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  try {
    const patients = patientService.getPatientEntries();
    res.json(patients);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(500).send(errorMessage);
  }
});

export default router;