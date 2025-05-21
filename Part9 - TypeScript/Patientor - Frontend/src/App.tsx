import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import diagnoseService from "./services/diagnose";
import PatientListPage from "./components/PatientListPage";
import PatientDetailPage from "./components/PatientDetailPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const fetchedPatients = await patientService.getAll(); 
      setPatients(fetchedPatients);
    };

    const fetchDiagnoses = async () => {
      const fetchedDiagnoses = await diagnoseService.getAll();
      setDiagnoses(fetchedDiagnoses);
    };

    fetchPatientList();
    fetchDiagnoses();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Routes>
            <Route 
              path="/" 
              element={<PatientListPage patients={patients} setPatients={setPatients} />} 
            />
            <Route 
              path="/patients/:id" 
              element={<PatientDetailPage diagnoses={diagnoses}/>} 
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;