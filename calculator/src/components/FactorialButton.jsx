import { ACTIONS } from "../lib/Actions";

function FactorialButton({ dispatch }) {
  return (
    <button onClick={() => dispatch({ type: ACTIONS.FACTORIAL })}>n!</button>
  );
}

export default FactorialButton;
