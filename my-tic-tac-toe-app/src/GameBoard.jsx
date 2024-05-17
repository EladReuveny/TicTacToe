import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const GameBoard = ({ isSinglePlayer }) => {
  const initialBoard = Array(9).fill(null);

  const [board, setBoard] = useState(initialBoard);
  const [xIsTurn, setXIsTurn] = useState(true);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  const renderSquare = (index) => {
    return (
      <button
        id={`square-btn-${index}`}
        className={`square ${board[index] === "X" ? "square-x" : "square-o"}`}
        onClick={() => handleClick(index)}
      >
        <span className={`${board[index] ? "text-fade" : ""}`}>
          {board[index]}
        </span>
      </button>
    );
  };

  const handleClick = (index) => {
    if (winner || board[index]) return;

    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[index] = xIsTurn ? "X" : "O";
      return newBoard;
    });

    setXIsTurn((prevXIsTurn) => !prevXIsTurn);
  };

  useEffect(() => {
    if (isSinglePlayer && !xIsTurn && !winner) {
      setTimeout(() => {
        const rndIndex = getEmptyRandomIndex();
        console.log(rndIndex);

        setBoard((prevBoard) => {
          const newBoard = [...prevBoard];
          newBoard[rndIndex] = "O";
          return newBoard;
        });

        setXIsTurn((prevXIsTurn) => !prevXIsTurn);
      }, 500);
    }
  }, [xIsTurn]);

  const getEmptyRandomIndex = () => {
    let i;
    do {
      i = Math.floor(Math.random() * board.length);
    } while (board[i]);
    return i;
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
      if (board[a] && board[a] === board[b] && board[b] === board[c])
        return board[a];
    }
    return null;
  };

  const winner = calculateWinner(board);

  const statusClass = xIsTurn ? "x-player" : "o-player";

  const status = winner ? (
    <>
      <span className={winner === "X" ? "x-player" : "o-player"}>{winner}</span>{" "}
      is the winner. Game Over!
    </>
  ) : board.every((value) => value !== null) ? (
    `DRAW!`
  ) : (
    <>
      Player's turn:
      <span className={statusClass}>{xIsTurn ? "X" : "O"}</span>
    </>
  );

  useEffect(() => {
    if (winner) {
      winner === "X" ? setXScore(xScore + 1) : setOScore(oScore + 1);
    }
  }, [winner]);

  return (
    <>
      <div className="score">
        <div className="score-x">
          <span id="x-score" className="player-score">
            {xScore}{" "}
          </span>
          <span id="x-player" className="x-player">
            X
          </span>
        </div>
        <div className="score-o">
          <span id="o-score" className="player-score">
            {oScore}{" "}
          </span>
          <span id="o-player" className="o-player">
            O
          </span>
        </div>
      </div>
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
      <div className="buttons-div">
        <button
          className="next-set-btn"
          onClick={() => {
            setBoard(() => Array(9).fill(null));
            setXIsTurn(isSinglePlayer ? true : xIsTurn);
          }}
        >
          Next set
        </button>
        <button
          className="reset-btn"
          onClick={() => {
            setBoard(() => Array(9).fill(null));
            setXIsTurn(true);
            setXScore(0);
            setOScore(0);
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
};

GameBoard.propTypes = {
  isSinglePlayer: PropTypes.bool.isRequired,
};

GameBoard.defaultProps = {
  isSinglePlayer: false,
};

export default GameBoard;
