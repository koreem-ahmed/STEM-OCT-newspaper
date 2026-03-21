import { Link } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import { useCartStore } from '../../store/Cart'
import './Cart.scss'

const Cart = () => {
  const { items, removeFromCart, decreaseQty, addToCart, clearCart, getTotalPrice } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="cart cart--empty">
        <h2>Your Cart is Empty</h2>
        <p>Browse newspapers and add them to your cart.</p>
        <Link to="/publish" className="cart__browse-btn">Browse Newspapers</Link>
      </div>
    )
  }

  return (
    <div className="cart">
      <h2 className="cart__title">Your Cart</h2>

      <div className="cart__items">
        {items.map((item) => (
          <div key={item._id} className="cart__item">
            <img src={item.image} alt={item.name} className="cart__item-img" />

            <div className="cart__item-info">
              <h3>{item.name}</h3>
              <p className="cart__item-date">{item.date}</p>
              <p className="cart__item-price">EGP {item.price}</p>
            </div>

            <div className="cart__item-controls">
              <button className="qty-btn" onClick={() => decreaseQty(item._id)}>−</button>
              <span className="qty">{item.quantity}</span>
              <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
            </div>

            <button className="cart__item-remove" onClick={() => removeFromCart(item._id)}>
              <MdDelete />
            </button>
          </div>
        ))}
      </div>

      <div className="cart__footer">
        <div className="cart__total">
          Total: <strong>EGP {getTotalPrice().toFixed(2)}</strong>
        </div>
        <button className="cart__clear-btn" onClick={clearCart}>Clear Cart</button>
        <button className="cart__checkout-btn">Checkout</button>
      </div>
    </div>
  )
}

export default Cart
