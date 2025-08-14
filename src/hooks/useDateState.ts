import { useCallback, useState } from "react";

export function useDateState(initialDate = new Date()){
  const [date, setDate] = useState<Date>(initialDate);
  const handleDate = useCallback(
    (updater: Date | ((prev: Date) => Date)) => {
      setDate(prev =>
        typeof updater === "function"
          ? (updater as (p: Date) => Date)(prev)
          : updater
      );
    },
    [] // ✅ 레퍼런스 안정화
  );
  return [date, handleDate] as const;
}