// Header Component

const Header = (props) =>{

    return(

      <header>
        <h1>Hug in a 'Mug'!</h1>
        <i className="fa-solid fa-cart-shopping " onClick={props.handleCart}>
        <p onClick={props.handleCart}>{props.totalCount} </p>
        </i> 
        

        {/* <div className="filterMenu">
          <form>
            <h3>Filter items by:</h3>
            <select 
            name="category" 
            id="category" 
            onChange={props.handleUserChoice} 
            >
              <option value="placeholder" disabled>Categories</option>
              <option value="all">All</option>
              <option value="beer">Beer mugs</option>
              <option value="coffee">Coffee mugs</option>
            </select>
          </form>
        </div>        */}
      </header>
    )

}

export default Header;


