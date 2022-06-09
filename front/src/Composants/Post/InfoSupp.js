import React, { useEffect, useState } from "react";
import Like from "./Like";
import axios from "axios";

export default function InfoSupp(props) {
  const [toggle, setToggle] = useState();
  const toggleFunc = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <div className="container-info-supp">
        <p className="date">{props.dateFr}</p>
        <Like postId={props.post.postId} connect={props.connected}></Like>
      </div>
    </div>
  );
}
