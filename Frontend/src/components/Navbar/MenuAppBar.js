import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import SERVER_URL from "../../Pages/URL";
import axios from "axios";

const kickUser = () => {
  axios({
    method: "get",
    url: SERVER_URL + "/logout",
    withCredentials: true
  })
    .then(function (res) {
      console.log(res.data);
    })
    .catch(function (err) {
      console.log(err);
    });
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textAlign: "left"
  },
  profIcon: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  navMenu: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#000" }}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Project Management System
          </Typography>
          {auth && (
            <div className={classes.profIcon}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle style={{ fontSize: 40 }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/cp@2707user"
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    Change Password
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/logout"
                    onClick={kickUser}
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    Logout
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          )}
          <Link
            to="/cp@2707user"
            className={classes.navMenu}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <Button color="inherit" variant="contained">
              Change Password
            </Button>
          </Link>
          <Link
            to="/logout"
            onClick={kickUser}
            className={classes.navMenu}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <Button
              color="inherit"
              variant="contained"
              style={{ marginLeft: "20px" }}
            >
              Logout
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
