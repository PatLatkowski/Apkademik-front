import "../CSS/components/addPost.css";
import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Joi from "@hapi/joi";
import axios from "axios";
import Message from "./Message";
import Cookies from "universal-cookie";

var schema = Joi.object().keys({
  title: Joi.string().required(),
  text: Joi.string().required(),
});

const serverUrl = "http://46.41.142.44:8080/";
const cookies = new Cookies();
const token = cookies.get("token");

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
    this.state = { text: "" };
    this.state = { errorMessage: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handlePost(event) {
    schema.validate(
      {
        title: this.state.title,
        text: this.state.text,
      },
      (err, res) => {
        if (err) {
          this.setState({ errorMessage: err.details[0].message });
          console.log(err);
        } else {
          axios
            .post(
              serverUrl + "noticeBoard/" + this.props.boardTitle + "/post",
              {
                title: this.state.title,
                text: this.state.text,
              },
              {
                headers: {
                  Authorization: `Bearer ${token.token}`,
                },
              }
            )
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
          console.log("Ok");
        }
      }
    );

    event.preventDefault();
  }

  render() {
    return (
      <Card>
        <Card.Body>
          <div className="row m-auto">
            <div className="col">
              <form className="mx-auto" onSubmit={this.handlePost}>
                <div className="form-row ">
                  <div className="form-group col-1 h3 m-auto mx-auto">
                    <label className=" m-auto ">Title:</label>
                  </div>
                  <div className="form-group col-11">
                    <Form.Control
                      size="lg"
                      type="text"
                      id="title"
                      name="title"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <Form.Control
                      as="textarea"
                      rows="3"
                      id="text"
                      name="text"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="form-row mb-2">
                  <div className="col">
                    <Message text={this.state.errorMessage} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col text-right mr-10">
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }
}
export default AddPost;
