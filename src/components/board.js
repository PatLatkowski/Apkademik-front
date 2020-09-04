import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";

import Post from "./post";
import AddPost from "./addPost";
import Accordion from "react-bootstrap/Accordion";

function CustomToggle({ children, eventKey }) {
  return (
    <Button variant="primary" onClick={useAccordionToggle(eventKey)}>
      Dodaj post
    </Button>
  );
}

const serverUrl = "http://localhost:8080";

function Table(props) {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState(props.tableTitle);

  useEffect(() => {
    let mounted = true;
    axios
      .get(serverUrl + "/posts")
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
    <Accordion defaultActiveKey="0">
      <div class="container-table">
        <div class="row m-3">
          <div class="col-10">
            <h1 class="font-weight-bold font-italic">{title}</h1>
          </div>
          <div class="col-2 m-auto text-center">
            <CustomToggle eventKey="1">Dodaj Post</CustomToggle>
          </div>
        </div>
        <div class="row m-2">
          <div class="col ">
            <Accordion.Collapse eventKey="1">
              <AddPost />
            </Accordion.Collapse>
          </div>
        </div>
        <div class="row m-2">
          <div class="col">
            {data.map((postData) => (
              <div class="row" key={postData.id}>
                <div class="col m-1">
                  <Post post={postData} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Accordion>
  );
}

export default Table;
