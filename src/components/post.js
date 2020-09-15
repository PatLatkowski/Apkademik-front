import "../CSS/components/post.css";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function formatDate(string) {
  var options = { year: "numeric", month: "numeric", day: "numeric" };
  return new Date(string).toLocaleDateString([], options);
}

function formatTime(string) {
  return new Date(string).toLocaleTimeString("it-IT");
}

function Post(params) {
  const [boardTitle, setBoardTitle] = useState(params.boardTitle);
  const [postData, setpostData] = useState(params.post);

  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Body>
          <div className="row">
            <div className="col-10">
              <Card as={Link} to={boardTitle + "/post/" + postData.id}>
                <Card.Body>
                  <Card.Title>{postData.title}</Card.Title>
                  <hr />
                  <Card.Text className="col-11 text-truncate">
                    {postData.text}
                  </Card.Text>
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
              <div className="row">
                <div className="row mx-auto">
                  <div className="col mx-auto text-center">
                    <Card.Text>{postData.author}</Card.Text>
                  </div>
                </div>
              </div>
              <div className="row  ">
                <div className="row mx-auto">
                  <div className="col mx-auto text-center">
                    <Card.Text>{postData.room}</Card.Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Accordion>
  );
}

export default Post;
