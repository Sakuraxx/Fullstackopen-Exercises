import { NewPatient, newPatinetEntrySchema} from "./types/Patient";

const toNewPatientEntry = (object: unknown): NewPatient => {
  return newPatinetEntrySchema.parse(object);
}

export default toNewPatientEntry;