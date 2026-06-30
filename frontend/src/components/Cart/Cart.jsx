import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import { useCartStore } from '../../store/Cart'
import './Cart.scss'

const FALLBACK_IMG = 'https://placehold.co/300x200/0f172a/64748b?text=No+Image'

const Cart = () => {
  const { items, removeFromCart, decreaseQty, addToCart, clearCart, getTotalPrice, getTotalCount } = useCartStore()
  const [failedImgs, setFailedImgs] = useState(new Set())
  const [removingId, setRemovingId] = useState(null)
  const [clearing, setClearing] = useState(false)

  const handleImgError = (id) => {
    setFailedImgs((prev) => new Set(prev).add(id))
  }

  const handleRemove = (id) => {
    setRemovingId(id)
    setTimeout(() => {
      removeFromCart(id)
      setRemovingId(null)
    }, 400)
  }

  const handleClear = () => {
    setClearing(true)
    setTimeout(() => {
      clearCart()
      setClearing(false)
    }, 500)
  }

  if (items.length === 0) {
    return (
      <div className="cart cart--empty">
        <div className="cart__bg">
          <div className="cart__orb cart__orb--1" />
          <div className="cart__orb cart__orb--2" />
        </div>
        <div className="cart__empty-content">
          <div className="cart__empty-icon">🛒</div>
          <div className="cart__empty-dust">
            <span />
            <span />
            <span />
          </div>
          <h2>Your Cart is Empty</h2>
          <p>Browse newspapers and add them to your cart.</p>
          <Link to="/publish" className="cart__browse-btn">
            <span className="cart__browse-btn-shine" />
            <span className="cart__browse-btn-text">Browse Newspapers</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart">
      <div className="cart__bg">
        <div className="cart__orb cart__orb--1" />
        <div className="cart__orb cart__orb--2" />
      </div>

      <div className="cart__wrap">
        <div className="cart__header">
          <div className="cart__header-left">
            <div className="cart__header-icon">🛍️</div>
            <div>
              <h2 className="cart__title">Your Cart</h2>
              <p className="cart__subtitle">Review your selected newspapers</p>
            </div>
          </div>
          <span className="cart__count">
            <span className="cart__count-num">{getTotalCount()}</span>
            <span className="cart__count-label">items</span>
          </span>
        </div>

        <div className={`cart__items ${clearing ? 'cart__items--clearing' : ''}`}>
          {items.map((item, i) => (
            <div 
              key={item._id} 
              className={`cart__item ${removingId === item._id ? 'cart__item--removing' : ''}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="cart__item-glow" />
              
              <div className="cart__item-img-wrap">
                <img
                  src={failedImgs.has(item._id) ? FALLBACK_IMG : item.image}
                  alt={item.name}
                  className="cart__item-img"
                  onError={() => handleImgError(item._id)}
                />
                <div className="cart__item-img-overlay" />
              </div>

              <div className="cart__item-info">
                <h3>{item.name}</h3>
                <p className="cart__item-date">{item.date}</p>
                <p className="cart__item-price">EGP {item.price}</p>
              </div>

              <div className="cart__item-controls">
                <button 
                  className="qty-btn qty-btn--minus" 
                  onClick={() => item.quantity > 1 ? decreaseQty(item._id) : handleRemove(item._id)}
                >
                  <span>−</span>
                </button>
                <span className="qty" key={item.quantity}>{item.quantity}</span>
                <button 
                  className="qty-btn qty-btn--plus" 
                  onClick={() => addToCart(item)}
                >
                  <span>+</span>
                </button>
              </div>

              <button 
                className="cart__item-remove" 
                onClick={() => handleRemove(item._id)}
              >
                <MdDelete />
                <span className="cart__item-remove-ripple" />
              </button>
            </div>
          ))}
        </div>

        <div className="cart__footer">
          <div className="cart__total">
            <span className="cart__total-label">Total Amount</span>
            <strong className="cart__total-value">EGP {getTotalPrice().toFixed(2)}</strong>
          </div>
          <div className="cart__actions">
            <button className="cart__clear-btn" onClick={handleClear}>
              <span className="cart__clear-icon">🗑️</span>
              Clear Cart
            </button>
            <button className="cart__checkout-btn">
              <span className="cart__checkout-text">Proceed to Checkout</span>
              <span className="cart__checkout-arrow">→</span>
              <div className="cart__checkout-shine" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart