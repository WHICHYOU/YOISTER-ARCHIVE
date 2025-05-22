"use client"; {/*  Ensure this hook runs only on the client side */}
{/*  hooks/use-mobile.ts */}

import { useState, useEffect } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); {/*  You can adjust the width threshold as needed */}
    };

    window.addEventListener("resize", checkIfMobile);
    checkIfMobile(); {/*  Check on mount */}

    return () => window.removeEventListener("resize", checkIfMobile); {/*  Cleanup */}
  }, []);

  return isMobile;
};
