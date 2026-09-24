
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

export default function Cart({ cartItems, setCartItems }) {

    const [complete, setComplete] = useState(false);
    const [orderedItems, setOrderedItems] = useState([]);

    const increaseQty = (id) => {

        const updatedCart = cartItems.map((item) => {

            if (item.product._id === id) {

                return {
                    ...item,
                    qty: item.qty + 1
                };

            }

            return item;

        });

        setCartItems(updatedCart);
    };

    const decreaseQty = (id) => {

        const updatedCart = cartItems.map((item) => {

            if (item.product._id === id && item.qty > 1) {

                return {
                    ...item,
                    qty: item.qty - 1
                };

            }

            return item;

        });

        setCartItems(updatedCart);
    };

    const removeCartItem = (id) => {

        const updatedCart = cartItems.filter(
            (item) => item.product._id !== id
        );

        setCartItems(updatedCart);
    };

    const placeOrderHandler = () => {

        setOrderedItems(cartItems);

        setCartItems([]);

        setComplete(true);
    };

    const totalItems = cartItems.reduce(
        (total, item) => total + item.qty,
        0
    );

    const subtotal = cartItems.reduce(
        (total, item) =>
            total + Number(item.product.price) * item.qty,
        0
    );

    const orderedTotal = orderedItems.reduce(
        (total, item) =>
            total + Number(item.product.price) * item.qty,
        0
    );

    return (

        <div className="container container-fluid">

            {complete ? (

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

                        <Fragment key={item.product._id}>

                            <div className="cart-item mt-4">

                                <div className="row align-items-center">

                                    <div className="col-3">

                                        <img
                                            src={item.product.images?.[0]?.image}
                                            alt={item.product.name}
                                            height="90"
                                            width="115"
                                        />

                                    </div>

                                    <div className="col-3">

                                        <h5>
                                            {item.product.name}
                                        </h5>

                                    </div>

                                    <div className="col-2">

                                        <p>
                                            Price:
                                            $
                                            {Number(
                                                item.product.price
                                            ).toFixed(2)}
                                        </p>

                                    </div>

                                    <div className="col-2">

                                        <p>
                                            Quantity:
                                            {item.qty}
                                        </p>

                                    </div>

                                    <div className="col-2">

                                        <p>
                                            Total:
                                            $
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

                    <div className="text-end mt-4">

                        <h4>
                            Total Items: {orderedItems.reduce(
                                (total, item) => total + item.qty,
                                0
                            )}
                        </h4>

                        <h3>
                            Order Total: ${orderedTotal.toFixed(2)}
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

                <>

                    <h2 className="mt-5">
                        Your Cart: <b>{totalItems} items</b>
                    </h2>

                    <div className="row d-flex justify-content-between">

                        <div className="col-12 col-lg-8">

                            {cartItems.length === 0 ? (

                                <h3 className="mt-5">
                                    Your cart is Empty!
                                </h3>

                            ) : (

                                cartItems.map((item) => (

                                    <Fragment
                                        key={item.product._id}
                                    >

                                        <hr />

                                        <div className="cart-item">

                                            <div className="row">

                                                <div className="col-4 col-lg-3">

                                                    <img
                                                        src={item.product.images?.[0]?.image}
                                                        alt={item.product.name}
                                                        height="90"
                                                        width="115"
                                                    />

                                                </div>

                                                <div className="col-5 col-lg-3">

                                                    <Link
                                                        to={
                                                            "/product/" +
                                                            item.product._id
                                                        }
                                                    >
                                                        {item.product.name}
                                                    </Link>

                                                </div>

                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">

                                                    <p id="card_item_price">

                                                        $
                                                        {Number(
                                                            item.product.price
                                                        ).toFixed(2)}

                                                    </p>

                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">

                                                    <div className="stockCounter d-inline">

                                                        <button
                                                            className="btn btn-danger minus"
                                                            onClick={() =>
                                                                decreaseQty(
                                                                    item.product._id
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
                                                            className="form-control count d-inline"
                                                            value={item.qty}
                                                            readOnly
                                                        />

                                                        <button
                                                            className="btn btn-primary plus"
                                                            onClick={() =>
                                                                increaseQty(
                                                                    item.product._id
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </button>

                                                    </div>

                                                </div>

                                                <div className="col-4 col-lg-1 mt-4 mt-lg-0">

                                                    <button
                                                        id="delete_cart_item"
                                                        className="btn btn-danger"
                                                        onClick={() =>
                                                            removeCartItem(
                                                                item.product._id
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
                                        ${subtotal.toFixed(2)}
                                    </span>
                                </p>

                                <hr />

                                <button
                                    id="checkout_btn"
                                    className="btn btn-primary btn-block"
                                    disabled={
                                        cartItems.length === 0
                                    }
                                    onClick={
                                        placeOrderHandler
                                    }
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
