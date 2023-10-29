import "./Cart.css";
import Header from "./Header";
import {
  Typography,
  Box,
  Grid,
  Button,
  NativeSelect,
  InputLabel,
  FormControl,
} from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { makingAPICall } from "./Products";

const Cart = () => {
  const [idInLocalStorage, setIdInLocalStorage] = useState([]);
  const [cardDetails, setCardDetails] = useState([]);
  const [shoppedItems, setShoppedItems] = useState([]);
  const [qtySelected, setQtySelected] = useState([]); //............." qty => quantity ".............
  const [flag, setFlag] = useState(false); // ........Here "flag" useState is used to indicate that the 'fetch Request' is complete ......

  //This use-effect is used to make an API call to fetch Card-Details -
  useEffect(() => {
    (async () => {
      let cardData = await makingAPICall();
      setCardDetails(cardData);

      setFlag(true);
    })();
  }, []);

  // This use-effect is used to get " IDs" in local storage and convert those " IDs " in 'NUMBER FORMAT'..............
  useEffect(() => {
    let itemsOflocalStorage = JSON.parse(localStorage.getItem("id"));

    let numberArrayOfLocalStorage = itemsOflocalStorage.map(Number);

    setIdInLocalStorage(numberArrayOfLocalStorage);
  }, []);

  //This use-effect is used to filter-out all the 'Selected Products' in cart from the total products of the  catalog...
  useEffect(() => {
    let selectedProducts = cardDetails.filter((item) => {
      return idInLocalStorage.find((Id) => Id === item.id);
    });
    setShoppedItems(selectedProducts);
  }, [flag, idInLocalStorage]);

  // ......This function is used to perform " DELETE " functionality in Cart.......
  const HandleDelete = (e) => {
    let val = Number(e.target.name);
    let indexOfId = idInLocalStorage.indexOf(val);
    let IdDeleted = idInLocalStorage.splice(indexOfId, 1);
    setIdInLocalStorage([...idInLocalStorage]);
  };

  // ......This function is used to display " Total Cart value "  of the selected Products in cart.....
  // Here => " if condition " - is executed initially when by default "QUANTITY" of selected Products is " 1 ".
  // Once the 'Default Quantity' i.e => " 1 " is changed (" if condition ") will not be executed  and futher statements are executed......
  const totalOrderValue = () => {
    if (qtySelected.length == 0) {
      const totalSum = shoppedItems
        .map((item) => item.price)
        .reduce((total, num) => total + num, 0);
      console.log(totalSum);
      return totalSum;
    }

    //....On this Step - we have created duplicate of "qtySelected" so that we can reverse the array-"qtySelected"....
    let duplicateOfQtySelected = [...qtySelected];
    //....The reason to reverse the duplicate of " qtySelected " array --> Is to get the " latest quantity " selected from the 'selected Products' in Cart, when we apply " .find()" method to "duplicateOfQtySelected" array...
    let reverseOfQtySelected = duplicateOfQtySelected.reverse();
    //...on this step we have created 'Deep Copy' of "shoppedItems"...
    let copyOfShoppedItems = JSON.parse(JSON.stringify(shoppedItems));
    // on this step--> In " arrayOfCartItemsWithQuantitySelected " we get an array of CARDS along with their details,  whose quantity is updated based on "quantity selected by user" i.e ("qtySelected")....
    let arrayOfCartItemsWithQuantitySelected = copyOfShoppedItems.map(
      (cartItem) => {
        let obj = reverseOfQtySelected.find((item) => item.id === cartItem.id);
        if (obj) {
          cartItem.quantity = obj.qty;
          return cartItem;
        } else {
          cartItem.quantity = 1;
          return cartItem;
        }
      }
    );

    // ....on this step --> we loop through the array "arrayOfCartItemsWithQuantitySelected" to get the "TOTAL VALUE" of Cart ......
    const totalSum = arrayOfCartItemsWithQuantitySelected
      .map((item) => item.price * item.quantity)
      .reduce((total, num) => total + num, 0);
    console.log(totalSum);
    return totalSum;
  };

  // ....This function is used to handle --> User selected 'quantity' . when user selects any quantity from dropDown menu this function is called....
  const HandleQtyClick = (e) => {
    let val = parseInt(e.target.value);
    let id = parseInt(e.target.name);
    let objectItem = { id: id, qty: val };
    setQtySelected([...qtySelected, objectItem]);
  };

  const displayOptions = (itemQty) => {
    let count = 1;
    let QtyArray = [];
    while (count <= itemQty) {
      QtyArray.push(count);
      count++;
    }
    return QtyArray;
  };

  // ....This function consists code of  "SELECT component" directly copied from "mUI.com" i.e Material Ui......
  const quantityOption = (itemQty, itemId) => {
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Qty
          </InputLabel>
          <NativeSelect name={itemId} onChange={HandleQtyClick}>
            {/* .......On this step --> we call different function - { displayOptions() } to get list of numbers in "DROP DOWN MENU"  of 'quantityOption'*/}
            {displayOptions(itemQty).map((Qty) => (
              <option value={Qty}>{Qty}</option>
            ))}
          </NativeSelect>
        </FormControl>
      </Box>
    );
  };

  return (
    <>
      <Box>
        <Header addedToCart={idInLocalStorage.length} />
      </Box>

      <Typography variant="h5" component="h5" id="heading">
        Shoping Cart
      </Typography>

      {idInLocalStorage.length ? (
        <Grid item xs={12} id="cartItems">
          <Box className="cart">
            {shoppedItems.map((item) => (
              <Box key={item.id}>
                {item.quantity > 0 ? (
                  <Box display="flex" alignItems="flex-start" padding="1rem">
                    <Box className="image-container">
                      <img
                        src={item.imageURL}
                        alt={item.name}
                        width="100%"
                        height="100%"
                      />
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                      height="6rem"
                      paddingX="1rem"
                    >
                      <Box>{item.name}</Box>

                      {/* .....Here we call "quantityOption()" function  to get the 'DROP DOWN' options of 'quantity'.... */}
                      <div>{quantityOption(item.quantity, item.id)}</div>
                    </Box>

                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    ></Box>
                    <Box padding="0.5rem" fontWeight="700">
                      Rs{item.price}
                      <Box>
                        <Button name={item.id} onClick={HandleDelete}>
                          Delete
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                ) : null}
              </Box>
            ))}
            {
              <Box
                padding="1rem"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box color="#3C3C3C" alignSelf="center">
                  <h4>Order total</h4>
                </Box>
                <Box
                  color="#3C3C3C"
                  fontWeight="700"
                  fontSize="1.5rem"
                  alignSelf="center"
                  data-testid="cart-total"
                >
                  Rs{totalOrderValue()}
                </Box>
              </Box>
            }
          </Box>
        </Grid>
      ) : (
        // ..... When Cart is empty this Code is executed.........
        <Grid item xs={12} id="cartItems">
          <Box className="cart empty">
            <ShoppingCartOutlined className="empty-cart-icon" />
            <Box color="#aaa" textAlign="center">
              Cart is empty. Add more items to the cart to checkout.
            </Box>
          </Box>
        </Grid>
      )}
    </>
  );
};

export default Cart;
