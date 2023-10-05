import {
  NewPatient,
  Gender,
  EntryWithoutId,
  HealthCheckRating,
  Discharge,
  SickLeave,
  Diagnosis,
} from './types';

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrext or missing name!');
  }
  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrext or missing ssn!');
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrext or missing ssn!');
  }
  return occupation;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrext or missing date!');
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrext or missing gender!');
  }
  return gender;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (str: string): str is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(str);
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };
    return newPatient;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrext or missing description!');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrext or missing specialist!');
  }
  return specialist;
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => Number(v))
    .includes(rating);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error('Incorrext or missing health check rating!');
  }
  return rating;
};

const parseEmployer = (employer: unknown): string => {
  if (!employer || !isString(employer)) {
    throw new Error('Incorrext or missing employer name!');
  }
  return employer;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== 'object') {
    throw new Error('Incorrect or missing discharge');
  }

  if (!('date' in discharge && 'criteria' in discharge)) {
    throw new Error('Incorrect or missing discharge');
  }

  if (
    !isString(discharge.date) ||
    !isDate(discharge.date) ||
    !isString(discharge.criteria)
  ) {
    throw new Error('Incorrect or missing discharge');
  }
  return discharge as Discharge;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== 'object') {
    throw new Error('Incorrect or missing sick leave');
  }

  if (!('startDate' in sickLeave && 'endDate' in sickLeave)) {
    throw new Error('Incorrect or missing sick leave');
  }

  if (
    !isString(sickLeave.startDate) ||
    !isDate(sickLeave.startDate) ||
    !isString(sickLeave.endDate) ||
    !isDate(sickLeave.endDate)
  ) {
    throw new Error('Incorrect or missing sick leave');
  }
  return sickLeave as SickLeave;
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis['code']> => {
  if (!codes || typeof codes !== 'object') {
    throw new Error('Incorrect or missing diagnosis codes');
  }

  if (!Array.isArray(codes)) {
    throw new Error('Incorrect or missing diagnosis codes');
  }

  if (!codes.every((i) => isString(i))) {
    throw new Error('Incorrect or missing diagnosis codes');
  }

  return codes as Array<Diagnosis['code']>;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'type' in object &&
    'description' in object &&
    'date' in object &&
    'specialist' in object
  ) {
    switch (object.type) {
      case 'HealthCheck':
        if ('healthCheckRating' in object && 'diagnosisCodes' in object) {
          const newEntry = {
            type: object.type,
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
          };
          return newEntry;
        } else if ('healthCheckRating' in object) {
          const newEntry = {
            type: object.type,
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
          return newEntry;
        } else {
          throw new Error('Incorrect or missing data');
        }

      case 'Hospital':
        if ('discharge' in object && 'diagnosisCodes' in object) {
          const newEntry = {
            type: object.type,
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            discharge: parseDischarge(object.discharge),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
          };
          return newEntry;
        } else if ('discharge' in object) {
          const newEntry = {
            type: object.type,
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            discharge: parseDischarge(object.discharge),
          };
          return newEntry;
        } else {
          throw new Error('Incorrect or missing data');
        }

      case 'OccupationalHealthcare':
        if (
          'employerName' in object &&
          'sickLeave' in object &&
          'diagnoseCodes' in object
        ) {
          const newEntry = {
            type: object.type,
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            employerName: parseEmployer(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave),
            diagnosisCodes: parseDiagnosisCodes(object.diagnoseCodes),
          };
          return newEntry;
        } else if ('employerName' in object && 'sickLeave' in object) {
          const newEntry = {
            type: object.type,
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            employerName: parseEmployer(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave),
          };
          return newEntry;
        } else if ('employerName' in object) {
          const newEntry = {
            type: object.type,
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            employerName: parseEmployer(object.employerName),
          };
          return newEntry;
        } else {
          throw new Error('Incorrect or missing data');
        }

      default:
        throw new Error('Incorrect or missing data');
    }
  } else {
    throw new Error('Incorrect or missing data');
  }
};

export default toNewPatient;
