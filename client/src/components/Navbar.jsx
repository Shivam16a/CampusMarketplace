import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotificationBell from "./NotificationBell"

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [search, setSearch] = useState("");
  const location = useLocation();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/admin/users?search=${search}`);
    } else {
      navigate("/admin/users");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get("search") || "";
    setSearch(keyword);
  }, [location.search]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">

        <Link className="navbar-brand fw-bold text-primary" to="/">
          <img src="/vite.svg" alt="campusmart" width={40} /> CampusMart
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-outline-primary" onClick={searchHandler}>
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
                  <NotificationBell />
                </li>
                {user?.role !== "seller" && (
                  <>
                    <li className="nav-item">
                      <Link to="/my-requests" className="nav-link">
                        <i className="fas fa-shopping-cart me-1"></i> My order
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/help" className="nav-link">
                        <i className="fas fa-hands-helping me-1"></i>
                        Help
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/contact">
                        <i className="fas fa-id-card me-1"></i>
                        Contact
                      </Link>
                    </li>
                  </>
                )}
                {user?.isAdmin && (<>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      <i className="fas fa-user-shield"></i> Admin
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/send-notification">
                      <i className="fa fa-bell me-1"></i>
                      Send Notification
                    </Link>
                  </li>
                </>)}
                {user?.role === "seller" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/seller-dashboard">
                        <i className="fas fa-signal"></i> Product Status
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/sellerchart">
                        <i className="fas fa-chart-line"></i> Analytic
                      </Link>
                    </li>
                  </>
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