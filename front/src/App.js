import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { UidContext } from "./AppContext";
import Logs from "./Pages/Login/Logs";
import Home from "./Pages/Home/Home";
import Nav from "./Pages/Nav/Nav";
import axios from "axios";
import "./index.css";

function App() {
  const [uid, SetUid] = useState({
    connect: false,
    data: {
      pseudo: null,
      id: null,
      email: null,
      createdAt: null,
      imageUrl: null,
    },
  });

  const authFetch = async () => {
    await axios({
      method: "get",
      url: `http://localhost:3000/api/auth`,
      withCredentials: true,
    })
      .then((res) => {
        SetUid({
          ...res.data,
        });
      })

      .catch((err) => {});
  };

  useEffect(() => {
    authFetch();
  }, []);

  return (
    <BrowserRouter>
      <UidContext.Provider value={uid}>
        <main>
          <Nav />
          <div className="container-create"></div>
          <Routes>
            <Route path="/login" element={<Logs />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </UidContext.Provider>
    </BrowserRouter>
  );
}

export default App;
