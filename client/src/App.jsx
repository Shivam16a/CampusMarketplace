import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AllItems from "./pages/AllItems";
import AddItem from "./pages/AddItem";
import MyListings from "./pages/MyListings";
import ItemDetails from "./pages/ItemDetails";
import EditItem from "./pages/EditItem";
import SellerDashboard from "./pages/SellerDashboard";
import SellerRequests from "./pages/SellerRequests";
import BuyerRequests from "./pages/BuyerRequests";
import SellerDashboardforseller from "./pages/seller/SellerDashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container my-4">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<AllItems />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/edit-item/:id" element={<EditItem />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/seller-requests" element={<SellerRequests />} />
          <Route path="/my-requests" element={<BuyerRequests />} />
          <Route path="/sellerchart" element={<SellerDashboardforseller />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;