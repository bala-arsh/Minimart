import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/success.css";

const OrderSuccess = () => {
  const { state } = useLocation();

  const orderId = state?.orderId ?? "MM-READY";
  const itemCount = state?.itemCount ?? 0;
  const orderTotal = state?.orderTotal ?? 0;
  const customerName = state?.customerName ?? "Customer";
  const phone = state?.phone ?? "Not provided";
  const deliveryAddress = state?.deliveryAddress ?? "Address unavailable";
  const paymentMethod = state?.paymentMethod ?? "Payment pending";
  const items = state?.items ?? [];
  const formatCurrency = (value) => `INR ${value.toLocaleString("en-IN")}`;

  return (
    <div className="page-shell">
      <Header selectedCategory="all" setSelectedCategory={() => {}} />
      <main className="container success-page">
        <section className="success-card">
          <div className="success-badge">Order Confirmed</div>
          <h1>Your order is on the way</h1>
          <p className="success-copy">
            Payment instructions and delivery updates will follow shortly. You can continue browsing
            while we prepare your items.
          </p>

          <div className="success-meta-grid">
            <div>
              <span className="success-label">Order ID</span>
              <strong>{orderId}</strong>
            </div>
            <div>
              <span className="success-label">Items</span>
              <strong>{itemCount}</strong>
            </div>
            <div>
              <span className="success-label">Order total</span>
              <strong>{formatCurrency(orderTotal)}</strong>
            </div>
          </div>

          <div className="success-detail-grid">
            <div className="success-panel">
              <span className="success-label">Customer</span>
              <strong>{customerName}</strong>
              <p>{phone}</p>
            </div>
            <div className="success-panel">
              <span className="success-label">Delivery Address</span>
              <strong>{deliveryAddress}</strong>
            </div>
            <div className="success-panel">
              <span className="success-label">Payment Method</span>
              <strong>{paymentMethod}</strong>
            </div>
          </div>

          {items.length > 0 && (
            <div className="success-items">
              <span className="success-label">Purchased Items</span>
              <div className="success-items-list">
                {items.map((item) => (
                  <div key={item.id} className="success-item-row">
                    <span>{item.title}</span>
                    <strong>x {item.quantity}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="success-actions">
            <Link to="/" className="success-btn primary">Continue Shopping</Link>
            <Link to="/contact" className="success-btn secondary">Need Help?</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
