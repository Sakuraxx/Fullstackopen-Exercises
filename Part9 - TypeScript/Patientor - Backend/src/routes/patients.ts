import express, { Request, Response } from 'express';
import patientService from '../services/patientService';
import { NewPatient, newPatinetEntrySchema } from '../types/Patient';
import z from 'zod';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  try {
    const patients = patientService.getNonSensitivePatinets();
    res.json(patients);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(500).send(errorMessage);
  }
});

router.post('/', (_req: Request, res: Response) => {
  try{
    const patientObj: NewPatient = newPatinetEntrySchema.parse(_req.body);
    const newPatient = patientService.addPatient(patientObj);
    res.json(newPatient);
  } catch(error) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }

});

export default router;