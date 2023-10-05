import { Entry } from '../types';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <div>
          <p>
            {entry.date} <LocalHospitalIcon />
          </p>
          <p>{entry.description}</p>
          <p>diagnosed by {entry.specialist}</p>
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div>
          <p>
            {entry.date} <BusinessCenterIcon /> {entry.employerName}
          </p>
          <p>{entry.description}</p>
          <p>diagnosed by {entry.specialist}</p>
        </div>
      );
    case 'HealthCheck':
      let style: { color: string } = { color: 'green' };

      if (entry.healthCheckRating === 1) {
        style.color = 'yellow';
      } else if (entry.healthCheckRating === 2) {
        style.color = 'orange';
      } else if (entry.healthCheckRating === 3) {
        style.color = 'red';
      }

      return (
        <div>
          <p>
            {entry.date} <EventAvailableIcon />
          </p>
          <p>{entry.description}</p>
          <p>
            Health check rating: <FavoriteIcon style={style} />
          </p>
          <p>diagnosed by {entry.specialist}</p>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
