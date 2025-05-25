import { Patient, NonSensitivePatient, NewPatient, Entry, NewEntry } from '../types/Patient';
import { v1 as uuid } from 'uuid';
import patientNewData from '../../data/patients-full';

// const patients: Patient[]  = z.array(patientSchema).parse(patientsData);
const patients: Patient[]  = patientNewData;

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

const addPatient = (newPatientData: NewPatient): NonSensitivePatient => {
  
  const patientEntries: Entry[] = (newPatientData.entries ?? []).map((entryWithoutId) => {
    return {
      ...entryWithoutId,
      id: uuid(),
    } as Entry;
  });
  
  const newPatient: Patient = {
    id: uuid(),
    name: newPatientData.name,
    ssn: newPatientData.ssn,
    occupation: newPatientData.occupation,
    gender: newPatientData.gender,
    dateOfBirth: newPatientData.dateOfBirth,
    entries: patientEntries 
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

const addEntryToPatient = (patientId: string, newEntryData: NewEntry): Entry | undefined => {
  const patient = getPatientById(patientId);

  if (!patient) {
    return undefined;
  }

  const entryToAdd: Entry = {
    ...newEntryData,
    id: uuid(), 
  } as Entry; // Type assertion to Entry

  // Add the new entry to the patient's entries array
  // Ensure patient.entries is initialized if it might be undefined/null
  if (!patient.entries) {
    patient.entries = [];
  }
  patient.entries.push(entryToAdd);

  return entryToAdd; 
};

export default {
  getPatientEntries,
  getNonSensitivePatinets,
  addPatient,
  getPatientById,
  addEntryToPatient
}