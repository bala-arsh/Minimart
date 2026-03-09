const CATEGORY_OPTIONS = [
  { value: "all", label: "All Products" },
  { value: "wearables", label: "Wearables" },
  { value: "accessories", label: "Accessories" },
  { value: "electronics", label: "Electronics" },
];

const Filter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="filter">
      <select
        name="cat"
        id="cat"
        value={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}
      >
        {CATEGORY_OPTIONS.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
