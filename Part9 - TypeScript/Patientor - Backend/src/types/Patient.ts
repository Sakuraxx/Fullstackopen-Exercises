import z from 'zod';
import { Diagnosis } from './Diagnosis';

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

// // Define special omit for unions
// type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

// // Define Entry without the 'id' property
// type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type NewPatient = z.infer<typeof newPatinetEntrySchema>; 

export interface Patient extends NewPatient {
  id:string;
  entries: Entry[];
}

// region Entry
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;

  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  }
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  }
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


// endRegion Entry

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}

export const entrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  type: z.enum(['HealthCheck', 'OccupationalHealthcare', 'Hospital']),
  healthCheckRating: z.nativeEnum(HealthCheckRating).optional(),
  employerName: z.string().optional(),
  sickLeave: z.object({
    startDate: z.string().date(),
    endDate: z.string().date()
  }).optional(),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string()
  }).optional()
});

export const newPatinetEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(entrySchema).default([]),
});

export const patientSchema = z.object({
  id: z.string(),
  name: z.string(),
  dateOfBirth: z.string().refine(
    (date) => !isNaN(Date.parse(date)),
    { message: "Invalid date format" }
  ),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(entrySchema).default([])
});


export const newEntrySchema = entrySchema.omit({ id: true });

export type NewEntry = z.infer<typeof newEntrySchema>;

/*
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
*/ 