import { useEffect, useState } from "react";

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<string>("");

  const updateSize = () => {
    const width = window.innerWidth;
    if (width < 640) setScreenSize("xs");
    else if (width < 768) setScreenSize("sm");
    else if (width < 1024) setScreenSize("md");
    else if (width < 1280) setScreenSize("lg");
    else if (width < 1536) setScreenSize("xl");
    else setScreenSize("2xl");
  };

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return screenSize;
};
