import React, {useState} from "react"

export function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition (second, replace=false){
    const newHistory = [...history];
    if (replace === true) {
      newHistory.pop();
    }
    newHistory.push(second);
    setHistory(newHistory);
  };

  function back() {
    const newHistory = [...history];
    if (newHistory.length > 1) {
      newHistory.pop();
      setHistory(newHistory);
    }
  }
  
  const mode = history[history.length - 1]; 
  return {mode, transition, back};
};
