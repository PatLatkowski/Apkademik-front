import ReactDOM from "react-dom";
import "../CSS/components/post.css";
import React from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

class Post extends React.Component {
  render() {
    const { id,title, text, date, author, room } = this.props.post;
    return (
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Body>
            <div class="row">
              <div class="col-10">
              <a href={'/posts/' + id} >
                <Card>
                  <Card.Body >
                    <Card.Title >{title}</Card.Title>
                    <Card.Text class="col-11 text-truncate ">{text}</Card.Text>
                  </Card.Body>
                </Card>
                </a>
              </div>
              <div class="col-2 ">
                <div class="row mx-auto">
                  <div class="col mx-auto text-center">
                    <Card.Text>{date}</Card.Text>
                  </div>
                </div>
                <div class="row">
                <div class="row mx-auto">
                  <div class="col mx-auto text-center">
                    <Card.Text>{author}</Card.Text>
                  </div>
                </div>
                </div>
                <div class="row  ">
                <div class="row mx-auto">
                  <div class="col mx-auto text-center">
                    <Card.Text>{room}</Card.Text>
                  </div>
                </div>
                </div>
                <div class="row mx-auto">
                <div class="row mx-auto">
                  <div class="col mx-auto text-center">
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Komentarze
                  </Accordion.Toggle>
                  </div>
                </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
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
