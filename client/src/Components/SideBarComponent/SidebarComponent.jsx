import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
let path_obj = [
  {
    path: "/shop",
    text: "SHOP",
  },
  {
    path: "/contact",
    text: "CONTACT",
  },
  {
    path: "/review",
    text: "REVIEW",
  },
  {
    path: "/Warranty",
    text: "WARRANTY",
  },
  {
    path: "/about",
    text: "ABOUT",
  },
];

function SidebarComponent() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  let anchor = "left";
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
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItemButton>
          <ListItemText primary={"SIDEBAR   "} />
        </ListItemButton>
        <Divider />
        {path_obj.map((el, i) => {
          return (
            <ListItem disablePadding key={el.text}>
              <ListItemButton>
                <ListItemText
                  primary={el.text}
                  onClick={() => navigate(`${el.path}`)}
                />
              </ListItemButton>
              <Divider />
            </ListItem>
          );
        })}
        {/* <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText
              primary={"CONTACT"}
              onClick={() => navigate("/contact")}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText
              primary={"REVIEW"}
              onClick={() => navigate("/review")}
            />
          </ListItemButton>
        </ListItem> */}
      </List>
      <Divider />
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <div>
      <React.Fragment key={anchor}>
        <MenuIcon onClick={toggleDrawer("left", true)}>{anchor}</MenuIcon>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default SidebarComponent;
