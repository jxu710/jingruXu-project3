// Header Component

const Header = (props) =>{
    return(
    <header>
    <h1>Welcome to the store!!!</h1>
    <i className="fa-solid fa-cart-shopping " onClick={props.handleCart}>
      <p onClick={props.handleCart}>{props.count} </p>
    </i>        
  </header>
    )

}

export default Header;