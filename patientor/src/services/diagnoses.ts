import axios from 'axios';
import { Diagnosis } from '../types';

const getAllDiagnoses = () => {
  return axios
    .get<Diagnosis[]>('http://localhost:3001/api/diagnoses')
    .then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllDiagnoses };
