import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register"
import './App.css';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="*" element={<h1>404 not found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
