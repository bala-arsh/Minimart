import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import "../styles/cart.css";

const Cart = () => {
  const { cartItems, cartSubtotal, clearCart, removeFromCart, updateQuantity } = useCart();
  const shippingFee = cartItems.length > 0 ? 49 : 0;
  const orderTotal = cartSubtotal + shippingFee;

  const formatCurrency = (value) => `INR ${value.toLocaleString("en-IN")}`;

  return (
    <div className="page-shell">
      <Header selectedCategory="all" setSelectedCategory={() => {}} />
      <main className="container cart-page">
        <section className="cart-hero compact">
          <div>
            <h1>Your shopping cart</h1>
            <p className="hero-copy">
              Review selected items, adjust quantity, and verify the order summary.
              Update quantities or remove items before proceeding to checkout. Our team is here to help if you have any questions!
            </p>
          </div>
        </section>

        {cartItems.length === 0 ? (
          <section className="empty-state">
            <h2>Your cart is empty.</h2>
            <p>Add a few products before checkout.</p>
            <Link to="/" className="inline-action">Browse products</Link>
          </section>
        ) : (
          <div className="cart-layout">
            <section className="cart-list" aria-label="Cart items">
              {cartItems.map((item) => {
                const itemPrice =
                  item.discount > 0 ? Math.round(item.price - (item.price * item.discount) / 100) : item.price;

                return (
                  <article key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} className="cart-item-image" />
                    <div className="cart-item-copy">
                      <Link to={`/products/${item.id}`} className="cart-item-title">{item.title}</Link>
                      <p>{item.category}</p>
                      <p>{formatCurrency(itemPrice)} each</p>
                    </div>
                    <label className="qty-control">
                      Qty
                      <select
                        value={item.quantity}
                        onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                      >
                        {Array.from({ length: item.stock }, (_, index) => index + 1).map((value) => (
                          <option key={value} value={value}>{value}</option>
                        ))}
                      </select>
                    </label>
                    <div className="cart-item-actions">
                      <p className="line-total">{formatCurrency(itemPrice * item.quantity)}</p>
                      <button type="button" className="text-action" onClick={() => removeFromCart(item.id)}>
                        Remove
                      </button>
                    </div>
                  </article>
                );
              })}
            </section>

            <aside className="cart-summary" aria-label="Order summary">
              <h2>Order summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatCurrency(cartSubtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{formatCurrency(shippingFee)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatCurrency(orderTotal)}</span>
              </div>
              <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
              <button type="button" className="text-action" onClick={clearCart}>Clear cart</button>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
