import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Like(props) {
  const [dataLike, setDataLike] = useState();
  const [toggle, setToggle] = useState();
  const likeAction = async () => {
    const res = await axios
      .put(
        "http://localhost:3000/api/like",
        {
          postId: props.postId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        fetchLike();
      })
      .catch();
  };
  const fetchLike = async () => {
    const res = await axios
      .get(`http://localhost:3000/api/like/${props.postId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setDataLike(res.data.data);
        setToggle(res.data.liked);
      })
      .catch();
  };
  useEffect(() => {
    fetchLike();
  }, []);

  return (
    <div
      className="like-div"
      onClick={(_) => {
        likeAction();
      }}
    >
      <div className={"heartDeux"}>
        <i
          className={
            toggle
              ? "far fa-heart heartIcone scale-0"
              : "far fa-heart heartIcone scale-1"
          }
        ></i>
        <i
          className={
            toggle
              ? "fas fa-heart heartIcone scale-1"
              : "fas fa-heart heartIcone scale-0"
          }
        ></i>
      </div>
      <p className="like-selct">{dataLike && dataLike.like} like</p>
    </div>
  );
}
