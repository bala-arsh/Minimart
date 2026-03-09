import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import products from "../data/products";
import "../styles/home.css";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOrder, setSortOrder] = useState("featured");
  const selectedCategory = searchParams.get("category") ?? "all";
  const searchTerm = searchParams.get("q") ?? "";

  const updateCatalogParams = ({ nextCategory = selectedCategory, nextSearchTerm = searchTerm }) => {
    const nextParams = new URLSearchParams();

    if (nextCategory !== "all") {
      nextParams.set("category", nextCategory);
    }

    if (nextSearchTerm.trim()) {
      nextParams.set("q", nextSearchTerm.trim());
    }

    setSearchParams(nextParams);
  };

  const handleCategoryChange = (nextCategory) => {
    updateCatalogParams({ nextCategory });
  };

  const handleSearchTermChange = (nextSearchTerm) => updateCatalogParams({ nextSearchTerm });

  const visibleProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filteredProducts = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category.toLowerCase() === selectedCategory;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.title.toLowerCase().includes(normalizedSearch) ||
        product.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

      return matchesCategory && matchesSearch;
    });

    if (sortOrder === "price-low") {
      return [...filteredProducts].sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "price-high") {
      return [...filteredProducts].sort((a, b) => b.price - a.price);
    }

    if (sortOrder === "rating") {
      return [...filteredProducts].sort((a, b) => b.rating - a.rating);
    }

    return filteredProducts;
  }, [searchTerm, selectedCategory, sortOrder]);

  return (
    <div className="page-shell">
      <Header
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        setSearchTerm={handleSearchTermChange}
        setSelectedCategory={handleCategoryChange}
      />
      <main className="container home-page">
        <section className="home-hero">
          <div>
            <p className="eyebrow">Catalog</p>
            <h1>Browse all products</h1>
            <p className="hero-copy">
              Filter by category, search by keyword, and move products straight into cart.
            </p>
          </div>
          <div className="home-controls">
            <input
              type="text"
              className="catalog-search"
              placeholder="Search by name or tag"
              value={searchTerm}
              onChange={(event) => handleSearchTermChange(event.target.value)}
            />
            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} className="catalog-sort">
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </section>

        <section className="results-bar" aria-label="Catalog summary">
          <p>{visibleProducts.length} products available</p>
          <p>Category: {selectedCategory === "all" ? "All" : selectedCategory}</p>
        </section>

        {visibleProducts.length > 0 ? (
          <ProductGrid products={visibleProducts} />
        ) : (
          <section className="empty-state">
            <h2>No products match the current filters.</h2>
            <p>Try a different category or search term.</p>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
