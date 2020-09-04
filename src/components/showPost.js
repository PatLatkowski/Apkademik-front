import ReactDOM from "react-dom";
import "../CSS/components/post.css";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import axios from "axios";

const serverUrl = "http://localhost:8080";

function ShowPost({ match }) {
  let params = match.params;
  const [data, setData] = useState([
    {
      title: "",
      text: "",
      date: "",
      author: "",
      room: "",
    },
  ]);

  function formatDate(string) {
    var options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  function formatTime(string) {
    return new Date(string).toLocaleTimeString("it-IT");
  }

  useEffect(() => {
    let mounted = true;
    axios
      .get(serverUrl + "/post/" + params.id)
      .then((response) => {
        if (mounted) {
          setData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => (mounted = false);
  }, []);

  return (
    <Card>
      <Card.Body>
        <div class="row">
          <div class="col-10">
            <Card>
              <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text class="col-11 ">{data.text}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div class="col-2 ">
            <div class="row mx-auto">
              <div class="col mx-auto text-center">
                <Card.Text>{formatDate(data.date)}</Card.Text>
              </div>
            </div>
            <div class="row mx-auto">
              <div class="col mx-auto text-center">
                <Card.Text>{formatTime(data.date)}</Card.Text>
              </div>
            </div>
            <div class="row mx-auto">
              <div class="col mx-auto text-center">
                <Card.Text>{data.author}</Card.Text>
              </div>
            </div>
            <div class="row mx-auto">
              <div class="col mx-auto text-center">
                <Card.Text>{data.room}</Card.Text>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p>komentarz</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
export default ShowPost;
