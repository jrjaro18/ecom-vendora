import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Search from "./pages/Search";
import Product from "./pages/Product";
import Seller from "./pages/Seller";
import Cart from "./pages/Cart";
import History from "./pages/History";
import GoogleUser from "./pages/GoogleUser";
import './App.css';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/google-user" element={<GoogleUser/>} />
          <Route path="/sample-search" element={<Search/>} />
          <Route path="/sample-product" element={<Product/>} />
          <Route path="/sample-seller" element={<Seller/>} />
          <Route path="/sample-cart" element={<Cart/>} />
          <Route path="/sample-history" element={<History/>} />
          <Route path="*" element={<h1>404 not found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
