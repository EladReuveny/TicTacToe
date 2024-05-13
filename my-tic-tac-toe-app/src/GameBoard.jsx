import PropTypes from "prop-types";
import React, { useState } from "react";

const initialBoard = Array(9).fill(null);

const GameBoard = ({ isSinglePlayer }) => {
  const [board, setBoard] = useState(initialBoard);
  const [xIsTurn, setXIsTurn] = useState(true);

  const renderSquare = (index) => {
    return (
      <button className={`square ${board[index] === 'X' ? 'square-x' : 'square-o'}`} onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const handleClick = (index) => {
    if(calculateWinner(board) || board[index])
        return;
    xIsTurn ? board[index] = 'X' : board[index] = 'O';
    setBoard(board);
    setXIsTurn(!xIsTurn);
  };

  const calculateWinner = (board) => {
    const possibleSolutions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const element of possibleSolutions) {
        const [a, b, c] = element;
        if(board[a] && board[a] === board[b] && board[b] === board[c])
            return board[a];
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner ? (
    `${winner} is the winner. Game Over!`
  ) : (
    board.every(value => value !== null) ? (
        `DRAW!`
    ) : (
    `Player's turn: ${xIsTurn ? 'X' : 'O'}`
    )
  ) 

  return (
    <div className="board">
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

GameBoard.propTypes = {
  isSinglePlayer: PropTypes.bool.isRequired,
};

GameBoard.defaultProps = {
  isSinglePlayer: false,
};

export default GameBoard;
