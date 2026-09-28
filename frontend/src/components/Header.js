
import { Link } from "react-router-dom";
import Search from "./Search";

export default function Header({ cartItems }) {

  return (
    <nav className="navbar row align-items-center">

      {/* Logo */}
      <div className="col-12 col-md-3 text-center text-md-left">
        <div className="navbar-brand">
          <Link to="/">
            <img
              className="img-fluid"
              src={process.env.PUBLIC_URL + "/images/logos.png"}
              alt="Logo"
            />
          </Link>
        </div>
      </div>


      {/* Search */}
      <div className="col-12 col-md-6 mt-3 mt-md-0">
        <Search />
      </div>


      {/* Cart */}
      <div className="col-12 col-md-3 mt-3 mt-md-0 text-center">

        <Link
          to="/cart"
          id="cart"
          className="ml-md-3"
        >
          Cart
        </Link>

        <span
          className="ml-1"
          id="cart_count"
        >
          {cartItems.length}
        </span>

      </div>

    </nav>
  );
}
