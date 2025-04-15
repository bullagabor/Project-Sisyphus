import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    if (value === '=') {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput('Hiba');
      }
    } else if (value === 'C') {
      setInput('');
    } else {
      setInput(input + value);
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

  return (
    <div className="App">
      <h2>Számológép</h2>
      <input type="text" value={input} readOnly />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 60px)', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
        {buttons.map((btn, idx) => (
          <button key={idx} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
      </div>
    </div>
  );
}

export default App;
