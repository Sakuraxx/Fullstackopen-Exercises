import React from 'react';
import { Diagnosis, HospitalEntry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalEntryComp: React.FC<{ entry: HospitalEntry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
    // console.log('hospital entry comp', diagnoses);
    return (
        <div>
            <h3>{entry.date} <LocalHospitalIcon/></h3>
            <p>{entry.description}</p>
            <p>Discharge date: {entry.discharge.date}</p>
            <p>Discharge criteria: {entry.discharge.criteria}</p>
            {entry.diagnosisCodes && (
                <ul>
                  {entry.diagnosisCodes.map(code => (
                    <li key={code}>
                      {code} {diagnoses.find(d => d.code === code)?.name}
                      {/* {diagnoses.find(d => d.code === code)?.latin && (
                        <span> ({diagnoses.find(d => d.code === code)?.latin})</span>
                      )} */}
                    </li>
                  ))}
                </ul>
              )}
        </div>
    );
};

export default HospitalEntryComp;