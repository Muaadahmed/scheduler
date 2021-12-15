import React, {useState} from "react"

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (second, replace=false){
    if (replace === true) {
      history.splice(history.indexOf(mode), 1, second);
      setMode(second);
      setHistory(history);
      return;
    }

    setMode(second);
    history.push(second);
  };

  function back() {
    if (history.length > 1) {
      history.pop();
    }
    setMode(history[history.length - 1]);
  }
  
  return {mode, transition, back};
};
