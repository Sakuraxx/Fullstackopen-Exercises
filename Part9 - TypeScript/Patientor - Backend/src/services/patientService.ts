import patientsData from '../../data/patients';
import { Patient, NonSensitivePatient } from '../types/Patient';

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

export default {
  getPatientEntries,
  getNonSensitivePatinets
}