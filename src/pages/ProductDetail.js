import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams(); // Lấy id từ URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // Sử dụng cart context

  const getProduct = async () => {
    try {
      setLoading(true);
      const url = `https://dummyjson.com/products/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (loading) {
    return (
      <Container className="mt-4">
        <div>Loading...</div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="mt-4">
        <div>Product not found</div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          Contain
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{ width: "100%", height: "auto" }}
          />
        </Col>
        <Col md={6}>
          <h1>{product.title}</h1>
          <p className="text-muted">Category: {product.category}</p>
          <h2 className="text-primary">${product.price}</h2>
          <p className="text-success">
            Discount: {product.discountPercentage}%
          </p>
          <p>
            <strong>Brand:</strong> {product.brand}
          </p>
          <p>
            <strong>Rating:</strong> {product.rating}/5 ⭐
          </p>
          <p>
            <strong>Stock:</strong> {product.stock} items
          </p>

          <div className="mt-3">
            <h4>Description:</h4>
            <p>{product.description}</p>
          </div>

          <div className="mt-4">
            <Button
              variant="primary"
              size="lg"
              className="me-2"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </Button>
            <Button variant="outline-secondary" size="lg">
              Buy Now
            </Button>
          </div>
        </Col>
      </Row>

      {/* Product Images Gallery */}
      {product.images && product.images.length > 0 && (
        <Row className="mt-5">
          <Col>
            <h3>Product Images</h3>
            <Row>
              {product.images.map((image, index) => (
                <Col key={index} xs={6} md={3} className="mb-3">
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    style={{ width: "100%", height: "auto", cursor: "pointer" }}
                    onClick={() => window.open(image, "_blank")}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default ProductDetail;
