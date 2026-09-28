
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail({ cartItems, setCartItems }) {

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  const { id } = useParams();

  useEffect(() => {

    fetch(process.env.PUBLIC_URL + "/mockData.json")
      .then(res => res.json())
      .then(data => {

        const selectedProduct = data.find(
          product => String(product.id) === String(id)
        );

        setProduct(selectedProduct);

      })
      .catch(error => {
        console.error("Product fetch error:", error);
      });

  }, [id]);


  function increaseQty() {

    if (product && qty < product.stock) {
      setQty(qty + 1);
    }

  }


  function decreaseQty() {

    if (qty > 1) {
      setQty(qty - 1);
    }

  }


  function addToCart() {

    const itemExists = cartItems.find(
      item => item.product.id === product.id
    );

    if (!itemExists) {

      const newItem = {
        product,
        qty
      };

      setCartItems(state => [...state, newItem]);

    } else {

      setCartItems(state =>
        state.map(item =>
          item.product.id === product.id
            ? {
                ...item,
                qty: item.qty + qty
              }
            : item
        )
      );

    }

  }


  if (!product) {
    return (
      <h2 className="text-center mt-5">
        Loading...
      </h2>
    );
  }


  return (

    <div className="container product-detail-container">

      <div className="row align-items-center justify-content-center">

        {/* PRODUCT IMAGE */}

        <div
          className="col-12 col-md-6 col-lg-5 text-center"
          id="product_image"
        >

          <img
            className="img-fluid product-detail-image"
            src={
              process.env.PUBLIC_URL +
              product.images?.[0]?.image
            }
            alt={product.name}
          />

        </div>


        {/* PRODUCT DETAILS */}

        <div className="col-12 col-md-6 col-lg-5 product-detail-info">

          <h3 className="product-detail-title">
            {product.name}
          </h3>


          <p id="product_id">
            Product # {product.id}
          </p>


          <hr />


          {/* Rating */}

          <div className="rating-outer">

            <div
              className="rating-inner"
              style={{
                width: `${((product.rating || 0) / 5) * 100}%`
              }}
            ></div>

          </div>


          <hr />


          {/* Price */}

          <p id="product_price">
            ₹{product.price}
          </p>


          {/* Quantity + Cart */}

          <div className="product-actions">

            <div className="stockCounter">

              <button
                type="button"
                className="btn btn-danger minus"
                onClick={decreaseQty}
                disabled={qty === 1}
              >
                -
              </button>


              <input
                type="number"
                className="form-control count"
                value={qty}
                readOnly
              />


              <button
                type="button"
                className="btn btn-primary plus"
                onClick={increaseQty}
                disabled={product.stock === 0 || qty >= product.stock}
              >
                +
              </button>

            </div>


            <button
              type="button"
              onClick={addToCart}
              id="cart_btn"
              className="btn btn-primary add-cart-btn"
              disabled={product.stock === 0}
            >
              Add to Cart
            </button>

          </div>


          <hr />


          {/* Stock */}

          <p>

            Status:{" "}

            <span
              id="stock_status"
              className={
                product.stock > 0
                  ? "text-success"
                  : "text-danger"
              }
            >
              {product.stock > 0
                ? "In Stock"
                : "Out of Stock"}
            </span>

          </p>


          <hr />


          {/* Description */}

          <h4 className="mt-2">
            Description:
          </h4>


          <p className="product-description">
            {product.description}
          </p>


          <hr />


          {/* Seller */}

          <p
            id="product_seller"
            className="mb-3"
          >
            Sold by:{" "}
            <strong>
              {product.seller}
            </strong>
          </p>

        </div>

      </div>

    </div>
  );
}
