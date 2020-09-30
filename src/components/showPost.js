import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { serverUrl } from "../consts";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Cookies from "universal-cookie";

import Comment from "./comment";

const cookies = new Cookies();
const token = cookies.get("token");

function ShowPost({ match }) {
  let params = match.params;
  const [edit, setEdit] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [postData, setPostData] = useState({
    title: "",
    text: "",
    date: "",
    author: "",
    room: "",
  });
  const [commentsData, setCommentsData] = useState([]);
  const [postText, setPostText] = useState("");

  useEffect(() => {
    let mounted = true;
    axios
      .get(
        serverUrl + "/noticeBoard/" + params.boardTitle + "/post/" + params.id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (mounted) {
          setPostText(response.data.text);
          setPostData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    axios
      .get(serverUrl + "/post/" + params.id + "/comments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCommentsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function formatDate(string) {
    var options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  function formatTime(string) {
    return new Date(string).toLocaleTimeString("it-IT");
  }

  function handleChangeComment(event) {
    setCommentText({ [event.target.name]: event.target.value });
  }
  function handleChangePost(event) {
    setPostText(event.target.value);
  }

  function handleComment(event) {
    axios
      .post(
        serverUrl + "/post/" + params.id + "/comment",
        {
          text: commentText.commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handlePost(event) {
    console.log(postText);
    axios
      .put(
        serverUrl + "/post/" + params.id,
        {
          text: postText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setPostText(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function editPost(isAuthor) {
    if (isAuthor) {
      return (
        <Button variant="link" onClick={() => setEdit(true)}>
          EDIT
        </Button>
      );
    }
  }

  return (
    <Card>
      <Card.Body>
        <div className="row">
          <div className="col-10">
            <Card>
              <Card.Body>
                <Card.Title>{postData.title}</Card.Title>
                <hr />
                {edit ? (
                  <form className="mx-auto" onSubmit={handlePost}>
                    <div className="row">
                      <div className="col ml-2">
                        <div className="row">
                          <div className="col">
                            <Form.Control
                              as="textarea"
                              rows="3"
                              id="textPost"
                              name="textPost"
                              onChange={handleChangePost}
                              value={postText}
                            />
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col text-right m-2">
                            <Button variant="primary" type="submit">
                              Zapisz
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="row">
                    <div className="col ml-2">
                      <Card.Text>{postData.text}</Card.Text>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
          <div className="col-2 ">
            <div className="row mx-auto">
              <div className="col mx-auto text-center">
                <Card.Text>{formatDate(postData.date)}</Card.Text>
              </div>
            </div>
            <div className="row mx-auto">
              <div className="col mx-auto text-center">
                <Card.Text>{formatTime(postData.date)}</Card.Text>
              </div>
            </div>
            <div className="row mx-auto">
              <div className="col mx-auto text-center">
                <Card.Text>{postData.author}</Card.Text>
              </div>
            </div>
            <div className="row mx-auto">
              <div className="col mx-auto text-center">
                <Card.Text>{postData.room}</Card.Text>
              </div>
            </div>
            <div className="row mx-auto">
              {postData.isAuthor ? (
                <div className="col mx-auto text-center">{editPost(true)}</div>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
        <form className="mx-auto" onSubmit={handleComment}>
          <div className="row">
            <div className="col m-3">
              <Form.Control
                as="textarea"
                rows="3"
                id="commentText"
                name="commentText"
                placeholder="Add comment..."
                onChange={handleChangeComment}
              />
            </div>
          </div>
          <div className="row">
            <div className="col m-3 text-right">
              <Button variant="primary" type="submit">
                Add Comment
              </Button>
            </div>
          </div>
        </form>
        <div className="row">
          <div className="col m-3">
            {commentsData.map((commentData) => (
              <div className="row" key={commentData.id}>
                <div className="col m-1">
                  <Comment comment={commentData} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
export default ShowPost;
