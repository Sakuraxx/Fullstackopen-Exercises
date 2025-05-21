import { HealthCheckEntry, Diagnosis } from "../../types";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

const HealthCheckEntryComp: React.FC<{entry: HealthCheckEntry, diagnoses: Diagnosis[]}> = ({ entry, diagnoses }) => {
    return (
        <div>
            <h3>{entry.date} <MedicalInformationIcon/></h3>
            <p>{entry.description}</p>
            {entry.healthCheckRating !== undefined && (
                <p>Health check rating: {entry.healthCheckRating}</p>
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

export default HealthCheckEntryComp;