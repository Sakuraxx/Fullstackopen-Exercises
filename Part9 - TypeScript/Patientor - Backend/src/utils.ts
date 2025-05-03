import { NewPatient, parseName, parseSSN, parseDate, parseGender, parseOccuppation } from "./types/Patient";

const toNewPatientEntry = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if('ssn' in object 
    && 'name' in object 
    && 'dateOfBirth' in object 
    && 'gender' in object 
    && 'occupation' in object)
  {
    const newEntry: NewPatient = {
      ssn: parseSSN(object.ssn),
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccuppation(object.occupation)
    }

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
}

export default toNewPatientEntry;