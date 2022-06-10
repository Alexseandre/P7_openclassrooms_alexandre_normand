import React, { useEffect, useState } from "react";
import Like from "./Like";
import Comment from "./Comment";

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
        <i className="fa fa-comment"></i>
        <p className="comment-pto" onClick={toggleFunc}>
          Commentaires
        </p>
      </div>
      {toggle && (
        <Comment postId={props.post.postId} connect={props.connected}></Comment>
      )}
    </div>
  );
}
