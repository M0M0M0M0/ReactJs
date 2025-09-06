import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import Category from "../pages/Category";
import { useCart } from "../context/CartContext";

function NavbarComponent() {
  const [categories, setCategories] = useState([]);
  const { totalItems } = useCart();

  const getCategories = async () => {
    const res = await fetch("https://dummyjson.com/product/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <ul>
      {categories.map((e, i) => {
        return (
          <li key={i}>
            <Link to={"/category/" + e.slug}>{e.name}</Link>
          </li>
        );
      })}

      <li>
        <Link to="/cart">
          Cart
          {totalItems > 0 && (
            <Badge bg="danger" className="ms-1">
              {totalItems}
            </Badge>
          )}
        </Link>
      </li>
      <li>
        <Link to="/forecast">Forecast</Link>
      </li>
    </ul>
  );
}

export default NavbarComponent;
