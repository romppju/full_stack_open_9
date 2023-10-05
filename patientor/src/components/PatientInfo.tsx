import {
  List,
  Typography,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
} from '@mui/material';
import { Patient, EntryWithoutId } from '../types';
import { useState, useEffect } from 'react';
import EntryDetails from './EntryDetails';
import patientService from '../services/patients';
import HealthCheckForm from './HealthCheckForm';
import HospitalForm from './HospitalForm';
import OccupationalForm from './OccupationalForm';
import Notification from './Notification';
import axios from 'axios';

const PatientInfo = ({ id }: { id: string | undefined }) => {
  const [patient, setPatient] = useState<Patient>();
  const [entryType, setEntryType] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (id) {
      patientService.getById(id).then((data) => setPatient(data));
    }
  }, [id, patient]);

  if (!patient) {
    return <p>Patient not found</p>;
  }

  const addNewEntry = async (entry: EntryWithoutId) => {
    if (id) {
      try {
        await patientService.createEntry(id, entry);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setNotification(error.response.data);
          setTimeout(() => {
            setNotification('');
          }, 5000);
        } else {
          setNotification('Something went wrong');
          setTimeout(() => {
            setNotification('');
          }, 5000);
        }
      }
    }
  };

  return (
    <div>
      <Typography variant="h6">{patient.name}</Typography>
      <List dense>
        <ListItem>
          <ListItemText>ssn: {patient.ssn}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>gender: {patient.gender}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>occupation: {patient.occupation}</ListItemText>
        </ListItem>
      </List>
      <Typography variant="h6">Select type for new entry</Typography>
      <Notification message={notification} />
      <Select
        value={entryType}
        fullWidth
        onChange={(event) => setEntryType(event.target.value)}
      >
        <MenuItem value={'HealthCheck'}>Health check</MenuItem>
        <MenuItem value={'Hospital'}>Hospital</MenuItem>
        <MenuItem value={'OccupationalHealthcare'}>
          Occupational health care
        </MenuItem>
      </Select>
      <HealthCheckForm
        addEntry={addNewEntry}
        show={entryType === 'HealthCheck'}
      />
      <HospitalForm addEntry={addNewEntry} show={entryType === 'Hospital'} />
      <OccupationalForm
        addEntry={addNewEntry}
        show={entryType === 'OccupationalHealthcare'}
      />
      <Typography variant="h6">Entries</Typography>
      <List dense>
        {patient.entries.map((entry, index) => (
          <ListItem key={index}>
            <ListItemText>
              <EntryDetails entry={entry} />
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PatientInfo;
