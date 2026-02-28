import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [keyword, setKeyword] = useState("");

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?search=${keyword}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">

        <Link className="navbar-brand fw-bold text-primary" to="/">
          <i className="fa fa-refresh me-2"></i>CampusMart
        </Link>

        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">

          {/* 🔍 SEARCH BOX */}
          {user?.isAdmin && (
            <form className="d-flex mx-auto w-50" onSubmit={searchHandler}>
              <input
                type="text"
                className="form-control me-2"
                placeholder="Admin Search..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button className="btn btn-outline-primary">
                <i className="fa fa-search"></i>
              </button>
            </form>
          )}

          <ul className="navbar-nav ms-auto">

            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    <i className="fa fa-user me-1"></i>Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/my-requests" className="nav-link">
                    My Requests
                  </Link>
                </li>
                {user?.role === "seller" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/seller-dashboard">
                      Seller Panel
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button className="btn btn-outline-danger ms-2" onClick={logoutHandler}>
                    <i className="fa fa-sign-out"></i>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fa fa-sign-in me-1"></i>Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <i className="fa fa-user-plus me-1"></i>Register
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;