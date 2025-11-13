import React, { useEffect, useState } from "react";
import frontImage from "../resources/front.jpg";
import backImage from "../resources/back.jpg";

const CardBack = () => {  
    const [isShrunk, setIsShrunk] = useState(false);
    const [showBack, setShowBack] = useState(false);

  const handleClick = () => {
    setIsShrunk(true);
        setShowBack(false); // hide back until transition ends
  };

    const handleTransitionEnd = () => {
    if (isShrunk) {
      // When shrink finishes, show the back image
      setShowBack(true);
    }
  };
    
return (
    <div       onClick={handleClick}
      style={{
        textAlign: "center",
        padding: "20px",
        cursor: "pointer",
      }}>
      {!showBack ? (
        <img
          src={backImage}
          alt="Back"
          onClick={handleClick}
          onTransitionEnd={handleTransitionEnd}
          style={{
            width: isShrunk ? "0px" : "300px",
            height: "450px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            transition: "width 1.5s ease",
          }}
        />
      ) : (
        <img
          src={frontImage}
          alt="Front"
          style={{
            width: "300px",
            height: "450px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            transition: "opacity 1.5s ease",
          }}
        />
      )}
    </div>
  );
};

export default CardBack;