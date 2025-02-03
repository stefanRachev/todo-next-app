"use client";
import { createContext, useContext, useState } from "react";

const PelletsContext = createContext();

export function PelletsProvider({ children }) {
  const [totalBags, setTotalBags] = useState(0);
  const [totalTons, setTotalTons] = useState(0);
  const [firstDate, setFirstDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [dates, setDates] = useState([]);

  return (
    <PelletsContext.Provider
      value={{
        totalBags,
        setTotalBags,
        totalTons,
        setTotalTons,
        dates,
        setDates,
        firstDate,
        setFirstDate,
        lastDate,
        setLastDate,
      }}
    >
      {children}
    </PelletsContext.Provider>
  );
}

export function usePellets() {
  return useContext(PelletsContext);
}
