import React, { useEffect, useState } from "react";
import { getToken, setToken } from "../auxiliary/authCache";
import { useLocalStorage } from "../auxiliary/useLocalStorage";
import useScreenSize from '../auxiliary/ScreenSize';

const GoogleAuth = ({token, hasToken, setToken}) => {
  const screenSize = useScreenSize();
  
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_AUTH_KEY,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInDiv"),
          { theme: "outline", size: "large" }
        );

        window.google.accounts.id.prompt(); // auto prompt
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = (response) => {
        setToken(response.credential);
    console.log("Encoded JWT ID token: " + response.credential);
    // You can decode this JWT to extract user info (name, email, picture)
    hasToken = true;
  };

  return (<div id="googleSignInDiv"
  style={{ width: .6 * screenSize.width, height: .2 * screenSize.height}}></div>);
};

export default GoogleAuth;
