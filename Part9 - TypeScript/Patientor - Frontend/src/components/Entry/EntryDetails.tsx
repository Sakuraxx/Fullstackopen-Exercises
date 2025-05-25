import React from 'react';
import { Diagnosis, Entry } from '../../types';
import HospitalEntryComp from './HospitalEntry';
import OccupationalHealthcareEntryComp from './OccupationalHealthcareEntry';
import HealthCheckEntryComp from './HealthCheckEntry';

const EntryDetails: React.FC<{ entry: Entry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
    switch (entry.type) {
        case 'HealthCheck':
            return <HealthCheckEntryComp entry={entry} diagnoses={diagnoses}/>;
        case 'OccupationalHealthcare':
            return <OccupationalHealthcareEntryComp entry={entry} diagnoses={diagnoses}/>;
        case 'Hospital':
            return <HospitalEntryComp entry={entry} diagnoses={diagnoses}/>;
        default:
            return assertNever(entry);
    }
};

function assertNever(entry: never): React.ReactNode {
    throw new Error('Function not implemented. Entry type not recognized: ' + entry);
}

export default EntryDetails;
