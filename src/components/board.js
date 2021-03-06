import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";
import Post from "./post";
import AddPost from "./addPost";
import Accordion from "react-bootstrap/Accordion";
import { serverUrl } from "../consts";

const cookies = new Cookies();
const token = cookies.get("token");

function CustomToggle({ eventKey }) {
  return (
    <Button variant="primary" onClick={useAccordionToggle(eventKey)}>
      Add post
    </Button>
  );
}

function Table({ match }) {
  let params = match.params;
  const [boardTitle, setBoardTitle] = useState("");
  const [pageMax, setPageMax] = useState(0);
  var [page, setPage] = useState(0);
  const [listItems, setListItems] = useState([]);
  const [member, setMember] = useState(false);

  useEffect(() => {
    axios
      .get(serverUrl + "/noticeBoard/" + params.boardId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBoardTitle(response.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(serverUrl + "/noticeBoard/" + params.boardId + "/member", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMember(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (member == false) return;
    axios
      .get(serverUrl + "/noticeBoard/" + params.boardId + "/pages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPage(response.data);
        setPageMax(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [member]);

  useEffect(() => {
    if (member == false) return;
    axios
      .get(serverUrl + "/noticeBoard/" + params.boardId + "/page=" + pageMax, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setListItems(response.data);
        if (response.data.length < 5) {
          handleScroll();
        }
      })
      .catch((error) => {
        console.log(error);
      });

    window.addEventListener("scroll", handleScroll);
  }, [pageMax, member]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop <
      document.documentElement.scrollHeight
    )
      return;
    if (page === 0) return;

    page = page - 1;

    console.log("Fetch more list items!");

    axios
      .get(serverUrl + "/noticeBoard/" + params.boardId + "/page=" + page, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setListItems((prevState) => [
          ...prevState,
          ...Array.from(response.data),
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div class="row">
      {member ? (
        <Accordion defaultActiveKey="0">
          <div className="container-table">
            <div className="row m-3">
              <div className="col-10">
                <h1 className="font-weight-bold font-italic">{boardTitle}</h1>
              </div>
              <div className="col-2 m-auto text-center">
                <CustomToggle eventKey="1" />
              </div>
            </div>
            <div className="row m-2">
              <div className="col ">
                <Accordion.Collapse eventKey="1">
                  <AddPost boardId={params.boardId} />
                </Accordion.Collapse>
              </div>
            </div>
            <div className="row m-2">
              <div className="col">
                {listItems.map((listItem) => (
                  <div className="row" key={listItem.id}>
                    <div className="col m-1">
                      <Post post={listItem} boardId={params.boardId} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Accordion>
      ) : (
        <div class="col">
          <h1>You are not member of this group!</h1>
        </div>
      )}
    </div>
  );
}

export default Table;
