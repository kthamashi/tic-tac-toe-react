export default function GameOverModal({ winningMessage, restartGame }) {
  return (
    <div className="winning-message show">
      <div>{winningMessage}</div>
      <button onClick={restartGame}>Restart</button>
    </div>
  );
}