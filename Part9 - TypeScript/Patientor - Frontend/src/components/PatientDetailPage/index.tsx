import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, Button, CircularProgress, Alert, Divider } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Patient, Gender, Diagnosis, NewHealthCheckEntryValues } from '../../types'; 
import AddHealthCheckEntryForm from '../Entry/AddEntryForm';
import EntryDetails from '../Entry/EntryDetails';
import patientService from '../../services/patients';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientDetailPage = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddEntryForm, setShowAddEntryForm] = useState<boolean>(false); // State to toggle form
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);


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

  const handleAddEntry = async (values: NewHealthCheckEntryValues) => {
    if (!id) {
      console.error("Patient ID is missing");
      setNotification({message: "Patient ID is missing. Cannot add entry.", type: 'error'});
      return;
    }
    try {
      const newEntry = await patientService.addEntry(id, values);
      setPatient(prevPatient => {
        if (!prevPatient) return null;
        return {
          ...prevPatient,
          entries: prevPatient.entries ? [...prevPatient.entries, newEntry] : [newEntry]
        };
      });
      setShowAddEntryForm(false); // Hide form on successful submission
      setNotification({message: "New entry added successfully!", type: 'success'});
      setTimeout(() => setNotification(null), 5000); // Clear notification after 5s
    } catch (e: any) {
      console.error("Failed to add entry:", e);
      const errorMessage = e.response?.data?.error || e.response?.data?.issues?.map((issue: { path: string[], message: string}) => `${issue.path.join('.')}: ${issue.message}`).join('; ') || e.message || "An unknown error occurred while adding the entry.";
      setNotification({message: `Error: ${errorMessage}`, type: 'error'});
      throw e;
    }
  };

  if (loading) {
    return <Container><CircularProgress /></Container>;
  }

  if (error && !patient) { // Show main error only if patient data couldn't be loaded
    return <Container><Alert severity="error">{error}</Alert></Container>;
  }

  if (!patient) {
    return <Container><Typography>Patient not found.</Typography></Container>;
  }

  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male: return <MaleIcon />;
      case Gender.Female: return <FemaleIcon />;
      case Gender.Other: return <TransgenderIcon />;
      default: return null;
    }
  };

  return (
    <Container>
      <Box sx={{ my: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Patientor
        </Typography>
        <Button variant="contained" component={RouterLink} to="/" sx={{ mb: 2 }}>
          HOME
        </Button>
      </Box>

      <Box sx={{ mb: 3, p: 2, border: '1px solid lightgrey', borderRadius: '4px' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          {patient.name} {getGenderIcon(patient.gender)}
        </Typography>
        <Typography variant="body1">ssn: {patient.ssn || 'N/A'}</Typography>
        <Typography variant="body1">occupation: {patient.occupation}</Typography>
        <Typography variant="body1">date of birth: {patient.dateOfBirth || 'N/A'}</Typography>
      </Box>

      {/* Notification Area */}
      {notification && (
        <Alert severity={notification.type} sx={{ mb: 2 }} onClose={() => setNotification(null)}>
          {notification.message}
        </Alert>
      )}


      {/* Toggle button and Add Entry Form */}
      {showAddEntryForm ? (
        <AddHealthCheckEntryForm
          onCancel={() => {
            setShowAddEntryForm(false);
            setNotification(null); // Clear any form-specific error if cancelling
            }
          }
          onSubmit={handleAddEntry}
          diagnoses={diagnoses}
        />
      ) : (
        <Button
          variant="outlined"
          onClick={() => {
            setShowAddEntryForm(true);
            setNotification(null); // Clear previous notifications
            }
          }
          sx={{ my: 2 }}
        >
          Add New HealthCheck Entry
        </Button>
      )}

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h5" component="h3" gutterBottom>
          Entries
        </Typography>
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