// LoginPage.js
import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useScreenSize from '../auxiliary/ScreenSize';
import { Link } from "react-router-dom";

const GroupPage = ({token}) => {
  const { groupId } = useParams();
  const [nickName, setNickName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [postResponse, setPostResponse] = useState("");
  const [isCreating, setIsCreating] = useState(true);
  const [isValidId, setIsValidId] = useState(false);
  const screenSize = useScreenSize();

  const inputStyle = {
  display: "block",
  textAlign: "center",
  padding: .01 * screenSize.width,
  fontSize: .05 * screenSize.height,
  width: .8 * screenSize.width, 
  height: .075 * screenSize.height, 
  borderRadius: .03 * screenSize.height
  };

  
  useEffect(() => {
    const initialPost = async () => {
    try {
      const response = await axios.post(
        "https://api.antares.ninja/santa/group",
        {"groupId":groupId},
        {headers: {"Content-Type": "application/json"}}
      );
      setIsValidId(false);
      if(response!= null && response.data != null && response.data.groupName != null){
        setGroupName(response.data.groupName); 
        setIsValidId(true);
      }

    } catch (error) {
      setIsValidId(false);
      console.error("POST error:", error);
    }
  };
  initialPost();
  },[]);


    const sendPost = async () => {
    try {
      const response = await axios.post(
        "https://api.antares.ninja/santa/newPlayer",
        {
          "googleToken":token,
          "groupId":groupId,
          "nickName":nickName,
        },
        {headers: {"Content-Type": "application/json"}}
      );
      setIsCreating(false);
      } catch (error) {
      console.error("POST error:", error);
    }
  };

  if(!isValidId){
        return (
          <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-2xl shadow-xl w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Grupo inexistente
        </h1>
          <h2>Verifique o Id ou escaneie o QR Code novamente </h2>
        </div>

          <Link to="/" style={inputStyle}>
            Voltar
          </Link>
        </div>
    )
  }

  if(!isCreating){
    return (
          <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-2xl shadow-xl w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Parabens
        </h1>
          <h2>Seu apelido no grupo <i><b>{groupName}</b></i> é <i><b>{nickName}</b></i> </h2>
        </div>

          <Link to="/" style={inputStyle}>
            Inicio
          </Link>
        </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-2xl shadow-xl w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Bem vindo!
        </h2>
        <h4>
          Voê foi convidado a participar de um novo grupo. {groupName}
        </h4>
        <h4>Escolha seu apelido e envie para participar</h4>

          <br/>
          <h2>Digite o seu apelido no grupo:</h2>
          <input style={inputStyle}
        type="text"
        value={nickName}
        onChange={e => setNickName(e.target.value)}
        placeholder="Seu apelido"
      /><br/><br/>
          <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700" style={inputStyle} onClick={sendPost}>
            Enviar
          </button>
      </div>
    </div>
  );
};

export default GroupPage;
