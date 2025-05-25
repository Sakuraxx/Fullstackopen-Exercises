// src/components/AddEntryForm/AddOccupationalHealthcareEntryForm.tsx
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
  SelectChangeEvent
} from '@mui/material';
import { Diagnosis, NewOccupationalHealthcareEntryValues } from '../../types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewOccupationalHealthcareEntryValues) => Promise<void>;
  diagnoses: Diagnosis[];
}

const AddOccupationalHealthcareEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>();

  const handleDiagnosisCodeChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setError(undefined);

    if (!description || !date || !specialist || !employerName) {
      setError("Required fields: Description, Date, Specialist, Employer Name.");
      return;
    }
    if ((sickLeaveStartDate && !sickLeaveEndDate) || (!sickLeaveStartDate && sickLeaveEndDate)) {
        setError("Both Sick Leave Start Date and End Date must be provided, or neither.");
        return;
    }

    try {
      await onSubmit({
        type: 'OccupationalHealthcare',
        description,
        date,
        specialist,
        employerName,
        diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
        sickLeave: sickLeaveStartDate && sickLeaveEndDate ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate } : undefined,
      });
      // Reset form or let parent handle
    } catch (e: any) {
      console.error("Submission error:", e);
       if (e.response && e.response.data && e.response.data.error) {
        setError(e.response.data.error);
      } else if (e.response && e.response.data && e.response.data.issues) {
        const zodError = e.response.data.issues.map((issue: { path: string[], message: string}) => `${issue.path.join('.')}: ${issue.message}`).join('; ');
        setError(`Validation failed: ${zodError}`);
      } else {
        setError("Failed to add entry. " + (e.message || "Unknown error."));
      }
    }
  };

  return (
    <Box sx={{ border: '1px dashed grey', p: 2, mt: 2, mb: 2 }}>
      <Typography variant="h6">New Occupational Healthcare entry</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Description" fullWidth value={description} onChange={({ target }) => setDescription(target.value)} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={date} onChange={({ target }) => setDate(target.value)} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Specialist" fullWidth value={specialist} onChange={({ target }) => setSpecialist(target.value)} required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Employer Name" fullWidth value={employerName} onChange={({ target }) => setEmployerName(target.value)} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Sick Leave Start Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={sickLeaveStartDate} onChange={({ target }) => setSickLeaveStartDate(target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Sick Leave End Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={sickLeaveEndDate} onChange={({ target }) => setSickLeaveEndDate(target.value)} />
          </Grid>
           <Grid item xs={12}>
             <FormControl fullWidth>
                <InputLabel id="occ-diagnosis-codes-label">Diagnosis codes</InputLabel>
                <Select
                    labelId="occ-diagnosis-codes-label"
                    multiple
                    value={diagnosisCodes}
                    onChange={handleDiagnosisCodeChange}
                    input={<OutlinedInput id="occ-select-multiple-chip" label="Diagnosis codes" />}
                    renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (<Chip key={value} label={value} />))}
                    </Box>
                    )}
                >
                {diagnoses.map((diagnosis) => (
                    <MenuItem key={diagnosis.code} value={diagnosis.code}>
                    {diagnosis.code} - {diagnosis.name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button color="secondary" variant="contained" onClick={onCancel}>CANCEL</Button>
            <Button type="submit" variant="contained" color="primary">ADD</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddOccupationalHealthcareEntryForm;