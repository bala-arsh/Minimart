import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Filter from "./Filter";

const Search = ({
  searchTerm = "",
  selectedCategory = "all",
  setSearchTerm = () => {},
  setSelectedCategory,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const buildCatalogUrl = (nextSearchTerm, nextCategory) => {
    const params = new URLSearchParams();

    if (nextSearchTerm.trim()) {
      params.set("q", nextSearchTerm.trim());
    }

    if (nextCategory && nextCategory !== "all") {
      params.set("category", nextCategory);
    }

    const queryString = params.toString();
    return queryString ? `/?${queryString}` : "/";
  };

  const handleSearchChange = (event) => {
    const nextSearchTerm = event.target.value;
    setLocalSearchTerm(nextSearchTerm);

    if (location.pathname === "/") {
      setSearchTerm(nextSearchTerm);
    }
  };

  const handleCategoryChange = (nextCategory) => {
    if (setSelectedCategory) {
      setSelectedCategory(nextCategory);
    }

    if (location.pathname !== "/") {
      navigate(buildCatalogUrl(localSearchTerm, nextCategory));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(buildCatalogUrl(localSearchTerm, selectedCategory));
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <Filter selectedCategory={selectedCategory} setSelectedCategory={handleCategoryChange} />
      <input
        type="text"
        name="search"
        placeholder="Search MiniMart"
        className="search-input"
        aria-label="Search products"
        value={localSearchTerm}
        onChange={handleSearchChange}
      />
      <button type="submit" className="search-button" aria-label="Search">
        Search
      </button>
    </form>
  );
};

export default Search;
