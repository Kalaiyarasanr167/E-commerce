
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-3">

            <div className="card p-3 rounded h-100">

                <img
                    className="card-img-top mx-auto img-fluid product-card-image"
                    src={
                        process.env.PUBLIC_URL +
                        product.images?.[0]?.image
                    }
                    alt={product.name}
                />


                <div className="card-body d-flex flex-column">

                    <h5 className="card-title">
                        <Link to={"/product/" + product.id}>
                            {product.name}
                        </Link>
                    </h5>


                    <div className="ratings mt-auto">

                        <div className="rating-outer">

                            <div
                                className="rating-inner"
                                style={{
                                    width: `${((product.rating || 0) / 5) * 100}%`
                                }}
                            ></div>

                        </div>

                    </div>


                    <p className="card-text">
                        ₹{product.price}
                    </p>


                    <Link
                        to={"/product/" + product.id}
                        id="view_btn"
                        className="btn btn-block"
                    >
                        View Details
                    </Link>

                </div>

            </div>

        </div>
    );
}
