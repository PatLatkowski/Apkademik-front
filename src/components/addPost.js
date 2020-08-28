import "../CSS/components/addPost.css";
import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Joi from "@hapi/joi";
import axios from "axios";

var schema = Joi.object().keys({
  title: Joi.string().required(),
  text: Joi.string().required(),
});

const serverUrl = "http://46.41.142.44:8080";

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
    this.state = { text: "" };
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
            .post(serverUrl + "/addPost", {
              title: this.state.title,
              text: this.state.text,
            })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
          this.props.history.push("");
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
          <div class="row m-auto">
            <div class="col">
              <form class="mx-auto" onSubmit={this.handlePost}>
                <div class="form-row ">
                  <div class="form-group col-1 h3 m-auto mx-auto">
                    <label class=" m-auto ">Title:</label>
                  </div>
                  <div class="form-group col-11">
                    <Form.Control
                      size="lg"
                      type="text"
                      id="title"
                      name="title"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col">
                    <Form.Control
                      as="textarea"
                      rows="3"
                      id="text"
                      name="text"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col text-right mr-10">
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
