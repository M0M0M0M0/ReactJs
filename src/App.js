import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import NavbarComponent from "./components/NavComponent";
import Forecast from "./pages/Forecast";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter basename="/ReactJs">
        <div className="App">
          <NavbarComponent />
          <main>
            <div className="container">
              <Routes>
                <Route path="/" Component={Home} />
                <Route path="/category/:slug" element={<Category />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/forecast" element={<Forecast />} />
              </Routes>
            </div>
          </main>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
