import React, { useState } from 'react';

function Square({ value, onClick }) {
  const color = value === 'X' ? 'blue' : value === 'O' ? 'red' : 'black';
  return (
    <button
      onClick={onClick}
      style={{
        width: '60px',
        height: '60px',
        fontSize: '24px',
        color: color
      }}
    >
      {value}
    </button>
  );
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const status = winner
    ? `Győztes: ${winner}`
    : `Következő játékos: ${xIsNext ? 'X' : 'O'}`;

  function handleClick(i) {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Tic-Tac-Toe</h2>
      <div>{status}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 60px)', margin: '20px auto' }}>
        {squares.map((val, i) => (
          <Square key={i} value={val} onClick={() => handleClick(i)} />
        ))}
      </div>
      <button onClick={handleReset}>Új játék</button>
    </div>
  );
}

function calculateWinner(sq) {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for (let [a, b, c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];
  }
  return null;
}

export default App;
