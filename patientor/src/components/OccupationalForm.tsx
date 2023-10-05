import {
  EntryWithoutId,
  OccupationalHealthcareEntry,
  SickLeave,
} from '../types';
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

const OccupationalForm = (props: formProps) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [specialist, setSpecialist] = useState('');
  const [codes, setCodes] = useState<string[]>([]);
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');
  const [employerName, setEmployerName] = useState('');

  useEffect(() => {
    getDiagnosisCodes().then((data) => setCodes(data));
  }, []);

  if (!props.show) {
    return null;
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const newEntry: any = {
      type: 'OccupationalHealthcare' as OccupationalHealthcareEntry['type'],
      description: description,
      date: date,
      specialist: specialist,
      employerName: employerName,
    };

    if (diagnosisCodes.length > 0) {
      newEntry.diagnosisCodes = diagnosisCodes;
    }

    if (sickLeaveStart !== '' && sickLeaveEnd !== '') {
      const sickLeave = {
        startDate: sickLeaveStart,
        endDate: sickLeaveEnd,
      } as SickLeave;
      newEntry.sickLeave = sickLeave;
    }

    props.addEntry(newEntry);

    setDate('');
    setDescription('');
    setDiagnosisCodes([]);
    setSpecialist('');
    setEmployerName('');
    setSickLeaveStart('');
    setSickLeaveEnd('');
  };

  return (
    <div>
      <Typography variant="h6">New Occupational healthcare entry</Typography>
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
        <InputLabel>Employer name</InputLabel>
        <TextField
          fullWidth
          required
          value={employerName}
          onChange={(event) => setEmployerName(event.target.value)}
        ></TextField>
        <InputLabel>Sickleave start date</InputLabel>
        <TextField
          fullWidth
          type="date"
          value={sickLeaveStart}
          onChange={(event) => setSickLeaveStart(event.target.value)}
        ></TextField>
        <InputLabel>Sickleave end date</InputLabel>
        <TextField
          fullWidth
          type="date"
          value={sickLeaveEnd}
          onChange={(event) => setSickLeaveEnd(event.target.value)}
        ></TextField>
        <Button type="submit">Add entry</Button>
      </form>
    </div>
  );
};

export default OccupationalForm;
