import { EntryWithoutId, HospitalEntry, Discharge } from '../types';
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

const getDiagnosisCodes = async () => {
  const diagnoses = await diagnosesService.getAllDiagnoses();
  return diagnoses.map((diagnosis) => diagnosis.code);
};

const HospitalForm = (props: formProps) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [specialist, setSpecialist] = useState('');
  const [codes, setCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  useEffect(() => {
    getDiagnosisCodes().then((data) => setCodes(data));
  }, []);

  if (!props.show) {
    return null;
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const discharge = {
      date: dischargeDate,
      criteria: dischargeCriteria,
    } as Discharge;

    const newEntry: any = {
      type: 'Hospital' as HospitalEntry['type'],
      date: date,
      description: description,
      specialist: specialist,
      discharge: discharge,
    };

    if (diagnosisCodes.length > 0) {
      newEntry.diagnosisCodes = diagnosisCodes;
    }

    props.addEntry(newEntry);

    setDate('');
    setDescription('');
    setDiagnosisCodes([]);
    setSpecialist('');
    setDischargeDate('');
    setDischargeCriteria('');
  };

  return (
    <div>
      <Typography variant="h6">New Hospital entry</Typography>
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
        <InputLabel>Discharge date</InputLabel>
        <TextField
          fullWidth
          required
          type="date"
          value={dischargeDate}
          onChange={(event) => setDischargeDate(event.target.value)}
        ></TextField>
        <InputLabel>Discharge criteria</InputLabel>
        <TextField
          fullWidth
          required
          value={dischargeCriteria}
          onChange={(event) => setDischargeCriteria(event.target.value)}
        ></TextField>
        <Button type="submit">Add entry</Button>
      </form>
    </div>
  );
};

export default HospitalForm;
