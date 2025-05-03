import express, { Request, Response } from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';
import { NewPatient } from '../types/Patient';

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

    const patientObj: NewPatient = toNewPatientEntry(_req.body);

    const newPatient = patientService.addPatient(patientObj);

    res.json(newPatient);

  } catch(error) 
  {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(500).send(errorMessage);
  }

});

export default router;