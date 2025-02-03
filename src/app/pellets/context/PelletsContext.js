"use client";
import { createContext, useContext, useState } from "react";

const PelletsContext = createContext();

export function PelletsProvider({ children }) {
  const [totalBags, setTotalBags] = useState(0);
  const [totalTons, setTotalTons] = useState(0);
  const [dates, setDates] = useState([]);

  return (
    <PelletsContext.Provider value={{ totalBags, setTotalBags, totalTons, setTotalTons, dates, setDates }}>
      {children}
    </PelletsContext.Provider>
  );
}

export function usePellets() {
  return useContext(PelletsContext);
}

