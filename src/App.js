
import './App.css';
import firebase from './firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';


function App() {
  const [pictures, setPictures] = useState([]);
  const [count, setCount] = useState(0);
  const [openCart, setCart] = useState(false);


  const add = function(){
    setCount(count + 1);
  }

  const minus = function (){
    setCount(count -1);
    if(count <= 0){
      setCount(0)
    }
  }


  const handleCart = function(){
    setCart(!openCart)
  }


  useEffect(()=>{

    // holding database details
    const database = getDatabase(firebase);

    // variable that reference the specific location of our database
    const dbRef = ref(database);

    onValue(dbRef, (response) =>{
      // console.log(response.val())

      const newState = [];
      const data = response.val();
    
      for (let key in data){
         newState.push(data[key])
        // console.log(newState)
      }

      setPictures(newState);
    })

  },[])

  return (
    <div className="App">
      <header>
        <h1>Welcome to the store!!!</h1>

        {/* <button onClick={add}>add to cart</button> */}

        {/* <button onClick={minus}>−</button> */}
      </header>


      
  
      {
       pictures.map( (pics,index) => {
         return(
          //  <li>
          <div className='imgContainer'>
            <img src={pics} key={index} alt="mugs"/>
            <button onClick={add}>add to cart</button>
            <button onClick={minus}>Delete</button>
            
          </div>
            
          //  {/* </li> */}
         )
       })
      }
    
       

        <i className="fa-solid fa-cart-shopping " onClick={handleCart}>

        <p onClick={handleCart}>{count} </p>
      </i>


      {/* when open shopping cart */}
      <nav className={openCart && 'cart'}>
        <ul>
          <li>a</li>
          <li>b</li>
          <li>c</li>
          <li>d</li>
          <li>e</li>
          <li className={openCart && 'cart'}>x</li>
        </ul>
      </nav>
      
    </div>
  );

}

export default App;
