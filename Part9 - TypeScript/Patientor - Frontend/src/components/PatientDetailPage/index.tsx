import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, Button, CircularProgress, Alert, Divider, Stack } from '@mui/material'; // Added Stack
import {
  Patient,
  Gender,
  Diagnosis,
  NewEntry, // General NewEntry type
  NewHealthCheckEntryValues,
  NewOccupationalHealthcareEntryValues,
  NewHospitalEntryValues,
} from '../../types';
import patientService from '../../services/patients';
import AddHealthCheckEntryForm from '../Entry/AddEntryForm';
import AddOccupationalHealthcareEntryForm from '../Entry/AddOccupationalHealthcareEntryForm';
import AddHospitalEntryForm from '../Entry/AddHospitalEntryForm';
import EntryDetails from '../Entry/EntryDetails';

interface Props {
  diagnoses: Diagnosis[];
}

type FormType = "HealthCheck" | "OccupationalHealthcare" | "Hospital" | null;

const PatientDetailPage = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeForm, setActiveForm] = useState<FormType>(null); // State to manage which form is active
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const fetchedPatient = await patientService.getOne(id);
        setPatient(fetchedPatient);
      } catch (e) {
        console.error(e);
        if (axios.isAxiosError(e)) {
          setError(e.response?.data?.error || e.message || "Failed to fetch patient data");
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    
    void fetchPatient();
  }, [id]);

  const handleAddEntrySubmit = async (values: NewEntry) => { // Use general NewEntry type
    if (!id) {
      console.error("Patient ID is missing");
      setNotification({ message: "Patient ID is missing. Cannot add entry.", type: 'error' });
      return;
    }
    try {
      const newEntry = await patientService.addEntry(id, values);
      setPatient(prevPatient => {
        if (!prevPatient) return null;
        return {
          ...prevPatient,
          entries: prevPatient.entries ? [...prevPatient.entries, newEntry] : [newEntry],
        };
      });
      setActiveForm(null); // Hide form on successful submission
      setNotification({ message: "New entry added successfully!", type: 'success' });
      setTimeout(() => setNotification(null), 5000);
    } catch (e: any) {
      console.error("Failed to add entry:", e);
      const errorMessage = e.response?.data?.error || e.response?.data?.issues?.map((issue: { path: string[], message: string}) => `${issue.path.join('.')}: ${issue.message}`).join('; ') || e.message || "An unknown error occurred while adding the entry.";
      setNotification({ message: `Error: ${errorMessage}`, type: 'error' });
      throw e; // Re-throw for form-level error display
    }
  };

  const handleCancelForm = () => {
    setActiveForm(null);
    setNotification(null);
  };


  if (loading) return <Container><CircularProgress /></Container>;
  if (error && !patient) return <Container><Alert severity="error">{error}</Alert></Container>;
  if (!patient) return <Container><Typography>Patient not found.</Typography></Container>;

  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <span role="img" aria-label="male">♂️</span>;
      case Gender.Female:
        return <span role="img" aria-label="female">♀️</span>;
      case Gender.Other:
        return <span role="img" aria-label="other">⚧️</span>;
      default:
        return null;
    }
  };

  return (
    <Container>
      {/* ... Patient Header and Info ... same as before ... */}
       <Box sx={{ my: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom>Patientor</Typography>
        <Button variant="contained" component={RouterLink} to="/" sx={{ mb: 2 }}>HOME</Button>
      </Box>

      <Box sx={{ mb: 3, p: 2, border: '1px solid lightgrey', borderRadius: '4px' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          {patient.name} {getGenderIcon(patient.gender)}
        </Typography>
        <Typography variant="body1">ssn: {patient.ssn || 'N/A'}</Typography>
        <Typography variant="body1">occupation: {patient.occupation}</Typography>
        <Typography variant="body1">date of birth: {patient.dateOfBirth || 'N/A'}</Typography>
      </Box>


      {notification && (
        <Alert severity={notification.type} sx={{ mb: 2 }} onClose={() => setNotification(null)}>
          {notification.message}
        </Alert>
      )}

      {/* Buttons to show different forms */}
      {!activeForm && (
        <Stack direction="row" spacing={2} sx={{ my: 2 }}>
          <Button variant="outlined" onClick={() => { setActiveForm("HealthCheck"); setNotification(null);}}>
            Add HealthCheck Entry
          </Button>
          <Button variant="outlined" onClick={() => { setActiveForm("OccupationalHealthcare"); setNotification(null);}}>
            Add Occupational Entry
          </Button>
          <Button variant="outlined" onClick={() => { setActiveForm("Hospital"); setNotification(null);}}>
            Add Hospital Entry
          </Button>
        </Stack>
      )}

      {/* Render the active form */}
      {activeForm === "HealthCheck" && (
        <AddHealthCheckEntryForm
          onCancel={handleCancelForm}
          onSubmit={handleAddEntrySubmit as (values: NewHealthCheckEntryValues) => Promise<void>} // Cast for specific form
          diagnoses={diagnoses}
        />
      )}
      {activeForm === "OccupationalHealthcare" && (
        <AddOccupationalHealthcareEntryForm
          onCancel={handleCancelForm}
          onSubmit={handleAddEntrySubmit as (values: NewOccupationalHealthcareEntryValues) => Promise<void>} // Cast
          diagnoses={diagnoses}
        />
      )}
      {activeForm === "Hospital" && (
        <AddHospitalEntryForm
          onCancel={handleCancelForm}
          onSubmit={handleAddEntrySubmit as (values: NewHospitalEntryValues) => Promise<void>} // Cast
          diagnoses={diagnoses}
        />
      )}

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h5" component="h3" gutterBottom>Entries</Typography>
        {patient.entries && patient.entries.length > 0 ? (
          patient.entries.map(entry => (
            <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
          ))
        ) : (
          <Typography>No entries found for this patient.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default PatientDetailPage;