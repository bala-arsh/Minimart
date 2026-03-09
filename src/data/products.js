import headphoneImg from "../assets/pdt_img/optimized/headphone.png";
import smartwatchImg from "../assets/pdt_img/optimized/smartwatch.png";
import mouseImg from "../assets/pdt_img/optimized/mouse.png";
import speakerImg from "../assets/pdt_img/optimized/speaker.png";
import keyboardImg from "../assets/pdt_img/optimized/keyboard.png";
import powerbankImg from "../assets/pdt_img/optimized/powerbank.png";
import earphoneImg from "../assets/pdt_img/optimized/earphone.png";
import smartbandImg from "../assets/pdt_img/optimized/smartband.png";

const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    category: "electronics",
    price: 1999,
    discount: 0,
    rating: 4.5,
    stock: 13,
    description: "High-quality wireless headphones with noise isolation and 20-hour battery life.",
    tags: ["audio", "wireless", "music"],
    createdAt: "2026-01-05",
    image: headphoneImg
  },
  {
    id: 2,
    title: "Smart Watch",
    category: "wearables",
    price: 2999,
    discount: 40,
    rating: 4.7,
    stock: 20,
    description: "Feature-rich smartwatch with heart-rate monitoring, fitness tracking, and app notifications.",
    tags: ["smartwatch", "fitness", "wearable"],
    createdAt: "2026-01-02",
    image: smartwatchImg
  },
  {
    id: 3,
    title: "Gaming Mouse",
    price: 899,
    discount: 0,
    category: "accessories",
    rating: 4.7,
    stock: 20,
    description: "Ergonomic gaming mouse with RGB lighting and adjustable DPI settings.",
    tags: ["gaming", "mouse", "rgb"],
    createdAt: "2026-01-02",
    image: mouseImg
  },
  {
    id: 4,
    title: "Bluetooth Speaker",
    price: 2499,
    discount: 35,
    category: "accessories",
    rating: 4.1,
    stock: 25,
    description: "Portable Bluetooth speaker with deep bass, clear sound, and long battery backup.",
    tags: ["speaker", "bluetooth", "audio"],
    createdAt: "2026-01-08",
    image: speakerImg
  },
  {
    id: 5,
    title: "Wireless Keyboard",
    price: 1499,
    discount: 0,
    category: "accessories",
    rating: 4.8,
    stock: 10,
    description: "Mechanical keyboard with blue switches and customizable RGB lighting.",
    tags: ["keyboard", "gaming", "mechanical"],
    createdAt: "2026-01-01",
    image: keyboardImg
  },
  {
    id: 6,
    title: "Power Bank",
    price: 2199,
    discount: 0,
    category: "accessories",
    rating: 4.1,
    stock: 0,
    description: "High-capacity power bank with fast charging and dual USB output.",
    tags: ["powerbank", "charging", "portable"],
    createdAt: "2026-01-08",
    image: powerbankImg
  },
  {
    id: 7,
    title: "Wireless Earphones",
    price: 1499,
    discount: 15,
    category: "electronics",
    rating: 4.6,
    stock: 14,
    description: "True wireless earbuds with active noise cancellation and fast charging.",
    tags: ["earbuds", "wireless", "audio"],
    createdAt: "2026-01-18",
    image: earphoneImg
  },
  {
    id: 8,
    title: "Fitness Band",
    price: 999,
    discount: 0,
    category: "wearables",
    rating: 4.0,
    stock: 18,
    description: "Lightweight fitness band with sleep tracking and step counter.",
    tags: ["fitness", "band", "health"],
    createdAt: "2026-01-15",
    image: smartbandImg
  }
];

export default products;
