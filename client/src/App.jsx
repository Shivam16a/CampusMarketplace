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


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container my-4">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<AllItems/>}/>
          <Route path="/add-item" element={<AddItem/>}/>
          <Route path="/my-listings" element={<MyListings/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;