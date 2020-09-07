import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import SERVER_URL from "./URL";
import { LinearProgress } from "@material-ui/core";
import Footer from "../components/Footer/Footer";
import LoggedNavbar from "../components/Navbar/LoggedNavbar";

export default class Admin extends Component {
  constructor(props) {
    super();
    const token = localStorage.getItem("token");
    let loggedIn = false;
    if (token === "hod") {
      loggedIn = true;
    }
    this.state = {
      loggedIn,
      user: ""
    };
  }

  getStat = () => {
    axios({
      method: "get",
      url: SERVER_URL + "/user",
      withCredentials: true
    })
      .then(res => {
        this.setState({
          loggedIn: true,
          user: res.data
        });
      })
      .catch(err => {
        this.setState({
          loggedIn: false,
          user: "no user"
        });
        localStorage.removeItem("token");
      });
  };

  render() {
    if (this.state.user === "") {
      this.getStat();
      return <LinearProgress />;
    } else if (this.state.user.type === "hod") {
      return (
        <div>
          <React.Fragment>
            <LoggedNavbar />
            <h1>Hod page</h1>
            <footer>
              <Footer />
            </footer>
          </React.Fragment>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}