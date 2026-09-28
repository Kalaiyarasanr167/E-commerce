
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

export default function Cart({ cartItems, setCartItems }) {

    const [complete, setComplete] = useState(false);
    const [orderedItems, setOrderedItems] = useState([]);


    // Increase quantity
    const increaseQty = (id) => {

        const updatedCart = cartItems.map((item) => {

            if (item.product.id === id) {

                return {
                    ...item,
                    qty: item.qty + 1
                };

            }

            return item;

        });

        setCartItems(updatedCart);
    };


    // Decrease quantity
    const decreaseQty = (id) => {

        const updatedCart = cartItems.map((item) => {

            if (item.product.id === id && item.qty > 1) {

                return {
                    ...item,
                    qty: item.qty - 1
                };

            }

            return item;

        });

        setCartItems(updatedCart);
    };


    // Remove item
    const removeCartItem = (id) => {

        const updatedCart = cartItems.filter(
            (item) => item.product.id !== id
        );

        setCartItems(updatedCart);
    };


    // Place order
    const placeOrderHandler = () => {

        setOrderedItems(cartItems);

        setCartItems([]);

        setComplete(true);
    };


    // Total items
    const totalItems = cartItems.reduce(
        (total, item) => total + item.qty,
        0
    );


    // Subtotal
    const subtotal = cartItems.reduce(
        (total, item) =>
            total + Number(item.product.price) * item.qty,
        0
    );


    // Ordered total
    const orderedTotal = orderedItems.reduce(
        (total, item) =>
            total + Number(item.product.price) * item.qty,
        0
    );


    return (

        <div className="container container-fluid">

            {complete ? (

                /* =========================
                   ORDER COMPLETE
                ========================= */

                <div className="mt-5">

                    <div className="text-center">

                        <h2>
                            Order Complete
                        </h2>

                        <p>
                            Your order has been placed successfully!
                        </p>

                    </div>

                    <hr />

                    <h3 className="mt-4">
                        Ordered Items
                    </h3>


                    {orderedItems.map((item) => (

                        <Fragment key={item.product.id}>

                            <div className="cart-item mt-4">

                                <div className="row align-items-center">

                                    {/* Image */}

                                    <div className="col-12 col-sm-3 text-center">

                                        <img
                                            className="cart-product-image"
                                            src={
                                                process.env.PUBLIC_URL +
                                                item.product.images?.[0]?.image
                                            }
                                            alt={item.product.name}
                                        />

                                    </div>


                                    {/* Name */}

                                    <div className="col-12 col-sm-3 text-center text-sm-left mt-3 mt-sm-0">

                                        <h5>
                                            {item.product.name}
                                        </h5>

                                    </div>


                                    {/* Price */}

                                    <div className="col-12 col-sm-2 text-center mt-3 mt-sm-0">

                                        <p>
                                            Price: ₹
                                            {Number(
                                                item.product.price
                                            ).toFixed(2)}
                                        </p>

                                    </div>


                                    {/* Quantity */}

                                    <div className="col-12 col-sm-2 text-center mt-3 mt-sm-0">

                                        <p>
                                            Quantity: {item.qty}
                                        </p>

                                    </div>


                                    {/* Total */}

                                    <div className="col-12 col-sm-2 text-center mt-3 mt-sm-0">

                                        <p>
                                            Total: ₹
                                            {(
                                                Number(
                                                    item.product.price
                                                ) * item.qty
                                            ).toFixed(2)}
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <hr />

                        </Fragment>

                    ))}


                    <div className="text-center text-sm-right mt-4">

                        <h4>
                            Total Items:{" "}
                            {orderedItems.reduce(
                                (total, item) =>
                                    total + item.qty,
                                0
                            )}
                        </h4>

                        <h3>
                            Order Total: ₹
                            {orderedTotal.toFixed(2)}
                        </h3>

                    </div>


                    <div className="text-center mt-4">

                        <Link
                            to="/"
                            className="btn btn-primary"
                        >
                            Continue Shopping
                        </Link>

                    </div>

                </div>

            ) : (

                /* =========================
                   CART
                ========================= */

                <>

                    <h2 className="mt-5">
                        Your Cart:{" "}
                        <b>{totalItems} items</b>
                    </h2>


                    <div className="row d-flex justify-content-between">

                        {/* Cart Items */}

                        <div className="col-12 col-lg-8">

                            {cartItems.length === 0 ? (

                                <h3 className="mt-5 text-center">
                                    Your cart is Empty!
                                </h3>

                            ) : (

                                cartItems.map((item) => (

                                    <Fragment
                                        key={item.product.id}
                                    >

                                        <hr />


                                        <div className="cart-item responsive-cart-item">

                                            <div className="row align-items-center">

                                                {/* Product Image */}

                                                <div className="col-12 col-sm-3 text-center">

                                                    <img
                                                        className="cart-product-image"
                                                        src={
                                                            process.env.PUBLIC_URL +
                                                            item.product.images?.[0]?.image
                                                        }
                                                        alt={item.product.name}
                                                    />

                                                </div>


                                                {/* Product Name */}

                                                <div className="col-12 col-sm-3 text-center text-sm-left mt-3 mt-sm-0">

                                                    <Link
                                                        to={
                                                            "/product/" +
                                                            item.product.id
                                                        }
                                                        className="cart-product-name"
                                                    >
                                                        {item.product.name}
                                                    </Link>

                                                </div>


                                                {/* Price */}

                                                <div className="col-12 col-sm-2 text-center mt-3 mt-sm-0">

                                                    <p id="card_item_price">

                                                        ₹
                                                        {Number(
                                                            item.product.price
                                                        ).toFixed(2)}

                                                    </p>

                                                </div>


                                                {/* Quantity */}

                                                <div className="col-12 col-sm-3 text-center mt-3 mt-sm-0">

                                                    <div className="stockCounter cart-stock-counter">

                                                        <button
                                                            className="btn btn-danger minus"
                                                            onClick={() =>
                                                                decreaseQty(
                                                                    item.product.id
                                                                )
                                                            }
                                                            disabled={
                                                                item.qty === 1
                                                            }
                                                        >
                                                            -
                                                        </button>


                                                        <input
                                                            type="number"
                                                            className="form-control count"
                                                            value={item.qty}
                                                            readOnly
                                                        />


                                                        <button
                                                            className="btn btn-primary plus"
                                                            onClick={() =>
                                                                increaseQty(
                                                                    item.product.id
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </button>

                                                    </div>

                                                </div>


                                                {/* Delete */}

                                                <div className="col-12 col-sm-1 text-center mt-3 mt-sm-0">

                                                    <button
                                                        id="delete_cart_item"
                                                        className="btn btn-danger"
                                                        onClick={() =>
                                                            removeCartItem(
                                                                item.product.id
                                                            )
                                                        }
                                                        title="Remove from cart"
                                                    >
                                                        🗑️
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </Fragment>

                                ))

                            )}

                        </div>


                        {/* Order Summary */}

                        <div className="col-12 col-lg-3 my-4">

                            <div id="order_summary">

                                <h4>
                                    Order Summary
                                </h4>

                                <hr />


                                <p>

                                    Subtotal:

                                    <span className="order-summary-values">
                                        {totalItems} (Units)
                                    </span>

                                </p>


                                <p>

                                    Est. total:

                                    <span className="order-summary-values">
                                        ₹{subtotal.toFixed(2)}
                                    </span>

                                </p>


                                <hr />


                                <button
                                    id="checkout_btn"
                                    className="btn btn-primary btn-block"
                                    disabled={
                                        cartItems.length === 0
                                    }
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </button>

                            </div>

                        </div>

                    </div>

                </>

            )}

        </div>
    );
}
