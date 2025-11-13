import React, { useEffect } from "react";

const GoogleLoader = () => {
  useEffect(() => {
    // 1. Load Google platform.js dynamically
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // 2. Define onSignIn callback (Google calls this by name)
    window.onSignIn = (googleUser) => {
      const profile = googleUser.getBasicProfile();
      console.log("ID:", profile.getId()); // Do not send directly to backend
      console.log("Name:", profile.getName());
      console.log("Image URL:", profile.getImageUrl());
      console.log("Email:", profile.getEmail());
    };

    // Cleanup
    return () => {
      document.body.removeChild(script);
      delete window.onSignIn;
    };
  }, []);

  return (
    <div>
      {/* Google button will render here */}
      <div
        className="g-signin2"
        data-onsuccess="onSignIn"
      ></div>
    </div>
  );
};

export default GoogleLoader;
