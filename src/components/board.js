import ReactDOM from "react-dom";
import React from "react";
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

function show(postsData) {
  if (postsData) {
    return postsData.map((postData) => (
      <div class="row" key={postData.id}>
        <div class="col m-1">
          <Post post={postData} />
        </div>
      </div>
    ));
  }
}

const serverUrl = "http://localhost:8080";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postsData: [],
    };
    this.state = { tableTitle: props.tableTitle };
  }

  componentDidMount() {
    axios
      .get(serverUrl + "/posts")
      .then((response) => {
        console.log(response.data);
        this.setState({ postsData: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("Ok");
  }

  render() {
    const { postsData } = this.state;

    return (
      <Accordion defaultActiveKey="0">
        <div class="container-table">
          <div class="row m-3">
            <div class="col-10">
              <h1 class="font-weight-bold font-italic">
                {this.state.tableTitle}
              </h1>
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
            <div class="col">{show(postsData)}</div>
          </div>
        </div>
      </Accordion>
    );
  }
}

export default Table;
