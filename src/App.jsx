import { Routes, Route } from "react-router-dom";
import { useCart } from "./context/CartContext";
import Home from "./pages/Home";
import Account from "./pages/Account";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import "./styles/cart.css";

function App() {
  const { cartNotice } = useCart();

  return (
    <>
      {cartNotice && <div className="cart-toast">{cartNotice}</div>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
