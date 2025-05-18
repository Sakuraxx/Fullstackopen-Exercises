import patientsData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient, patientSchema } from '../types/Patient';
import { v1 as uuid } from 'uuid';
import z from 'zod'

const patients: Patient[]  = z.array(patientSchema).parse(patientsData);

const getPatientEntries = (): Patient[] => {
  return patients;
}

const getNonSensitivePatinets = (): NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation
  }))
}

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    throw new Error('Patient not found');
  }
  return patient;
}

const addPatient = (entry: NewPatient): NonSensitivePatient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry,
  }
  patients.push(newPatient);

  return {
          id: newPatient.id,
          name: newPatient.name,
          dateOfBirth: newPatient.dateOfBirth,
          gender: newPatient.gender,
          occupation: newPatient.occupation
        };
}

export default {
  getPatientEntries,
  getNonSensitivePatinets,
  addPatient,
  getPatientById
}