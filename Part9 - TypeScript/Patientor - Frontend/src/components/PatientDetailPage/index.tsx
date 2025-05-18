import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, Button, CircularProgress } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender'; 

import { Patient, Gender } from '../../types';
import patientService from '../../services/patients';

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <Container><CircularProgress /></Container>;
  }

  if (error) {
    return <Container><Typography color="error">{error}</Typography></Container>;
  }

  if (!patient) {
    return <Container><Typography>Patient not found.</Typography></Container>;
  }

  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      case Gender.Other:
        return <TransgenderIcon />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Box sx={{ my: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Patientor
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/"
          sx={{ mb: 2 }}
        >
          HOME
        </Button>
      </Box>

      <Box>
        <Typography variant="h4" component="h2" gutterBottom>
          {patient.name} {getGenderIcon(patient.gender)}
        </Typography>
        <Typography variant="body1">
          ssh: {patient.ssn || 'N/A'}
        </Typography>
        <Typography variant="body1">
          occupation: {patient.occupation}
        </Typography>
      </Box>
    </Container>
  );
};

export default PatientDetailPage;