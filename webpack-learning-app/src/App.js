import React, { useState } from 'react';

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);

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
    </div>
  );
};

export default App;
