import React, { useEffect } from "react";
import frontImage from "../resources/front.jpg";

const CardFront = () => {  return (
    <div>
      <img
        src={frontImage}
        alt="Example"
        style={{
          width: "300px",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      />
    </div>
  );
};

export default CardFront;