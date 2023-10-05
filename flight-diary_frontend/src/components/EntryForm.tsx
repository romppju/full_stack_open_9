import { useState } from 'react';
import { NewEntry } from '../types';

const EntryForm = ({
  handleSubmit,
}: {
  handleSubmit: (a: NewEntry) => void;
}) => {
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleAddClick = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const entryToAdd = {
      date: newDate,
      visibility: newVisibility,
      weather: newWeather,
      comment: newComment,
    };
    handleSubmit(entryToAdd);

    setNewDate('');
    setNewComment('');
  };

  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={handleAddClick}>
        <div>
          date:
          <input
            type="date"
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)}
          />
        </div>
        <div>
          visibility: great
          <input
            type="radio"
            name="visibility"
            onChange={() => setNewVisibility('great')}
          />
          good
          <input
            type="radio"
            name="visibility"
            onChange={() => setNewVisibility('good')}
          />
          ok
          <input
            type="radio"
            name="visibility"
            onChange={() => setNewVisibility('ok')}
          />
          poor
          <input
            type="radio"
            name="visibility"
            onChange={() => setNewVisibility('poor')}
          />
        </div>
        <div>
          weather: sunny
          <input
            type="radio"
            name="weather"
            onChange={() => setNewWeather('sunny')}
          />
          rainy
          <input
            type="radio"
            name="weather"
            onChange={() => setNewWeather('rainy')}
          />
          cloudy
          <input
            type="radio"
            name="weather"
            onChange={() => setNewWeather('cloudy')}
          />
          stormy
          <input
            type="radio"
            name="weather"
            onChange={() => setNewWeather('stormy')}
          />
          windy
          <input
            type="radio"
            name="weather"
            onChange={() => setNewWeather('windy')}
          />
        </div>
        <div>
          comment
          <input
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default EntryForm;
