import express, { Request, Response } from 'express';
import patientService from '../services/patientService';

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
    
    const {ssn, name, gender, occupation, dateOfBirth} = _req.body;

    const newPatient = patientService.addPatient({ssn: ssn, name: name, gender: gender, occupation: occupation, dateOfBirth: dateOfBirth});

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