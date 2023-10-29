import Header from "./Header.js";
import FilterSection from "./FilterSection.js";
import "./Product.css";
import ProductCards from "./ProductCards.js";
import { Box, Grid, TextField, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/SearchRounded";
import { Outlet, Link } from "react-router-dom";
import { useSnackbar } from "notistack";

export const makingAPICall = async () => {
  try {
    let url =
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";
    let response = await axios.get(url);

    return response.data;
  } catch (e) {
    console.log("request to link failed");
  }
};

const Products = () => {
  const [cards, setCards] = useState([]);
  const [cardsCopy, setCardsCopy] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [checked, setChecked] = useState([]);
  const [addedToCart, setaddedToCart] = useState([]);

  //This function is used to handle checked items in filter section
  const HandleChecked = (e) => {
    const index = checked.indexOf(e.target.value);
    if (index === -1) {
      setChecked([...checked, e.target.value]);
    } else {
      setChecked(checked.filter((item) => item !== e.target.value));
    }
  };

  //this useEffect is used to execute "checkedFilteredCards()" immediately after 'checked' is changed.
  useEffect(() => {
    const checkedFilteredCards = cardsCopy.filter((item) => {
      let checkedArray = checked.every((element) => {
        if (element == 500) {
          return element >= item.price && item.price >= 401;
        } else if (element == 400) {
          return element >= item.price && item.price >= 251;
        } else {
          return (
            element === item.color ||
            element === item.gender ||
            element === item.type ||
            element >= item.price
          );
        }
      });

      return checkedArray;
    });

    setCards(checkedFilteredCards);
  }, [checked]);

  //this function is used to handle add_to_Cart event
  const HandleAddToCart = (e) => {
    let index = addedToCart.indexOf(e.target.value);
    if (index == -1) {
      setaddedToCart([...addedToCart, e.target.value]);
    }
  };

  //this useEffect is used to execute immediately after "HandleAddToCart"
  useEffect(() => {
    localStorage.setItem("id", JSON.stringify(addedToCart));
  }, [addedToCart]);

  //This useEffect is used to make an API call
  useEffect(() => {
    (async () => {
      let cardData = await makingAPICall();
      let cardDataCopy = JSON.parse(JSON.stringify(cardData));
      setCardsCopy(cardDataCopy);
      setCards(cardData);
    })();
  }, []);

  //this function is executed when search icon is clicked by user.
  const HandleSearchClick = () => {
    const filteredCards = cards.filter((item) => {
      return (
        item.name.toLowerCase() === searchText.toLowerCase() ||
        item.color.toLowerCase() === searchText.toLowerCase() ||
        item.type.toLowerCase() === searchText.toLowerCase()
      );
    });
    setCards(filteredCards);
  };

  return (
    <Box>
      <Box>
        <Header addedToCart={addedToCart.length} cards={cards} />
      </Box>

      <Box className="MainContent">
        <Box className="FilterSection">
          <FilterSection checked={checked} HandleChecked={HandleChecked} />
        </Box>

        <Box sx={{ width: "70%" }} className="CardsSection">
          {/* ........Search bar code ......... */}
          <Box className="SearchBox">
            <TextField
              id="standard-search"
              label="Search for products..."
              type="search"
              variant="standard"
              value={searchText}
              onChange={(e) => {
                if (!e.target.value) {
                  setCards(cardsCopy);
                }
                setSearchText(e.target.value);
              }}
              className="SearchBar"
            />
            <IconButton variant="contained" onClick={HandleSearchClick}>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* ....... Cards Grid code........... */}
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {cards.map((item) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <ProductCards
                    product={item}
                    HandleAddToCart={HandleAddToCart}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Products;
