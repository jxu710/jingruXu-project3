const DisplayCart = (props) =>{
    return(
        <nav className={props.openCart ? 'cart' : null}>
            <ul>
                {
                    props.userCart && (
                        props.userCart.map((cart)=>{
                            // console.log(cart.key)
                            // get the amount for each item added to cart
                            const itemAmount = cart.count * cart.price;
                            return(
                                <li key={cart.key}>
                                    <img src={cart.imgUrl} alt={cart.title} />
                                    {/* <p> {cart.title}</p> */}
                                    {/* <p>${cart.price}</p> */}
                                    <article>Quantity: ({cart.count} items)</article>
                                    <p>Amount: ${itemAmount}</p>
                                    <button onClick={()=>{props.minus(cart.key)}}>Remove From Cart 🗑️</button>
                                </li>
                            )
                
                        })
                    )
                }

                <p> ☕ Subtotal: ${props.totalAmountCalculator(props.userCart)}</p>
                <li className='crossMark' onClick={props.handleCart}>❌</li>
            </ul>
        </nav>

    )
}


export default DisplayCart;