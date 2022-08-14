
import './App.css';
import firebase from './firebase';
import { getDatabase, ref, onValue, update} from 'firebase/database';
import { useState, useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  const [pictures, setPictures] = useState([]);
  const [count, setCount] = useState(0);
  const [openCart, setCart] = useState(false);

  const [userCart, setUserCart] = useState ([]);

  // when page loads, call useEffect to connect to firebase and load data from the "inventory" object 
  useEffect(()=>{

    // holding database details
    const database = getDatabase(firebase);

    // variable that reference the specific location of our database
    const dbRef = ref(database, );

    onValue(dbRef, (response) =>{
      
      const newInventory = [];
      const newUserCart = [];
      const inventory = response.val().inventory;
      const userCart = response.val().userCart;
      // console.log(userCart)
    
      for (let key in inventory){
        
        // (userCart[key],key)

        newInventory.push(
          {
            key,
            title: inventory[key].title,
            imgUrl:inventory[key].imgUrl,
            price:inventory[key].price,
            count: !userCart[key] ? 0 : userCart[key].count
            // above code means :  if the userCart does not contain the key, we will set the count to 0, otherwise we get the count from userCart 
            
          }
          )
          // console.log(inventory[key].title)
          // console.log(key)
      }

      for( let key in userCart){

        newUserCart.push(
          {
            key,
            title: userCart[key].title,
            imgUrl:userCart[key].imgUrl,
            price:userCart[key].price,
            count: userCart[key].count
          })
      }
      setPictures(newInventory);
      
      setUserCart(newUserCart);

    })
  },[])


  const add = function(userSelectItem){
    setCount(count + 1);

    const database = getDatabase(firebase);
    const dbRef = ref(database, '/userCart');

    const userSelectedItemInfo = {
      [userSelectItem.key]:{
        price: userSelectItem.price,
        imgUrl: userSelectItem.imgUrl,
        title: userSelectItem.title,
        count: userSelectItem.count + 1
      }      
    }  
    update(dbRef, userSelectedItemInfo)
  }


  // const minus = function (){
  //   setCount(count -1);

  //   count <= 0 && setCount (0)
  // }

  const handleCart = function(){
    setCart(!openCart)
  }

  const getTotalCount = function(userCart){
    let totalCount = 0;
    userCart.forEach((item)=>{
      totalCount += item.count
      // for every item, increase the totalcount by the item.count
    })

    return totalCount;

  }



  // 试一下玩
  const totalAmountCalculator = (userPickedItems)=>{
    let totalAmount = 0
    userPickedItems.forEach((item)=>{
      totalAmount = totalAmount + item.price * item.count
    })
    return totalAmount
  }



  return (
    <div className="App">

      <Header handleCart={handleCart} totalCount ={getTotalCount(userCart)} />

      {
       pictures &&(
          pictures.map( (pics) => {
           return(
             <div className='itemContainer' key={pics.key}>
               <img src={pics.imgUrl} alt={pics.title}/>
               <figcaption>{pics.title}</figcaption>
               <p>${pics.price}</p>
             
               <div className="buttonContainer">
                 <button onClick={()=>{add(pics)}}>add to cart</button>
                 {/* <button onClick={minus}>Delete</button> */}
               </div>
             </div>
            )
          })
        )

      }

      {/* when open shopping cart */}
      <nav className={openCart ? 'cart' : null}>
        <ul>
          {
            userCart && (

              userCart.map((cart)=>{
                // get the amount for each item added to cart
                const itemAmount = cart.count * cart.price;
                return(
                  <li key={cart.key}>
                    <img src={cart.imgUrl} alt={cart.title} />
                    {/* <p> {cart.title}</p> */}
                    {/* <p>{cart.price}</p> */}
                    <article>count: x {cart.count}</article>
                    <p>Amount: ${itemAmount}</p>
                    <button>remove from cart</button>
                  </li>
                )
                
              })
            )
          }

          <p> -Your total Amount: ${totalAmountCalculator(userCart)}  </p>
          <li onClick={handleCart}>x</li>
        </ul>
      </nav>


      <Footer />
    </div>
  );
  

}

export default App;
