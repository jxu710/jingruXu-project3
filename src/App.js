import firebase from "./firebase";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import { useState, useEffect } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import DisplayInventory from "./components/DisplayInventory";
import DisplayCart from "./components/DisplayCart";

function App() {
  const [pictures, setPictures] = useState([]);
  const [openCart, setCart] = useState(false);
  const [userCart, setUserCart] = useState([]);

  const [filteredItems, setFilteredItems] = useState([]);
  // const [userChoice, setUserChoice] = useState('placeholder')

  // when page loads, call useEffect to connect to firebase and load data from the "inventory" object
  useEffect(() => {
    // holding database details
    const database = getDatabase(firebase);

    // variable that reference the specific location of our database
    const dbRef = ref(database);

    onValue(dbRef, (response) => {
      const newInventory = [];
      const newUserCart = [];
      const inventory = response.val().inventory;
      const userSelectedCart = response.val().userSelectedCart || [];

      for (let key in inventory) {
        newInventory.push({
          key,
          title: inventory[key].title,
          imgUrl: inventory[key].imgUrl,
          price: inventory[key].price,
          // if the userSelectedCart contain the key, we get the count from userSelectedCart. Otherwise we will set the count to 0,
          count: userSelectedCart[key] ? userSelectedCart[key].count : 0,

          value: inventory[key].value,
        });
      }

      for (let key in userSelectedCart) {
        newUserCart.push({
          key,
          title: userSelectedCart[key].title,
          imgUrl: userSelectedCart[key].imgUrl,
          price: userSelectedCart[key].price,
          count: userSelectedCart[key].count,
          value: userSelectedCart[key].value,
        });
      }
      setPictures(newInventory);
      setUserCart(newUserCart);
    });
  }, []);

  // event listener pass to header component, filter items based on value "coffee" or "beer"
  const handleUserChoice = (e) => {
    const ItemsFilter = pictures.filter((item) => {
      return item.value === e.target.value;
    });
    setFilteredItems(ItemsFilter);
  };

  // function when user click add to cart button
  const add = function (userSelectItem) {
    const database = getDatabase(firebase);
    const dbRef = ref(database, "/userSelectedCart");

    // Check if the item already exists in the cart
    const existingCartItem = userCart.find(
      (item) => item.key === userSelectItem.key
    );

    if (existingCartItem) {
      // If the item exists, update the count
      const updatedCartItem = {
        ...existingCartItem,
        count: existingCartItem.count + 1,
      };

      const updatedCart = userCart.map((item) =>
        item.key === existingCartItem.key ? updatedCartItem : item
      );

      setUserCart(updatedCart);

      // Update the count in the database
      const userSelectedItemInfo = {
        [existingCartItem.key]: {
          price: existingCartItem.price,
          imgUrl: existingCartItem.imgUrl,
          title: existingCartItem.title,
          count: updatedCartItem.count,
        },
      };

      update(dbRef, userSelectedItemInfo);
    } else {
      // If the item doesn't exist, add it to the cart
      const newCartItem = {
        ...userSelectItem,
        count: 1,
      };

      setUserCart([...userCart, newCartItem]);

      // Add the new item to the database
      const userSelectedItemInfo = {
        [newCartItem.key]: {
          price: newCartItem.price,
          imgUrl: newCartItem.imgUrl,
          title: newCartItem.title,
          count: newCartItem.count,
        },
      };

      update(dbRef, userSelectedItemInfo);
    }
  };

  // when user click delete from cart inside shopping cart Nav
  const minus = function (userRemoveItem) {
    const database = getDatabase(firebase);

    const dbRef = ref(database, `userSelectedCart/${userRemoveItem}`);
    remove(dbRef, userRemoveItem);
  };

  // function to change the state variable userCart from false to true
  const handleCart = function () {
    setCart(!openCart);
  };

  // updated the shopping cart number
  const getTotalCount = function (shoppingCart) {
    let totalCount = 0;
    shoppingCart.forEach((item) => {
      totalCount = totalCount + item.count;
      // for every item, increase the totalcount by the item.count
    });
    return totalCount;
  };

  // function to calculate total amount of items in shopping cart
  const totalAmountCalculator = (userPickedItems) => {
    let totalAmount = 0;
    userPickedItems.forEach((item) => {
      totalAmount = totalAmount + item.price * item.count;
    });
    return totalAmount;
  };

  return (
    <div className="App">
      <Header
        handleCart={handleCart}
        totalCount={getTotalCount(userCart)}
        pictures={pictures}
        handleUserChoice={handleUserChoice}
      />

      <DisplayInventory
        pictures={filteredItems.length > 0 ? filteredItems : pictures}
        add={add}
      />

      <DisplayCart
        userCart={userCart}
        openCart={openCart}
        minus={minus}
        totalAmountCalculator={totalAmountCalculator}
        handleCart={handleCart}
      />

      <Footer />
    </div>
  );
}

export default App;
