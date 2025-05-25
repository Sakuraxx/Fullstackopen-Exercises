import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
  OutlinedInput,
  Chip,
  SelectChangeEvent
} from '@mui/material';
import { Diagnosis, HealthCheckRating, NewHealthCheckEntryValues } from '../../types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewHealthCheckEntryValues) => Promise<void>; // Make onSubmit async
  diagnoses: Diagnosis[]; // Pass all available diagnoses
}

// Helper to get enum keys for select options
const healthCheckRatingOptions = Object.keys(HealthCheckRating)
  .filter((key) => isNaN(Number(key))) // Filter out numeric keys if enum is numeric
  .map((key) => ({
    value: HealthCheckRating[key as keyof typeof HealthCheckRating] as number, // Ensure value is number
    label: key,
  }));


const AddHealthCheckEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>();

  const handleDiagnosisCodeChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setError(undefined); // Clear previous errors

    // Basic validation (you might want more robust validation)
    if (!description || !date || !specialist) {
        setError("Please fill in all required fields: Description, Date, Specialist.");
        return;
    }
    try {
      await onSubmit({
        type: 'HealthCheck', // Set the type for the entry
        description,
        date,
        specialist,
        healthCheckRating,
        diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
      });
      // Optionally reset form fields here or let parent handle it
      setDescription('');
      setDate('');
      setSpecialist('');
      setHealthCheckRating(HealthCheckRating.Healthy);
      setDiagnosisCodes([]);
    } catch (e: any) {
      console.error("Submission error:", e);
      if (e.response && e.response.data && e.response.data.error) {
        setError(e.response.data.error);
      } else if (e.response && e.response.data && e.response.data.issues) {
        // Handle Zod validation errors from backend
        const zodError = e.response.data.issues.map((issue: { path: string[], message: string}) => `${issue.path.join('.')}: ${issue.message}`).join('; ');
        setError(`Validation failed: ${zodError}`);
      }
       else {
        setError("Failed to add entry. " + (e.message || "Unknown error."));
      }
    }
  };

  return (
    <Box sx={{ border: '1px dashed grey', p: 2, mt: 2, mb: 2 }}>
      <Typography variant="h6">New HealthCheck entry</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={({ target }) => setDate(target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Specialist"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="healthcheck-rating-label">Healthcheck rating</InputLabel>
              <Select
                labelId="healthcheck-rating-label"
                value={healthCheckRating}
                label="Healthcheck rating"
                onChange={({ target }) => setHealthCheckRating(Number(target.value) as HealthCheckRating)}
              >
                {healthCheckRatingOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label} ({option.value})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
             <FormControl fullWidth>
                <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>
                <Select
                    labelId="diagnosis-codes-label"
                    multiple
                    value={diagnosisCodes}
                    onChange={handleDiagnosisCodeChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Diagnosis codes" />}
                    renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                        <Chip key={value} label={value} />
                        ))}
                    </Box>
                    )}
                >
                {diagnoses.map((diagnosis) => (
                    <MenuItem
                    key={diagnosis.code}
                    value={diagnosis.code}
                    >
                    {diagnosis.code} - {diagnosis.name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button color="secondary" variant="contained" onClick={onCancel}>
              CANCEL
            </Button>
            <Button type="submit" variant="contained" color="primary">
              ADD
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddHealthCheckEntryForm;