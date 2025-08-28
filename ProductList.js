import { useEffect, useState } from "react";

function ProductList() {
  const [products, setproducts] = useState([]);
  const [page, setPage] = useState(2);
  async function fetchProducts() {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    setproducts(data.products);
  }
  const handlePagination = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products);
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <span className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disabled"}
            onClick={() => handlePagination(page - 1)}
          >
            ⏮️
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => handlePagination(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={
              page < products.length / 10 ? "" : "pagination__disabled"
            }
            onClick={() => handlePagination(page + 1)}
          >
            ⏭️
          </span>
        </span>
      )}
    </div>
  );
}

export default ProductList;
