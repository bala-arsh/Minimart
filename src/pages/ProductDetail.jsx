import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import products from "../data/products";
import "../styles/productdetail.css";

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="page-shell">
        <Header selectedCategory="all" setSelectedCategory={() => {}} />
        <main className="container empty-state">
          <h2>Product not found</h2>
        </main>
        <Footer />
      </div>
    );
  }

  const {
    title,
    image,
    price,
    rating = 0,
    description,
    discount = 0,
    category,
    stock = 0,
  } = product;

  const discountedPrice =
    discount > 0 ? Math.round(price - (price * discount) / 100) : price;

  const renderStars = (value) => {
    const totalStars = 5;
    const fullStars = Math.round(value);

    return Array.from({ length: totalStars }, (_, index) => (
      <span key={index}>{index < fullStars ? "\u2605" : "\u2606"}</span>
    ));
  };

  const formatCurrency = (value) => `INR ${value.toLocaleString("en-IN")}`;

  const discountAmount = price - discountedPrice;
  const isOutOfStock = stock === 0;
  const stockLabel = stock > 0 ? "In stock" : "Out of stock";
  const availabilityClass = stock > 0 ? "in-stock" : "out-of-stock";

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    if (!isOutOfStock) {
      addToCart(product);
      navigate("/cart");
    }
  };

  return (
    <div className="page-shell">
      <Header selectedCategory="all" setSelectedCategory={() => {}} />
      <main className="product-detail-page container">
        <p className="product-breadcrumb">
          Home / {category} / <span>{title}</span>
        </p>

        <div className="product-detail-layout">
          <section className="product-gallery" aria-label="Product gallery">
            <div className="thumbnail-list">
              {[1, 2, 3, 4].map((thumb) => (
                <button key={thumb} type="button" className="thumbnail-btn">
                  <img src={image} alt={`${title} view ${thumb}`} />
                </button>
              ))}
            </div>

            <div className="main-image-wrap">
              <img src={image} alt={title} className="main-image" />
              {discount > 0 && (
                <span className="image-discount-badge">Save {discount}%</span>
              )}
            </div>
          </section>

          <section className="product-info" aria-label="Product details">
            <h1>{title}</h1>

            <div className="detail-rating-row">
              <div className="stars">{renderStars(rating)}</div>
              <span className="rating-text">{rating.toFixed(1)} rating</span>
              <span className="rating-divider">|</span>
              <span className="rating-link">Top rated in {category}</span>
            </div>

            <p className="purchase-line">500+ bought in past month</p>

            <div className="price-block">
              {discount > 0 && <span className="deal-tag">Limited time deal</span>}
              <p className="current-price">{formatCurrency(discountedPrice)}</p>
              {discount > 0 && (
                <p className="mrp-line">
                  M.R.P.: <span>{formatCurrency(price)}</span> ({formatCurrency(discountAmount)} off)
                </p>
              )}
              <p className="tax-line">Inclusive of all taxes</p>
              <p className="emi-line">
                EMI starts at {formatCurrency(Math.max(99, Math.round(discountedPrice / 12)))}/month
              </p>
            </div>

            <div className="about-item">
              <h2>About this item</h2>
              <ul>
                <li>{description}</li>
                <li>Category: {category}</li>
                <li>Fast dispatch with secure packaging.</li>
                <li>Easy return and replacement support.</li>
              </ul>
            </div>
          </section>

          <aside className="buy-box" aria-label="Purchase actions">
            <p className="buy-price">{formatCurrency(discountedPrice)}</p>
            <p className="shipping-text">FREE delivery by Tomorrow</p>
            <p className={`availability ${availabilityClass}`}>{stockLabel}</p>
            <p className="stock-count">
              {isOutOfStock ? "Currently unavailable." : `In stock: ${stock}`}
            </p>

            <button className="buy-btn primary" type="button" onClick={handleAddToCart} disabled={isOutOfStock}>
              Add to Cart
            </button>
            <button className="buy-btn secondary" type="button" onClick={handleBuyNow} disabled={isOutOfStock}>
              Buy Now
            </button>

            <div className="buy-meta">
              <p>Sold by: ShopHub Retail</p>
              <p>Secure transaction</p>
              <p>Returns: 7-day replacement</p>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductDetail;
