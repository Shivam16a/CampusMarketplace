import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const search = query.get("search");

  return (
    <div>
      <h3 className="mb-4">Latest Products</h3>

      {search && (
        <div className="alert alert-info">
          Showing results for: <strong>{search}</strong>
        </div>
      )}

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-3">
            <h5>Sample Product</h5>
            <p>Product description here...</p>
            <button className="btn btn-primary w-100">
              <i className="fa fa-eye me-1"></i>View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;