const DisplayInventory = (props) =>{
    return (
        
            props.pictures &&(
               props.pictures.map( (pics) => {
                return(
                  <div className='itemContainer' key={pics.key}>
                     <img src={pics.imgUrl} alt={pics.title}/>
                     <figcaption>{pics.title}</figcaption>
                     <p>${pics.price}</p>
                  
                     <div className="buttonContainer">
                       <button onClick={()=>{props.add(pics)}}>ADD TO CART</button>
                     </div>
                  </div>
                 )
               })
             )
        
        
    )
}

export default DisplayInventory;