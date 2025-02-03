"use client";
import { PelletsProvider } from "./context/PelletsContext";

export default function PelletsLayout({ children }) {
  return <PelletsProvider>{children}</PelletsProvider>;
}
