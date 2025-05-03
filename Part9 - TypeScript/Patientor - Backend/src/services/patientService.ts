import patientsData from '../../data/patients';
import { Patient } from '../types/Patient';

const patients: Patient[]  = patientsData;

const getPatientEntries = (): Patient[] => {
  return patients;
}

export default {
  getPatientEntries,
}