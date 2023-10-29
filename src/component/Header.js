import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Container from "react-bootstrap/Container";
import { Button, Nav, Navbar } from "react-bootstrap";
import { Box, IconButton, Badge, Stack } from "@mui/material";
import "./Header.css";
import Cart from "./Cart";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = ({ addedToCart, cards }) => {
  const navigate = useNavigate();

  return (
    <Box className="header">
      <Box className="header-title">
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          <h4>TeeRex Store</h4>
        </Button>
      </Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            <h6>Products</h6>
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <Badge badgeContent={addedToCart} color="error" size="large">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </Button>
        </>
      </Stack>
    </Box>
  );
};

export default Header;
