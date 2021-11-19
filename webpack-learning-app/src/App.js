import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useNotes = (url) => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios.get(url).then((response) => {
      setNotes(response.data);
    });
  }, [url]);
  return notes;
};

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);
  const url = 'http://localhost:3001/notes';
  const notes = useNotes(url);

  return (
    <div className="container">
      hello webpack {counter} clicks
      <button
        onClick={() => {
          setCounter(counter + 1);
          setValues(values.concat(counter));
        }}
      >
        press
      </button>
      <div>
        {notes.length} notes on server {url}
      </div>
    </div>
  );
};

export default App;
