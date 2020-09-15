import "../CSS/components/post.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Cookies from "universal-cookie";
import axios from "axios";

const serverUrl = "http://46.41.142.44:8080";
const cookies = new Cookies();
const token = cookies.get("token");

function Comment(params) {
  const [edit, setEdit] = useState(false);
  const [commentText, setCommentText] = useState(params.comment.text);
  const [data, setData] = useState(params.comment);

  function formatDate(string) {
    var options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  function formatTime(string) {
    return new Date(string).toLocaleTimeString("it-IT");
  }

  function handleChangeComment(event) {
    setCommentText(event.target.value);
  }

  function handleComment() {
    axios
      .patch(
        serverUrl + "/comment/" + data.id,
        {
          text: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      )
      .then((response) => {
        setCommentText(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function editComment(isAuthor) {
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
          <div className="col">
            <Card.Text>{data.author}</Card.Text>
          </div>
          <div className="col text-right">
            <Card.Text>
              {formatDate(data.date)}
              {"  "}
              {formatTime(data.date)}
            </Card.Text>
          </div>
        </div>
        <div className="row"></div>
        <div className="row">
          <div className="col">
            <hr />
          </div>
        </div>
        {edit ? (
          <form className="mx-auto" onSubmit={handleComment}>
            <div className="row">
              <div className="col ml-2">
                <div className="row">
                  <div className="col-11">
                    <Form.Control
                      as="textarea"
                      rows="3"
                      id="textPost"
                      name="textPost"
                      onChange={handleChangeComment}
                      value={commentText}
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
            <div className="col">
              <Card.Text className="col-11 ">{data.text}</Card.Text>
            </div>
            <div className="col-1 mr-2">
              {data.isAuthor ? <div>{editComment(true)}</div> : <div />}
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
export default Comment;
