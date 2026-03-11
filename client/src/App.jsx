import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

//lazy loading page 
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const AllItems = lazy(() => import("./pages/AllItems"));
const AddItem = lazy(() => import("./pages/AddItem"));
const ItemDetails = lazy(() => import("./pages/ItemDetails"));
const EditItem = lazy(() => import("./pages/EditItem"));
const SellerDashboard = lazy(() => import("./pages/SellerDashboard"));
const SellerRequests = lazy(() => import("./pages/SellerRequests"));
const BuyerRequests = lazy(() => import("./pages/BuyerRequests"));
const SellerDashboardforseller = lazy(() => import("./pages/seller/SellerDashboard"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const ManageUsers = lazy(() => import("./pages/admin/ManageUsers"));
const SellerDashboardforadmin = lazy(() => import("./pages/seller/SellerDashboard"));
const ErrorPage = lazy(() => import("./components/Error/Error"));
const SalesLineChart = lazy(() => import("./pages/admin/SalesLineChart"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const Contact = lazy(() => import("./pages/Contact"));
const SendNotification = lazy(() => import("./components/SendNotification"));
const ManageContacts = lazy(() => import("./pages/admin/ManageContacts"));
const AdminFeedback = lazy(() => import("./pages/admin/AdminFeedback"));


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div className="loder"></div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<AllItems />} />
          <Route element={<ProtectedRoute allowedRoles={["user", "seller"]} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-requests" element={<BuyerRequests />} />
            <Route path="/item/:id" element={<ItemDetails />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["seller"]} />}>
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/edit-item/:id" element={<EditItem />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/seller-requests" element={<SellerRequests />} />
            <Route path="/sellerchart" element={<SellerDashboardforseller />} />
            <Route path="/send-notification" element={<SendNotification />} />
          </Route>
          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="contact" element={<ManageContacts />} />
              <Route path="linesales" element={<SalesLineChart />} />
              <Route path="sellerchart" element={<SellerDashboardforadmin />} />
              <Route path="feedback" element={<AdminFeedback />} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;