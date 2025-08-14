import { useState } from "react";

export function useDateState(initialDate = new Date()){
  const [date, setDate] = useState<Date>(initialDate);
  const handleDate = (updater: Date | ((prev: Date) => Date)) => {
    setDate(typeof updater === "function" ? updater(date) : updater);
  };
  return [date, handleDate] as const;
}