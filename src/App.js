import React from 'react';
import './App.css';
import TimezoneDisplay from './components/TimezoneDisplay/TimezoneDisplay';

function App() {
  return (
    <div className="app-container">
      <h1>Country Time Viewer</h1>
      <TimezoneDisplay />
    </div>
  );
}

export default App;