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

const serverUrl = "http://46.41.142.44:8080";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { postsData: {} };
    this.state = { tableTitle: props.tableTitle };
  }

  componentWillMount() {
    axios
      .get(serverUrl + "/posts")
      .then((response) => {
        this.state.postsData = response;
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("Ok");
  }

  render() {
    const getPosts = (postsData) => {
      let content = [];
      for (let postData of postsData) {
        content.push(
          <div class="col m-1" key={postData.id}>
            <Post post={postData} />
          </div>
        );
      }
      return content;
    };

    //zmienić PostData1 w funkcji getPosts na this.state.postsData jak będzie zrobiony backend
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
          <div class="row m-2">{getPosts(PostsData1)}</div>
        </div>
      </Accordion>
    );
  }
}

//do przetestowania bez backendu, później do wyrzucenia
const PostsData1 = [
  {
    id: 1,
    title: "Nowy tytuł",
    text:
      "Witaj świecie! Długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst,",
    date: "24.08.2020 13:30",
    author: "Adam Nowak",
    room: "108B",
  },
  {
    id: 2,
    title: "Nowy tytuł 2",
    text:
      "Witaj świecie! Długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst, długi tekst,",
    date: "25.08.2020 7:22",
    author: "Beata Kowalska",
    room: "308A",
  },
];
export default Table;
