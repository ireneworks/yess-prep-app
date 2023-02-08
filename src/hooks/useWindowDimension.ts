import { useEffect, useState } from "react";

const getWindowDimension = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
};

export default function useWindowDimension() {
  const [dimension, setDimension] = useState(getWindowDimension());

  useEffect(() => {
    const resizeHandler = () => {
      setDimension(getWindowDimension());
    };

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return dimension;
}
