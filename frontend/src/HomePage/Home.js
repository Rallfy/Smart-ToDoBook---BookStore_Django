import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Book from "../components/Book/Book";

import { useDispatch, useSelector } from "react-redux";
import { listBookProduct } from "../actions/bookProductActions";

import Loader from "../components/Loading&Error/Loader";
import Message from "../components/Loading&Error/Message";
import { useLocation } from "react-router-dom";

import ProductCarousel from "../components/ProductCarusel/ProductCarusel";

function Home() {
  const dispatch = useDispatch();
  const location = useLocation();

  const bookProductList = useSelector((state) => state.bookProductList);
  const { error, loading, bookProducts } = bookProductList;

  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  useEffect(() => {
    dispatch(listBookProduct(keyword || ""));
  }, [dispatch]);

  return (
    <div>
      {!keyword && <ProductCarousel />}
      {keyword && <h1 className="mt-3">Latest Books</h1>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {bookProducts && bookProducts.length > 0 ? (
              bookProducts.map((book) => (
                <Col key={book.id} sm={12} md={6} lg={5} xl={3}>
                  <Book book={book} />
                </Col>
              ))
            ) : (
              <Message>No books found.</Message>
            )}
          </Row>
        </div>
      )}
    </div>
  );
}

export default Home;








