import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, Suspense, lazy } from "react";
import "../styles/Navbar.css";

const NotificationBell = lazy(() => import("./NotificationBell"));

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
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

  const [search, setSearch] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("search") || "";
  });

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">

        <NavLink className="navbar-brand fw-bold text-primary" to="/">
          <img src="/vite.svg" alt="campusmart" width={40} /> CampusMart
        </NavLink>

        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">

          {user?.isAdmin && (
            <form className="d-flex mx-auto w-50" onSubmit={searchHandler}>
              <input
                type="text"
                className="form-control me-2"
                placeholder="Admin Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-outline-primary" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
          )}

          <ul className="navbar-nav ms-auto">

            {user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/profile" className="nav-link">
                    <i className="fa fa-user me-1"></i>Profile
                  </NavLink>
                </li>

                <li className="nav-item">
                  <Suspense fallback={<span className="nav-link">...</span>}>
                    <NotificationBell />
                  </Suspense>
                </li>

                {user?.role !== "seller" && (
                  <>
                    <li className="nav-item">
                      <NavLink to="/my-requests" className="nav-link">
                        <i className="fas fa-shopping-cart me-1"></i> My order
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/help" className="nav-link">
                        <i className="fas fa-hands-helping me-1"></i> Help
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/contact" className="nav-link">
                        <i className="fas fa-id-card me-1"></i> Contact
                      </NavLink>
                    </li>
                  </>
                )}

                {user?.isAdmin && (
                  <>
                    <li className="nav-item">
                      <NavLink to="/admin" className="nav-link">
                        <i className="fas fa-user-shield"></i> Admin
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/send-notification" className="nav-link">
                        <i className="fa fa-bell me-1"></i> Send Notification
                      </NavLink>
                    </li>
                  </>
                )}

                {user?.role === "seller" && (
                  <>
                    <li className="nav-item">
                      <NavLink to="/seller-dashboard" className="nav-link">
                        <i className="fas fa-signal"></i> Product Status
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/sellerchart" className="nav-link">
                        <i className="fas fa-chart-line"></i> Analytic
                      </NavLink>
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
                  <NavLink to="/login" className="nav-link">
                    <i className="fa fa-sign-in me-1"></i>Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    <i className="fa fa-user-plus me-1"></i>Register
                  </NavLink>
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