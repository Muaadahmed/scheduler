import React, {useState} from "react"

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  function transition (second){
    setMode(second);
  };
  
  return {mode, transition};
};
