import express, { Request, Response, NextFunction } from 'express';
import patientService from '../services/patientService';
import { NewPatient, newPatinetEntrySchema, NonSensitivePatient } from '../types/Patient';
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

router.get('/:id', (req: Request, res: Response) => { 
  const { id } = req.params; 
  try {
    const patient = patientService.getPatientById(id);

    if (patient) {
      res.json(patient); 
    } else {
      res.status(404).send({ error: 'Patient not found' });
    }
  } catch (error) {
    let errorMessage = `Something went wrong while fetching patient with ID ${id}.`;
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(500).send(errorMessage);
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    newPatinetEntrySchema.parse(req.body)
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<NonSensitivePatient>) => {
  const newPatient = patientService.addPatient(req.body);
  res.json(newPatient);
});

router.use(errorMiddleware);

export default router;