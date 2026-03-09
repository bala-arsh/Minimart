import "../styles/productcard.css";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { image, title, price, rating = 0, discount = 0, stock = 0 } = product;
  const isOutOfStock = stock === 0;

  const discountedPrice =
    discount > 0 ? Math.round(price - (price * discount) / 100) : price;

  const renderStars = (value) => {
    const fullStars = Math.floor(value);
    const totalStars = 5;

    return Array.from({ length: totalStars }, (_, index) => (
      <span key={index}>{index < fullStars ? "\u2605" : "\u2606"}</span>
    ));
  };

  const handleAddToCart = () => {
    if (isOutOfStock) {
      return;
    }

    addToCart(product);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) {
      return;
    }

    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="product-card">
      {discount > 0 && (
        <span className="discount-badge">{discount}% OFF</span>
      )}

      <Link to={`/products/${product.id}`}>
        <img src={image} alt={title} className="product-image" />
        <h3 className="product-title">{title}</h3>
      </Link>

      <div className="product-rating">
        {renderStars(rating)}
        <span className="rating-value">{rating.toFixed(1)}</span>
      </div>

      <div className="product-price-section">
        {discount > 0 && (
          <span className="original-price">INR {price}</span>
        )}
        <span className="discounted-price">
          INR {discountedPrice}
        </span>
      </div>

      <p className={`stock-status ${isOutOfStock ? "out-of-stock" : "in-stock"}`}>
        {isOutOfStock ? "Out of stock" : `In stock: ${stock}`}
      </p>

      <div className="product-actions">
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        >
          Add to Cart
        </button>

        <button
          className="btn btn-secondary"
          type="button"
          onClick={handleBuyNow}
          disabled={isOutOfStock}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
