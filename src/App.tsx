import React from 'react';
import Calendar from './components/Calendar';
import events from './input.json';

const App: React.FC = () => {
  return (
    <div className="App">
      <Calendar events={events} />
    </div>
  );
};

export default App;
