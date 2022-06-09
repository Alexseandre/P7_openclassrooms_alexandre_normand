import "./PutAdmin.css";
import axios from "axios";
import { useState } from "react";

export default function PutAdmin(props) {
  const [toggle, setToggle] = useState(false);
  const [modifInput, setModifInput] = useState();
  const toggleFunc = () => {
    setToggle(!toggle);
  };
  const deletePost = async () => {
    alert("Voulez-vous vraiment ce post?");
    axios({
      method: "DELETE",
      url: `http://localhost:3000/api/delete/post/${props.x.postId}`,
      withCredentials: true,
    }).catch();
  };
  const modifyPost = async () => {
    axios({
      method: "PUT",
      url: `http://localhost:3000/api/post/update/${props.x.postId}`,
      data: {
        post: modifInput,
      },
      withCredentials: true,
    })
      .then((res) => {
        setToggle(false);
        props.fetch();
      })
      .catch();
  };

  return (
    <div className="box-put-admin">
      {toggle && (
        <textarea
          onChange={(e) => {
            setModifInput(e.target.value);
          }}
          cols="30"
          maxLength="290"
          rows="5"
          className="modif-input-admin"
          defaultValue={props.x.post}
        ></textarea>
      )}

      <p onClick={deletePost} className="supprimer">
        X
      </p>
      <p onClick={toggleFunc} className="modifier">
        <i className="fas fa-edit"></i>
      </p>
      {toggle && (
        <p onClick={modifyPost} className="mn">
          Modifier
        </p>
      )}
    </div>
  );
}
