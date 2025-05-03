import patientsData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types/Patient';
import { v1 as uuid } from 'uuid';

const patients: Patient[]  = patientsData;

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

const addPatient = (entry: NewPatient): NonSensitivePatient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry
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
  addPatient
}