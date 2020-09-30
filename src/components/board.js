import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import Cookies from "universal-cookie";

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

function Table(params) {
  const [noticeBoardName, setNoticeBoardName] = useState(params.title);
  const [pageMax, setPageMax] = useState(0);
  var [page, setPage] = useState(0);
  const [listItems, setListItems] = useState([]);
  console.log(noticeBoardName);
  useEffect(() => {
    axios
      .get(serverUrl + "/noticeBoard/" + noticeBoardName + "/pages", {
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
  }, []);

  useEffect(() => {
    axios
      .get(serverUrl + "/noticeBoard/" + noticeBoardName + "/page=" + pageMax, {
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
  }, [pageMax]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop <
      document.documentElement.offsetHeight
    )
      return;
    if (page === 0) return;

    page = page - 1;

    console.log("Fetch more list items!");

    axios
      .get(serverUrl + "/noticeBoard/" + noticeBoardName + "/page=" + page, {
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
    <Accordion defaultActiveKey="0">
      <div className="container-table">
        <div className="row m-3">
          <div className="col-10">
            <h1 className="font-weight-bold font-italic">{noticeBoardName}</h1>
          </div>
          <div className="col-2 m-auto text-center">
            <CustomToggle eventKey="1" />
          </div>
        </div>
        <div className="row m-2">
          <div className="col ">
            <Accordion.Collapse eventKey="1">
              <AddPost boardTitle={noticeBoardName} />
            </Accordion.Collapse>
          </div>
        </div>
        <div className="row m-2">
          <div className="col">
            {listItems.map((listItem) => (
              <div className="row" key={listItem.id}>
                <div className="col m-1">
                  <Post post={listItem} boardTitle={noticeBoardName} />
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
