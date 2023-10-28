export default function Square({ value, onSquareClick }) {
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
