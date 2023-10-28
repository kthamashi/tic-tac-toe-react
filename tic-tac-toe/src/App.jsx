import { useEffect, useState } from "react";
import "./App.css";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
      disabled={value ? true : false}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, playerNames }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status =
      "Next player: " +
      (xIsNext ? playerNames.playerXName : playerNames.playerOName);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [currentSquares, setCurrentSquares] = useState([
    ...Array(9).fill(null),
  ]);
  const [gameList, setGameList] = useState([]);
  const [playerNames, setPlayerNames] = useState({
    playerXName: "Player 1",
    playerOName: "Player 2",
  });
  const [isGameOver, setIsGameOver] = useState(false);
  const [winningMessage, setWinningMessage] = useState("Draw");

  useEffect(() => {
    const playerXName = prompt("Enter Player X name:");
    const playerOName = prompt("Enter Player O name:");
    setPlayerNames({
      playerXName: playerXName,
      playerOName: playerOName,
    });
  }, []);

  function handlePlay(nextSquares) {
    setCurrentSquares(nextSquares);
    setXIsNext(!xIsNext);
    const winner = calculateWinner(nextSquares);
    if (winner) {
      gameOver(nextSquares);
    }
  }

  function gameOver(nextSquares) {
    setGameList((prev) => [
      ...prev,
      {
        winner: xIsNext ? playerNames.playerXName : playerNames.playerOName,
        moves: structuredClone(nextSquares),
      },
    ]);
    setWinningMessage(
      `${xIsNext ? playerNames.playerXName : playerNames.playerOName} Won!`
    );
    setIsGameOver(true);
  }

  function jumpTo(idx) {
    setCurrentSquares(gameList[idx].moves);
  }

  const gameHistoryView = (
    <ol>
      {gameList.map((game, idx) => (
        <li key={idx} onClick={() => jumpTo(idx)}>
          Game {idx + 1} - {game.winner} Wins!
        </li>
      ))}
    </ol>
  );

  function resetGame() {
    setCurrentSquares([...Array(9).fill(null)]);
    setXIsNext(true);
    setIsGameOver(false);
  }

  return (
    <div>
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            playerNames={playerNames}
          />
        </div>
        <div className="history-list">{gameHistoryView}</div>
      </div>

      {isGameOver && (
        <GameOverModal
          winningMessage={winningMessage}
          restartGame={resetGame}
        />
      )}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function GameOverModal({ winningMessage, restartGame }) {
  return (
    <div className="winning-message show">
      <div>{winningMessage}</div>
      <button onClick={restartGame}>Restart</button>
    </div>
  );
}
