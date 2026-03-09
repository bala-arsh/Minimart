import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import "../styles/checkout.css";

const initialForm = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  paymentMethod: "cod",
};

const paymentLabels = {
  cod: "Cash on Delivery",
  upi: "UPI / Card",
};

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const [formValues, setFormValues] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const [formMessage, setFormMessage] = useState("");

  const shippingFee = cartItems.length > 0 ? 49 : 0;
  const orderTotal = cartSubtotal + shippingFee;
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const formatCurrency = (value) => `INR ${value.toLocaleString("en-IN")}`;

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setFormValues((current) => ({ ...current, [name]: value }));
    setFormErrors((current) => ({ ...current, [name]: "" }));
    setFormMessage("");
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formValues.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!/^\d{10}$/.test(formValues.phone.trim())) {
      nextErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (!formValues.address.trim()) {
      nextErrors.address = "Street address is required.";
    }

    if (!formValues.city.trim()) {
      nextErrors.city = "City is required.";
    }

    if (!/^\d{6}$/.test(formValues.postalCode.trim())) {
      nextErrors.postalCode = "Enter a valid 6-digit PIN code.";
    }

    if (!formValues.paymentMethod) {
      nextErrors.paymentMethod = "Select a payment method.";
    }

    return nextErrors;
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      setFormMessage("Complete the required checkout details before placing the order.");
      return;
    }

    const orderState = {
      customerName: formValues.fullName.trim(),
      phone: formValues.phone.trim(),
      deliveryAddress: `${formValues.address.trim()}, ${formValues.city.trim()} - ${formValues.postalCode.trim()}`,
      itemCount,
      items: cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
      })),
      orderTotal,
      orderId: `MM-${Date.now().toString().slice(-6)}`,
      paymentMethod: paymentLabels[formValues.paymentMethod],
    };

    clearCart();
    navigate("/order-success", { state: orderState });
  };

  if (cartItems.length === 0) {
    return (
      <div className="page-shell">
        <Header selectedCategory="all" setSelectedCategory={() => {}} />
        <main className="container checkout-page">
          <section className="checkout-empty">
            <p className="checkout-kicker">Checkout</p>
            <h1>No items ready for checkout</h1>
            <p>Add products to cart before continuing.</p>
            <Link to="/" className="checkout-link">Go to catalog</Link>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-shell">
      <Header selectedCategory="all" setSelectedCategory={() => {}} />
      <main className="container checkout-page">
        <section className="checkout-hero">
          <div>
            <p className="checkout-kicker">Checkout</p>
            <h1>Complete your order</h1>
            <p className="checkout-copy">
              Enter shipping details, choose payment, and review your order before placing it.
            </p>
          </div>
          <Link to="/cart" className="checkout-back">Back to cart</Link>
        </section>

        <form className="checkout-layout" onSubmit={handlePlaceOrder}>
          <section className="checkout-form-card" aria-label="Checkout details">
            <div className="checkout-section">
              <h2>Shipping address</h2>
              <div className="checkout-field-grid">
                <label className="checkout-field">
                  Full name
                  <input
                    type="text"
                    name="fullName"
                    value={formValues.fullName}
                    onChange={handleFieldChange}
                    placeholder="Enter your full name"
                    className={formErrors.fullName ? "input-error" : ""}
                  />
                  {formErrors.fullName && <span className="field-error">{formErrors.fullName}</span>}
                </label>
                <label className="checkout-field">
                  Phone number
                  <input
                    type="tel"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleFieldChange}
                    placeholder="Enter your mobile number"
                    className={formErrors.phone ? "input-error" : ""}
                  />
                  {formErrors.phone && <span className="field-error">{formErrors.phone}</span>}
                </label>
                <label className="checkout-field field-span">
                  Street address
                  <input
                    type="text"
                    name="address"
                    value={formValues.address}
                    onChange={handleFieldChange}
                    placeholder="Flat, area, street name"
                    className={formErrors.address ? "input-error" : ""}
                  />
                  {formErrors.address && <span className="field-error">{formErrors.address}</span>}
                </label>
                <label className="checkout-field">
                  City
                  <input
                    type="text"
                    name="city"
                    value={formValues.city}
                    onChange={handleFieldChange}
                    placeholder="City"
                    className={formErrors.city ? "input-error" : ""}
                  />
                  {formErrors.city && <span className="field-error">{formErrors.city}</span>}
                </label>
                <label className="checkout-field">
                  Postal code
                  <input
                    type="text"
                    name="postalCode"
                    value={formValues.postalCode}
                    onChange={handleFieldChange}
                    placeholder="PIN code"
                    className={formErrors.postalCode ? "input-error" : ""}
                  />
                  {formErrors.postalCode && <span className="field-error">{formErrors.postalCode}</span>}
                </label>
              </div>
            </div>

            <div className="checkout-section">
              <h2>Payment method</h2>
              <div className="payment-options">
                <label className={`payment-card ${formValues.paymentMethod === "cod" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formValues.paymentMethod === "cod"}
                    onChange={handleFieldChange}
                  />
                  <span>Cash on Delivery</span>
                </label>
                <label className={`payment-card ${formValues.paymentMethod === "upi" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formValues.paymentMethod === "upi"}
                    onChange={handleFieldChange}
                  />
                  <span>UPI / Card</span>
                </label>
              </div>
              {formErrors.paymentMethod && <span className="field-error">{formErrors.paymentMethod}</span>}
            </div>
          </section>

          <aside className="checkout-summary" aria-label="Checkout summary">
            <h2>Order summary</h2>
            <div className="checkout-items">
              {cartItems.map((item) => {
                const itemPrice =
                  item.discount > 0 ? Math.round(item.price - (item.price * item.discount) / 100) : item.price;

                return (
                  <div key={item.id} className="checkout-item-row">
                    <span>{item.title} x {item.quantity}</span>
                    <strong>{formatCurrency(itemPrice * item.quantity)}</strong>
                  </div>
                );
              })}
            </div>
            <div className="checkout-total-row">
              <span>Subtotal</span>
              <strong>{formatCurrency(cartSubtotal)}</strong>
            </div>
            <div className="checkout-total-row">
              <span>Shipping</span>
              <strong>{formatCurrency(shippingFee)}</strong>
            </div>
            <div className="checkout-total-row grand-total">
              <span>Total</span>
              <strong>{formatCurrency(orderTotal)}</strong>
            </div>
            {formMessage && <p className="checkout-message error">{formMessage}</p>}
            <button type="submit" className="place-order-btn">
              Place Order
            </button>
          </aside>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
