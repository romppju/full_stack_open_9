import { HealthCheckRating, EntryWithoutId, HealthCheckEntry } from '../types';
import { useState, useEffect, SyntheticEvent } from 'react';
import {
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import diagnosesService from '../services/diagnoses';

interface formProps {
  addEntry: (e: EntryWithoutId) => void;
  show: boolean;
}

const ratingValues: number[] = Object.values(HealthCheckRating)
  .filter((item) => !isNaN(Number(item)))
  .map((v) => Number(v));

const getDiagnosisCodes = async () => {
  const diagnoses = await diagnosesService.getAllDiagnoses();
  return diagnoses.map((diagnosis) => diagnosis.code);
};

const HealthCheckForm = (props: formProps) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [codes, setCodes] = useState<string[]>([]);

  useEffect(() => {
    getDiagnosisCodes().then((data) => setCodes(data));
  }, []);

  if (!props.show) {
    return null;
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const rating = Object.values(HealthCheckRating).find(
      (v) => v.toString() === healthCheckRating.toString()
    );

    const newEntry: any = {
      type: 'HealthCheck' as HealthCheckEntry['type'],
      date: date,
      description: description,
      specialist: specialist,
      healthCheckRating: rating as HealthCheckRating,
    };

    if (diagnosisCodes.length > 0) {
      newEntry.diagnosisCodes = diagnosisCodes;
    }

    props.addEntry(newEntry);

    setDate('');
    setDescription('');
    setDiagnosisCodes([]);
    setSpecialist('');
    setHealthCheckRating('');
  };

  return (
    <div>
      <Typography variant="h6">New HealthCheck entry</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          required
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></TextField>
        <TextField
          fullWidth
          required
          label="Specialist"
          value={specialist}
          onChange={(event) => setSpecialist(event.target.value)}
        ></TextField>
        <InputLabel>Date</InputLabel>
        <TextField
          fullWidth
          required
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        ></TextField>

        <InputLabel>Diagnosis codes</InputLabel>
        <Select
          label="DiagnosisCodes"
          multiple
          fullWidth
          value={diagnosisCodes}
          onChange={(event) =>
            setDiagnosisCodes(event.target.value as string[])
          }
        >
          {codes.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
        <InputLabel>Health check rating</InputLabel>
        <Select
          label="Rating"
          required
          fullWidth
          value={healthCheckRating}
          onChange={(event) =>
            setHealthCheckRating(event.target.value as string)
          }
        >
          {ratingValues.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
        <Button type="submit">Add entry</Button>
      </form>
    </div>
  );
};

export default HealthCheckForm;
