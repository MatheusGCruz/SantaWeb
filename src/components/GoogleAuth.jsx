import React, { useCallback, useEffect } from "react";
import useScreenSize from '../auxiliary/ScreenSize';

const GoogleAuth = ({token, setToken}) => {
  const screenSize = useScreenSize();
  
  const handleCredentialResponse = useCallback((response) => {
    setToken(response.credential);
    const payload = JSON.parse(atob(response.credential.split(".")[1]));
    console.log(payload.locale);
  },[setToken]);

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
  }, [handleCredentialResponse]);



  return (<div id="googleSignInDiv"
  style={{ width: .6 * screenSize.width, height: .2 * screenSize.height}}></div>);
};

export default GoogleAuth;
