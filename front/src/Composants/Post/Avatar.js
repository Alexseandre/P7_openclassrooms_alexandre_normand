import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Avatar(props) {
  const [user, SetUser] = useState();
  const fetchUser = async () => {
    const res = await axios
      .get(`http://localhost:3000/api/users/${props.user}`, {
        withCredentials: true,
      })
      .then((res) => {
        SetUser(res.data.data);
        setAvatar(res.data.data.imageUrl);
      })
      .catch();
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const [avatar, setAvatar] = useState(
    "https://imgs.search.brave.com/-gzMRJBqcDu_2aqZnYUyuY3WCPesGgT8SzayFTaZG-4/rs:fit:980:980:1/g:ce/aHR0cDovL2Nkbi5v/bmxpbmV3ZWJmb250/cy5jb20vc3ZnL2lt/Z184NzIzNy5wbmc"
  );
  return (
    <div>
      <div className="avatar">
        <img src={avatar} alt="" />
      </div>
      <p className="pseudo-avatar">{user && user.pseudo}</p>
    </div>
  );
}
