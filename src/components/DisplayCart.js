const DisplayCart = (props) => {
  return (
    <nav className={props.openCart ? "cart" : null}>
      <ul>
        <div className="shoppingCartTitle">
          <h2>Your Cart</h2>
        </div>
        {props.userCart &&
          props.userCart.map((cart) => {
            const itemAmount = cart.count * cart.price;
            return (
              <li key={cart.key}>
                <img src={`${cart.imgUrl}?${cart.count}`} alt={cart.title} />

                <article>Quantity: ({cart.count} items)</article>

                <p>Amount: ${itemAmount}</p>
                <button
                  onClick={() => {
                    props.minus(cart.key);
                  }}
                >
                  Remove From Cart 🗑️
                </button>
              </li>
            );
          })}
        <p> ☕ Subtotal: ${props.totalAmountCalculator(props.userCart)}</p>
        <li className="crossMark" onClick={props.handleCart}>
          ❌
        </li>
      </ul>
    </nav>
  );
};

export default DisplayCart;
