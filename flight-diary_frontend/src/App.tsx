import { useState, useEffect } from 'react';
import { DiaryEntry, NewEntry } from './types';
import { getAllEntries, createEntry } from './services/DiaryService';
import EntryForm from './components/EntryForm';
import Notification from './components/Notification';
import axios from 'axios';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    getAllEntries().then((data) => setDiaryEntries(data));
  }, []);

  const handleSubmit = (entryToAdd: NewEntry) => {
    createEntry(entryToAdd)
      .then((data) => setDiaryEntries(diaryEntries.concat(data)))
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setNotification(error.response?.data);
          setTimeout(() => {
            setNotification('');
          }, 5000);
        } else {
          console.log(error);
        }
      });
  };

  return (
    <div>
      <EntryForm handleSubmit={handleSubmit} />
      <Notification message={notification} />
      <h1>Diary Entries</h1>
      <div>
        {diaryEntries.map((entry, index) => (
          <div key={index}>
            <h3>{entry.date}</h3>
            <p>visibility: {entry.visibility}</p>
            <p>weather: {entry.weather}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
