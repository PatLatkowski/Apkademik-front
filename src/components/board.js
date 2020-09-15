import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import Cookies from "universal-cookie";

import Post from "./post";
import AddPost from "./addPost";
import Accordion from "react-bootstrap/Accordion";

function CustomToggle({ children, eventKey }) {
  return (
    <Button variant="primary" onClick={useAccordionToggle(eventKey)}>
      Add post
    </Button>
  );
}

const serverUrl = "http://localhost:8080/";
const cookies = new Cookies();
const token = cookies.get("token");

function Board({ match }) {
  let params = match.params;
  const [data, setData] = useState([]);
  const [title, setTitle] = useState(params.boardTitle);

  useEffect(() => {
    console.log(token.token);
    let mounted = true;
    axios
      .get(serverUrl + "noticeBoard/" + params.boardTitle + "/posts", {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
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
      <div className="container-table">
        <div className="row m-3">
          <div className="col-10">
            <h1 className="font-weight-bold font-italic">{title}</h1>
          </div>
          <div className="col-2 m-auto text-center">
            <CustomToggle eventKey="1" />
          </div>
        </div>
        <div className="row m-2">
          <div className="col ">
            <Accordion.Collapse eventKey="1">
              <AddPost boardTitle={params.boardTitle} />
            </Accordion.Collapse>
          </div>
        </div>
        <div className="row m-2">
          <div className="col">
            {data.map((postData) => (
              <div className="row" key={postData.id}>
                <div className="col m-1">
                  <Post post={postData} boardTitle={params.boardTitle} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Accordion>
  );
}

export default Board;
