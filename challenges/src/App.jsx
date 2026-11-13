import { useState} from "react";
import {products} from "./challenges/products";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

const categories = [
  "All",
  ...new Set(products.map(({ category }) => category))
];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
                            .toLowerCase()
                            .includes(search.toLowerCase());
    const matchesCategory = 
                          category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low"){
      return a.price - b.price;
    }
    if (sort === "high"){
      return b.price - a.price;
    }
    if (sort === "rating"){
      return b.rating - a.rating; 
    }

    return 0;
  });

  const averagePrice = sortedProducts.length
                      ? sortedProducts.reduce(
                        (total, product) => total + product.price,
                        0) / sortedProducts.length
                      : 0;

  return (
    <div className="container">
      <h1> Product Filter & Sort</h1>
      
      <div className="controls">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Default sorting</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Rating: High to Low</option>
        </select>

        <button onClick={() => {
          setSearch("");
          setCategory("All");
          setSort("");
        }}>
          Clear Filters
        </button>

      </div>

      <p>
        Showing {sortedProducts.length} of {products.length} products
      </p>

      <p>
        Average Price: ₹{averagePrice.toFixed(2)}
      </p>

      <div className="product-grid">

        {sortedProducts.length === 0 ? (

          <p>No products found!</p>

        ) : (

          sortedProducts.map((product) => (
            <div className="product-card" key={product.id}>

              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <p>₹{product.price}</p>
              <p>⭐ {product.rating}</p>

            </div>
          ))

        )}

      </div>

    </div>
  );
}

export default App;