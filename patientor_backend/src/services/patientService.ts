import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  EntryWithoutId,
} from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: EntryWithoutId): Patient | undefined => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  const patient = patients.find((patient) => patient.id === id);

  if (patient) {
    patient.entries.push(newEntry);
    return patient;
  } else {
    return undefined;
  }
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatientById,
  addEntry,
};
