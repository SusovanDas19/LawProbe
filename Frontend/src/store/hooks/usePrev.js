import { useEffect, useRef } from "react";
// Custom hook to get previous value
export function usePrev(atomValue, key) {
  const ref = useRef();

  // Loading initial value from localStorage
  useEffect(() => {
    const savedValue = localStorage.getItem(key);
    ref.current = savedValue || null;
  }, [key]);

  // Updating localStorage and ref when atomValue changes
  useEffect(() => {
    if (atomValue) {
      localStorage.setItem(key, atomValue);
      ref.current = atomValue;
    }
  }, [atomValue, key]);

  return ref.current;
}