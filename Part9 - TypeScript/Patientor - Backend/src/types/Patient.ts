export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string
  occupation: string
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

export const parseName = (name: unknown): string => {
  if(!name || !isString(name))
  {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

export const parseSSN = (ssn: unknown): string => {
  if(!ssn || !isString(ssn))
  {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

export const parseOccuppation = (occupation: unknown): string => {
  if(!occupation || !isString(occupation))
  {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

export const parseDate = (date: unknown): string => {
  if(!date || !isString(date) || !isDate(date))
  {
    throw new Error('Incorrect or missing date');
  }
  return date;
}

export const parseGender = (gender: unknown): Gender => {
  if(!gender || !isString(gender) || !isGender(gender))
  {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
}