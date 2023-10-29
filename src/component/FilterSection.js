import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormControl,
} from "@mui/material";
import "./FilterSection.css";
import {
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  Divider,
  List,
  Button,
  Drawer,
  Box,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";

const Color = ["Red", "Blue", "Green"];
const Gender = ["Men", "Women"];
const Price = ["250", "400", "500"];
const Type = ["Polo", "Hoodie", "Basic"];

const FormControlLabels = (props, label) => {
  return label.map((item) => (
    <FormControlLabel
      control={
        <Checkbox
          name={item}
          value={item}
          checked={props.checked.includes(item)}
          onChange={props.HandleChecked}
        />
      }
      label={item}
    />
  ));
};
// this function is specially called only to display "PRICE" filter options.....
const FormControlLabelsForPrice = (props, label) => {
  return label.map((item) => (
    <FormControlLabel
      control={
        <Checkbox
          name={item}
          value={item}
          checked={props.checked.includes(item)}
          onChange={props.HandleChecked}
        />
      }
      label={`Upto Rs ${item}`}
    />
  ));
};

// the "Screen()" function calls respective functions by passing parameters to them -  this called functions "map`s" through the respective arrays and return options of individual filters...
const Screen = (props) => {
  return (
    <FormControl>
      <FormGroup>
        <FormLabel> Color </FormLabel>
        {FormControlLabels(props, Color)}

        <FormLabel> Gender </FormLabel>
        {FormControlLabels(props, Gender)}

        <FormLabel> Price </FormLabel>
        {FormControlLabelsForPrice(props, Price)}

        <FormLabel> Type </FormLabel>
        {FormControlLabels(props, Type)}
      </FormGroup>
    </FormControl>
  );
};

//...........Main Function starts here......
const FilterSection = (props) => {
  const [state, setState] = useState({
    Filter: false,
  });

  //.... "toggleDrawer()" function is also part of 'TEMPORARY DRAWER- <Drawer/>' which is directly copied from 'mui.com- Material UI'
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  //.... "list()" function is also part of 'TEMPORARY DRAWER- <Drawer/>' which is directly copied from 'mui.com- Material UI'
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>{Screen(props)}</ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  // ...... inside "bigScreen()" function - "Screen()" function is called to display filter Options.......
  const bigScreen = (props) => {
    return <aside className="asideSection bigScreen">{Screen(props)}</aside>;
  };

  // ......The "smallScreen()" function returns components for 'TEMPORARY DRAWER- <Drawer/ >' which is directly copied from 'mui.com- Material UI'
  const smallScreen = (props) => {
    return (
      <div className="smallScreen">
        {["Filter"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* ............if screen size is greater than 600px -" bigScreen()"  function is called............... */}
      {bigScreen(props)}
      {/* ............if screen size is lesser than 600px -" smallScreen()"  function is called............... */}
      {smallScreen(props)}
    </>
  );
};

export default FilterSection;
