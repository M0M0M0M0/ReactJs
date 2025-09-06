import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Category() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const url = `https://dummyjson.com/product/category/${slug}`;
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data.products);
  };
  useEffect(() => {
    getProducts();
  }, [slug]);
  return (
    <div>
      <h1>Category Page: {slug}</h1>
      <Container>
        <Row>
          {products.map((e, i) => {
            return (
              <Col key={i} xs={3} className="mb-3">
                <Card>
                  <Card.Img src={e.thumbnail} />
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/product/${e.id}`}>{e.title}</Link>
                    </Card.Title>
                    <Card.Text>${e.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
export default Category;
