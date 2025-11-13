// LoginPage.js
import React, {useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useScreenSize from '.././auxiliary/ScreenSize';
import { Link } from "react-router-dom";

const GroupPage = ({token}) => {
  const { username } = useParams();
  const [groupName, setGroupName] = useState("");
  const [nickName, setNickName] = useState("");
  const [postResponse, setPostResponse] = useState("");
  const [isCreating, setIsCreating] = useState(true);
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

    const sendPost = async () => {
    try {
      console.log("GroupName:", groupName);
      console.log("NickName:", nickName);
      const response = await axios.post(
        "https://api.antares.ninja/santa/newSanta",
        {
          "googleToken":token,
          "groupName":groupName,
          "nickName":nickName,
        },
        {headers: {"Content-Type": "application/json"}}
      );
      setIsCreating(false);
      } catch (error) {
      console.error("POST error:", error);
    }
  };

  if(!isCreating){
    return (
          <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-2xl shadow-xl w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Parabens
        </h1>
          <h2> O grupo <i><b>{groupName}</b></i> foi criado com sucesso.</h2>
          <h2>Seu apelido no grupo é <i><b>{nickName}</b></i> </h2>
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
          Preencha abaixo os dados para gerar um novo grupo.
        </h4>
        <h4>O grupo gerado aparecerá em sua pagina inicial para compartilhamento</h4>

          <h2>Digite o nome desejado para o grupo:</h2>
          <input style={inputStyle}
        type="text"
        value={groupName}
        onChange={e => setGroupName(e.target.value)}
        placeholder="Nome do Grupo"
      />       
          <br/>
          <h2>Digite o seu apelido no grupo:</h2>
          <input style={inputStyle}
        type="text"
        value={nickName}
        onChange={e => setNickName(e.target.value)}
        placeholder="Seu apelido"
      /><br/><br/>
          <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700" style={inputStyle} onClick={sendPost}>
            Create
          </button>
      </div>
    </div>
  );
};

export default GroupPage;
