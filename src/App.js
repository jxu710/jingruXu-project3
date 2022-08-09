
import './App.css';
import firebase from './firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';


function App() {
  const [pictures, setPictures] = useState([]);
  const [count, setCount] = useState(0);

  const add = function(){
    setCount(count + 1);
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

    SetLoading(false)
  
  },[])

  return (
    <div className="App">
      <h1>Welcome to the store!!!</h1>

  
      {
       pictures.map( (pics) => {
         return(
          //  <li>
           <img src={pics} onClick={add}/>
          //  {/* </li> */}
         )
       })
      }
    
       



      {/* <i className="fa-solid fa-cart-shopping">

        <p>{count}</p>
      </i> */}


      
    </div>
  );

}

export default App;
