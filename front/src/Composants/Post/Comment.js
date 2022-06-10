import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Comment.css";

export default function Comment(props) {
  const [dataComment, setDataComment] = useState("");
  const [commentaire, setComment] = useState();
  const submit = async (e) => {
    let data = {
      pseudo: props.connect.data.pseudo,
      comment: dataComment,
    };
    axios({
      method: "POST",
      url: `http://localhost:3000/api/create/comment/${props.postId}`,
      data: data,
      withCredentials: true,
    })
      .then((_) => {
        setDataComment("");
        fetchData();
      })
      .catch((err) => alert(err.response.data.message));
  };

  const fetchData = async () => {
    await axios
      .get(`http://localhost:3000/api/comment/${props.postId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setComment(res.data.data);
      })
      .catch();
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="comment-div-n">
      <div className="margin">
        {commentaire &&
          commentaire.map((x, index) => {
            return (
              <div
                key={x.id}
                className={
                  index & 1 ? "commentaires-post" : "commentaires-post grey"
                }
              >
                <h1 className="commentaires-post-h1">{x.pseudo}</h1>
                <p>{x.comment}</p>
              </div>
            );
          })}
      </div>

      <div className="input-content-comment">
        <input
          onChange={(e) => {
            setDataComment(e.target.value);
          }}
          placeholder="Votre commentaire"
          className="comment-input"
          type="text"
          value={dataComment}
        />
        <button onClick={submit} className="btn-commn">
          <i className="fa fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}
