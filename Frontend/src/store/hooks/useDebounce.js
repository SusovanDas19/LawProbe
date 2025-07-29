import { useRef } from "react";

export function useDebounce(functionCall, delay) {
    const currentClock = useRef();
  
    const fn = (...args) => {
      // Clear previous timeout
      clearTimeout(currentClock.current);
  
      // new timeout to delay functionCall
      currentClock.current = setTimeout(() => {
        functionCall(...args); // functionCall with the latest arguments
      }, delay);
    };
  
    return fn;
  }