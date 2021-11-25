import { useState } from "react";

export function useToggle() {
  const [toggle, setToggle] = useState<boolean>(false);
  return {
    toggle,
    setToggle,
  };
}
