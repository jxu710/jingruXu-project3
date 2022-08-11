
import './App.css';
import firebase from './firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';

import Header from './components/Header';


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

      <Header handleCart={handleCart} count ={count} />
      {
       pictures.map( (pics,index) => {
         return(
          //  <li>
          <div className='imgContainer'>
            <img src={pics} key={index} alt="mugs"/>
            <button onClick={add} key={index}>add to cart</button>
            <button onClick={minus} key={index}>Delete</button>
            <figcaption>$5</figcaption>
          </div>
          //  {/* </li> */}
         )
        })
      }

  
  

      {/* when open shopping cart */}
      <nav className={openCart && 'cart'}>
        <ul>
          <li><img className='imgAdded' src={pictures[1]} alt="" /></li>
          <li onClick={handleCart} className={openCart && 'cart'}>x</li>
          <p> Your total Amount:</p>
        </ul>
      </nav>
      
      <footer>
        <p> Created at Juno</p>
      </footer>
    </div>
  );

}

export default App;
