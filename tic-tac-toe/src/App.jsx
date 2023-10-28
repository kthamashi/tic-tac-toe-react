import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import GameOverModal from "./components/GameoverModal";

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

export function calculateWinner(squares) {
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
