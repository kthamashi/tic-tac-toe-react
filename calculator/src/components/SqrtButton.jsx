import { ACTIONS } from "../lib/Actions";
import React from "react";

function SqrtButton({ dispatch }) {
  return (
    <button onClick={() => dispatch({ type: ACTIONS.SQUARE_ROOT })}>√</button>
  );
}

export default SqrtButton;