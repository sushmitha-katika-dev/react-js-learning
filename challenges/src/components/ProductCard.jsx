function ProductCard({ product }) {
  const { name, category, price, rating } = product;

  return (
    <div className="product-card">
      <h3>{name}</h3>
      <image src={product.image} alt={name} />
      <p>Category: {category}</p>

      <h4>₹{price.toLocaleString("en-IN")}</h4>

      <p>⭐ {rating}</p>
    </div>
  );
}

export default ProductCard;