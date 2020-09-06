import ReactDOM from "react-dom";
import "../CSS/components/post.css";
import React from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function formatDate(string) {
  var options = { year: "numeric", month: "numeric", day: "numeric" };
  return new Date(string).toLocaleDateString([], options);
}

function formatTime(string) {
  return new Date(string).toLocaleTimeString("it-IT");
}

class Post extends React.Component {
  render() {
    const boardTitle = this.props.boardTitle;
    const { id, title, text, date, author, room } = this.props.post;
    return (
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Body>
            <div className="row">
              <div className="col-10">
                <Card as={Link} to={boardTitle + "/post/" + id}>
                  <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text className="col-11 text-truncate">
                      {text}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-2 ">
                <div className="row mx-auto">
                  <div className="col mx-auto text-center">
                    <Card.Text>{formatDate(date)}</Card.Text>
                  </div>
                </div>
                <div className="row mx-auto">
                  <div className="col mx-auto text-center">
                    <Card.Text>{formatTime(date)}</Card.Text>
                  </div>
                </div>
                <div className="row">
                  <div className="row mx-auto">
                    <div className="col mx-auto text-center">
                      <Card.Text>{author}</Card.Text>
                    </div>
                  </div>
                </div>
                <div className="row  ">
                  <div className="row mx-auto">
                    <div className="col mx-auto text-center">
                      <Card.Text>POKÓJ</Card.Text>
                    </div>
                  </div>
                </div>
                <div className="row mx-auto">
                  <div className="row mx-auto">
                    <div className="col mx-auto text-center">
                      <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Komentarze
                      </Accordion.Toggle>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Accordion.Collapse eventKey="1">
                  <p>komentarz</p>
                </Accordion.Collapse>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Accordion>
    );
  }
}
export default Post;
