import React, { useState, useEffect } from "react";
import "../styles/FlipCard.css"; // We'll define styles here
import axios from "axios";
import xmasBackImage from "../resources/xmasBack.png";
import frontImage from "../resources/front.jpg";
import useScreenSize from '../auxiliary/ScreenSize';
import ErrorPage from "./ErrorPage";
import GoogleAuth from "../components/GoogleAuth";

const FlipCard = ({token, setToken}) => {
  const [flipped, setFlipped] = useState(false);
  const handleClick = () => setFlipped(!flipped);
  const screenSize = useScreenSize();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState([]);
  const currentGroup = items[currentIndex];
  const [isLocked, setIsLocked] = useState(true);
  const [lockedText, setLockedText] = useState("(🔒) Destravar");

  useEffect(() => {
    const sendPost = async () => {
    try {
      const response = await axios.post(
        "https://api.antares.ninja/santa/getGroups",
        {"googleToken":token},
        {headers: {"Content-Type": "application/json"}}
      );

      const mappedObjects = response.data.map(
        item => ({
            groupId: item?.groupId ?? "",
            groupName: item?.groupName ?? "",
            isSorted: item?.isSorted ?? false,
            santaName: item?.santaName ?? "",
            nickName: item?.nickName ?? "",
            admin: item?.admin ?? false,
            base64: item?.base64 ?? null,
            santaInfo: item?.santaName ? "Seu Amigo Oculto:": "Aguarde o Sorteio",
    }));
      
      setItems(mappedObjects);
      console.log("POST response:", response.data);
    } catch (error) {
      setToken(null);
      console.error("POST error:", error);
    }
  };
  sendPost();
  },[token, setToken]);

  const onUnlockClick = (e) => {
    e.stopPropagation();       // <- prevents parent handler from running
    console.log("button clicked");
    if(isLocked){
        setIsLocked(false);
        setLockedText("(🔓) Travar");
    }else{
      setIsLocked(true);
        setLockedText("(🔒) Destravar");
    }
    
    // do button action here
  };
  const onButtonClick = async (e) => {
    e.stopPropagation();       // <- prevents parent handler from running
    console.log("button clicked");
        try {
        await axios.post(
        "https://api.antares.ninja/santa/sorts",
        {"googleToken":token,"groupId":currentGroup.groupId},
        {headers: {"Content-Type": "application/json"}}
      );
    } catch (error) {
      setToken(null);
      console.error("POST error:", error);
    }
  };

  const handleNextGroup = () => {setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);};
  const handlePreviousGroup = () => {setCurrentIndex((prevIndex) => prevIndex === 0 ? items.length - 1 : prevIndex - 1);};
  const buttonStyle = {
    display: "block",
    textAlign: "center",
    padding: .01 * screenSize.width,
    fontSize: .025 * screenSize.height,
    width: .3 * screenSize.width, 
    height: .075 * screenSize.height, 
    borderRadius: .1 * screenSize.height,
    zIndex:9999
  };


  if(items.length<=0){
    return (<div><GoogleAuth token={token} setToken={setToken} />
                <ErrorPage/></div>);
  }
  return (
    <div>
      <div className="flip-card-container"
        style={{ width: .9 * screenSize.width, height: .9 * screenSize.height }}>
          <div> <button className="previous-button" style={{ width: .075 * screenSize.width, height: .8 * screenSize.height }} onClick={handlePreviousGroup}/></div>
        <div className={`flip-card ${flipped ? "":"flipped"}`}  onClick={handleClick}>
          <div className="flip-card-front">
            <img src={frontImage} alt="Front card face" />
            <div className="center-text" style={{borderRadius:.05 * screenSize.height}}>{currentGroup.groupName}
              <br /><br />Seu Apelido:
              <br />{currentGroup.nickName}
              <br /><br /> {currentGroup.santaInfo}
              <br />{currentGroup.santaName}
            </div>
          </div>
          <div className="flip-card-back">
            <img src={xmasBackImage} alt="Back card face" style={{backgroundColor:"transparent"}}/>
            <div className="center-text" style={{borderRadius:.05 * screenSize.height}}>Nome do Grupo <br /> {currentGroup.groupName}
            <br/><br/>
                  <img style={{ width: .3 * screenSize.width, height: .3 * screenSize.height, borderRadius:.1 * screenSize.height}}
                      src={`data:image/png;base64,${currentGroup.base64}`}
                      alt={currentGroup.groupName}
                    className="group-image"
                  /><br/>
                      {currentGroup.isSorted && ("🌟Grupo Sorteado🌟")}
                      {currentGroup.admin && !currentGroup.isSorted && (<button onClick={onUnlockClick} style={buttonStyle}>{lockedText}</button>)}
                      {currentGroup.admin && !isLocked && !currentGroup.isSorted &&(<button onClick={onButtonClick} style={buttonStyle}>Sortear</button>)}
            </div>
          </div>
        </div>
        <div> <button className="next-button" style={{ width: .075 * screenSize.width, height: .7 * screenSize.height }} onClick={handleNextGroup}/></div>
      </div>

    </div>
  );
};

export default FlipCard;
