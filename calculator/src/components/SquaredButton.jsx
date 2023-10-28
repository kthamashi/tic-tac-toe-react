import { ACTIONS } from "../App";

function SquaredButton({ dispatch }) {
  return (
    <button onClick={() => dispatch({ type: ACTIONS.SQUARED })}>
      x²
    </button>
  );
}

export default SquaredButton;