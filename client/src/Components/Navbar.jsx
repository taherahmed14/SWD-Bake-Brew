import React, { useEffect, useState } from "react";
import "./Navbar.modules.css";
import logo from "../Assets/logo.jpg";
import "font-awesome/css/font-awesome.min.css";
import LocalMallSharpIcon from "@mui/icons-material/LocalMallSharp";
import { Badge, Button, Paper, Typography } from "@mui/material";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CartDrawer from "./ShippingComponent/CartDrawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarComponent from "./SideBarComponent/SidebarComponent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import cartImg from "../Assets/desc1.jpg";

const nav_btn = { color: "black", backgroundColor: "transparent" };
const Navbar = ({ cartItems, handleDelete, changeQuantity }) => {
  console.log("cartItems::: ", cartItems);
  //   JSON.parse(sessionStorage.getItem("cartItems") || "[]")
  // );
  // console.log("items::: ", items);

  const navigate = useNavigate(true);
  const [popup, setPopup] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const anchor = "right";

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: "500px" }}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <CartDrawer
        data={cartItems}
        handleDelete={handleDelete}
        changeQuantity={changeQuantity}
      />
    </Box>
  );
  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="navbar">
      <div className="sidebar">
        <SidebarComponent />
      </div>
      <div className="inner">
        <NavLink to="/">
          <img className="logo" src={logo} alt="logo" />
        </NavLink>
      </div>
      <div className="inner_2">
        <div className="category_list">
          <NavLink
            to="/shop"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Button style={nav_btn}>Shop</Button>
          </NavLink>
        </div>
        {/* <div className="category_list">
          <NavLink to="/contact" style={{ textDecoration: "none" }}>
            <Button style={nav_btn}>Contact</Button>
          </NavLink>
        </div> */}
        <div className="category_list">
          <NavLink to="/review" style={{ textDecoration: "none" }}>
            <Button style={nav_btn}>Review</Button>
          </NavLink>
        </div>
        <div className="category_list">
          <NavLink to="/Warranty" style={{ textDecoration: "none" }}>
            <Button style={nav_btn}>Warranty</Button>
          </NavLink>
        </div>
        <div className="category_list">
          <NavLink to="/about" style={{ textDecoration: "none" }}>
            <Button style={nav_btn}>About</Button>
          </NavLink>
        </div>
      </div>
      <div className="third_div">
        <div className="icon_div">
          <Badge badgeContent={cartItems?.length} color="primary">
            <LocalMallSharpIcon onClick={toggleDrawer(anchor, true)} />
          </Badge>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </div>
        {/* {popup && (
          <div className="user-details">
            <Paper>
              <Typography onClick={() => navigate("/profile")}>
                Profile
              </Typography>
              <Typography onClick={() => navigate("/login")}>Login</Typography>
            </Paper>
          </div>
        )} */}
        {/* <div className="user-icon">
          <div>
            <IconButton>
              <AccountCircleIcon
                onClick={() => setPopup(!popup)}
                fontSize="30px"
              />
            </IconButton>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
