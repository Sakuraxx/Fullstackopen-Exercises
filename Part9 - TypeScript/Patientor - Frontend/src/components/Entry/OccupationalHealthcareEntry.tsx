import React from 'react';
import { OccupationalHealthcareEntry, Diagnosis } from '../../types';

const OccupationalHealthcareEntryComp: React.FC<{entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[]}> = ({ entry, diagnoses }) => {
    return (
        <div>
            <h3>{entry.date} <i className="fas fa-user-md"></i></h3>
            <p>{entry.description}</p>
            {entry.employerName && <p>Employer: {entry.employerName}</p>}
            {entry.sickLeave && (
                <div>
                    <p>Sick leave:</p>
                    <p>Start date: {entry.sickLeave.startDate}</p>
                    <p>End date: {entry.sickLeave.endDate}</p>
                </div>
            )}
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

export default OccupationalHealthcareEntryComp;