import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import NavbarComponent from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <NavbarComponent />

      <main>
        <div className="container">
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/Category" element={<Category />} />
            <Route path="/Cart" element={<Cart />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
