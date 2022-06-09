import React from "react";
import axios from "axios";
import "./Logout.css";

export default function Logout() {
  const logout = async (e) => {
    await axios({
      method: "get",
      url: `http://localhost:3000/api/logout`,
      withCredentials: true,
    })
      .then((res) => {
        window.location.replace("http://localhost:3001");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  return (
    <div className="logout">
      <img
        className="logout-icon"
        src="./img/icons/logout.svg"
        alt="Icone de déconnexion"
      />
      <p className="logout-text" onClick={logout}>
        Déconnexion
      </p>
    </div>
  );
}
