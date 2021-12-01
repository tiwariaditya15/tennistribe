import { useState } from "react";

export function useError(values: string | null) {
  const [error, setError] = useState<string | null>(null);
  return [error, setError];
}
