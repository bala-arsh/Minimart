import { Link } from "react-router-dom";
import LogoIcon from "../assets/icons/logo-icon.svg";
import HomeIcon from "../assets/icons/home-icon.svg";
import CartIcon from "../assets/icons/cart-icon.svg";
import ContactIcon from "../assets/icons/contact-icon.svg";
import AccountIcon from "../assets/icons/account-icon.svg";
import Search from "./Search";
import { useCart } from "../context/CartContext";

const Header = ({ searchTerm = "", selectedCategory, setSearchTerm, setSelectedCategory }) => {
  const { cartCount } = useCart();
  return (
    <header className="header">
      <div className="logo">
        <img src={LogoIcon} alt="MiniMart" className="logo-icon" />
        <span className="logo-text">MiniMart</span>
      </div>

      <nav className="nav-links" aria-label="Main navigation">
        <Link to="/" className="nav-link">
          <img src={HomeIcon} alt="Home" className="logo-icon" />
          Home
        </Link>
        <Link to="/account" className="nav-link">
          <img src={AccountIcon} alt="Account" className="logo-icon" />
          Account
        </Link>
        <Link to="/cart" className="nav-link">
          <img src={CartIcon} alt="Cart" className="logo-icon" />
          Cart ({cartCount})
        </Link>
        <Link to="/contact" className="nav-link">
          <img src={ContactIcon} alt="Contact" className="logo-icon" />
          Contact
        </Link>
      </nav>

      <div>
        <Search
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          setSearchTerm={setSearchTerm}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </header>
  );
};

export default Header;
