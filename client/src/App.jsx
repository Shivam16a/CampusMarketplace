import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AllItems from "./pages/AllItems";
import AddItem from "./pages/AddItem";
import ItemDetails from "./pages/ItemDetails";
import EditItem from "./pages/EditItem";
import SellerDashboard from "./pages/SellerDashboard";
import SellerRequests from "./pages/SellerRequests";
import BuyerRequests from "./pages/BuyerRequests";
import SellerDashboardforseller from "./pages/seller/SellerDashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import SellerDashboardforadmin from "./pages/seller/SellerDashboard";
import ErrorPage from "./components/Error/Error";
import SalesLineChart from "./pages/admin/SalesLineChart";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<AllItems />} />
        <Route element={<ProtectedRoute allowedRoles={["user", "seller"]} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-requests" element={<BuyerRequests />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["seller"]} />}>
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/edit-item/:id" element={<EditItem />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/seller-requests" element={<SellerRequests />} />
          <Route path="/sellerchart" element={<SellerDashboardforseller />} />
        </Route>
        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="linesales" element={<SalesLineChart />} />
            <Route path="sellerchart" element={<SellerDashboardforadmin />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;