import { useState } from 'react'
import { products } from './challenges/products'
import './App.css'

const priceFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('default')

  const categories = [...new Set(products.map(({ category }) => category))].sort()
  const visibleProducts = products
    .filter(({ name, category: productCategory }) => {
      const matchesSearch = name.toLowerCase().includes(search.trim().toLowerCase())
      const matchesCategory = category === 'All' || productCategory === category

      return matchesSearch && matchesCategory
    })
    .sort((first, second) => {
      if (sortBy === 'price-ascending') return first.price - second.price
      if (sortBy === 'price-descending') return second.price - first.price
      if (sortBy === 'rating-descending') return second.rating - first.rating
      return 0
    })
  const averagePrice =
    visibleProducts.length === 0
      ? null
      : visibleProducts.reduce((total, { price }) => total + price, 0) /
        visibleProducts.length

  function clearFilters() {
    setSearch('')
    setCategory('All')
    setSortBy('default')
  }

  return (
    <main className="catalog">
      <header className="catalog-header">
        <p className="eyebrow">THE EVERYDAY EDIT</p>
        <h1>Find your next favorite.</h1>
        <p className="intro">
          Thoughtful picks for your desk, your wardrobe, and your bookshelf.
        </p>
      </header>

      <section className="catalog-content" aria-label="Product catalog">
        <div className="toolbar">
          <label className="search-field">
            <span>Search products</span>
            <input
              type="search"
              placeholder="Try “keyboard”"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <label className="select-field">
            <span>Category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="All">All categories</option>
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="select-field">
            <span>Sort by</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="default">Featured</option>
              <option value="price-ascending">Price: low to high</option>
              <option value="price-descending">Price: high to low</option>
              <option value="rating-descending">Rating: high to low</option>
            </select>
          </label>

          <button className="clear-button" type="button" onClick={clearFilters}>
            Clear filters
          </button>
        </div>

        <div className="results-bar" aria-live="polite">
          <p>
            Showing <strong>{visibleProducts.length}</strong> of {products.length} products
          </p>
          <p className="average-price">
            Average price <strong>{averagePrice === null ? '—' : priceFormatter.format(averagePrice)}</strong>
          </p>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="product-grid">
            {visibleProducts.map(({ id, name, category: productCategory, price, rating }) => (
              <article className="product-card" key={id}>
                <div className="product-art" aria-hidden="true">
                  <span>{name.slice(0, 1)}</span>
                  <span className="art-index">{String(id).padStart(2, '0')}</span>
                </div>
                <div className="product-details">
                  <p className="product-category">{productCategory}</p>
                  <h2>{name}</h2>
                  <div className="product-meta">
                    <p className="product-price">{priceFormatter.format(price)}</p>
                    <p className="product-rating" aria-label={`Rated ${rating} out of 5`}>
                      <span aria-hidden="true">★</span> {rating.toFixed(1)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">⌕</span>
            <h2>No products found</h2>
            <p>Try a different search or clear your filters.</p>
            <button type="button" onClick={clearFilters}>
              Show all products
            </button>
          </div>
        )}
      </section>

      <footer className="catalog-footer">
        <span>CURATED FOR EVERY DAY</span>
        <span>01 — 08</span>
      </footer>
    </main>
  )
}

export default App
