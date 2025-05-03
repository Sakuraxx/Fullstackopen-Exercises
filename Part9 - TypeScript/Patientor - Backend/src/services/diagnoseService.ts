import diagnosesData from '../../data/diagnoses';
import { Diagnosis } from '../types/Diagnosis';

const diagnoses: Diagnosis[]  = diagnosesData;

const getDiagnoseEntries = (): Diagnosis[] => {
  return diagnoses;
}

export default {
  getDiagnoseEntries,
}