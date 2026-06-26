import { useState } from "react";
import Link from "next/link";

export default function Home({ products }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    setLoading(true);
    setSearch(e.target.value);

    setTimeout(() => {
      setLoading(false);
    }, 400);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Product Listing</h2>

      <div className="row justify-content-center mb-4">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <div className="row">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            >
              <div className="card h-100 shadow-sm">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="card-img-top p-3"
                  style={{
                    height: "220px",
                    objectFit: "contain",
                  }}
                />

                <div className="card-body d-flex flex-column">
                  <h6
                    className="card-title"
                    style={{ minHeight: "60px" }}
                  >
                    {product.title}
                  </h6>

                  <h5 className="text-success">
                    ${product.price}
                  </h5>

                  <p className="text-muted">
                    {product.category}
                  </p>

                  <p>
                    ⭐ {product.rating}
                  </p>

                  <Link
                    href={`/product/${product.id}`}
                    className="btn btn-primary mt-auto"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    return {
      props: {
        products: data.products,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        products: [],
      },
    };
  }
}