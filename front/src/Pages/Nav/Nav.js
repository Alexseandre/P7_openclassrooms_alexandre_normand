import React, { useState, useContext, useEffect } from "react";
import Logout from "../../Composants/Log/Logout";
import { UidContext } from "../../AppContext";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Nav.css";

export default function () {
  const connected = useContext(UidContext);
  const [dateSearch, setDataSearch] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const [resulFetch, setResultFetch] = useState([]);
  const toggleFunc = () => {
    setToggleSearch(!toggleSearch);
  };
  const [toggle, setToggle] = useState(false);
  const fetchData = async () => {
    await axios
      .get(`http://localhost:3000/api/users?pseudo=${dateSearch}&limit=15`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.data);
        setResultFetch(res.data.data);
      })
      .catch();
  };

  return (
    <header>
      <nav>
        <a
          href={window.location.href}
          className="nav-icon"
          aria-label="visit homepage"
          aria-current="page"
        >
          <span className="tittle-nav">
            <img
              className="groupo-sign"
              src="./img//icons/icon-left-font-monochrome-white.svg"
              alt="logo d'entreprise"
            />
          </span>
        </a>

        <div className="main-navlinks">
          <button
            onClick={(_) => {
              setToggle(!toggle);
            }}
            className={toggle ? "hamburger open" : "hamburger"}
            type="button"
            aria-label="Toggle navigation"
            aria-expanded="false"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div
            className={
              toggle ? "navlinks-container open" : "navlinks-container"
            }
          >
            <NavLink
              to="/"
              className={({ isActive }) => {
                return isActive ? "active" : "";
              }}
            >
              Actualité
            </NavLink>
            <NavLink to="/login">
              {connected.connect ? "Profil" : "Connexion/Inscription"}
            </NavLink>
          </div>
        </div>
        <NavLink className="recherche-a" to="">
          <div className="barre-de-recherche">
            <input
              onClick={toggleFunc}
              onChange={(e) => {
                setDataSearch(e.target.value);
                fetchData();
              }}
              placeholder="Rechercher un utilisateur. . ."
              className="input-de-recherche"
              type="search"
            />
          </div>
        </NavLink>
        {connected.connect ? <Logout /> : ""}
        {toggleSearch && (
          <div className="try-bdr">
            {resulFetch &&
              resulFetch.map((x) => {
                const newData = new Date(x.createdAt);
                const dateFr = newData.toLocaleDateString("fr");
                return (
                  <div className="flex">
                    <div className="img-search">
                      <img src={x.imageUrl} alt="profil photo" />
                    </div>
                    <div>
                      <p>
                        Pseudo : <strong>{x.pseudo}</strong>
                      </p>
                      <p>
                        Id de l'utilisateur : <strong>{x.id}</strong>
                      </p>
                      <p>
                        Adresse email: <strong>{x.email}</strong>
                      </p>
                      <p className="green">
                        Création du compte de l'utilisateur : {dateFr}
                      </p>
                      <p className="admin">{x.admin == 1 && "Adminstateur"}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </nav>
    </header>
  );
}
