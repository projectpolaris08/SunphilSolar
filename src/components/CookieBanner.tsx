import React, { useEffect } from "react";

const CookieBanner: React.FC = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement("script");
    script.src =
      "https://app.termly.io/resource-blocker/4d6d2abe-8c84-467c-a3b7-9b9a78f838f7?autoBlock=on";
    script.type = "text/javascript";
    script.async = true;

    // Append script to document
    document.body.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return null; // This component doesn't render anything visible
};

export default CookieBanner;
