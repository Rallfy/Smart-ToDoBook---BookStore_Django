import React from "react";
import { Card } from "react-bootstrap";
import Rating from '../Rating/Rating';
import './style.css';
import { Link } from "react-router-dom";

function Book({ book }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/book-product/${book.id}`}>
        <Card.Img src={book.image} />
      </Link>

      <Card.Body>
        <Link to={`/book-product/${book.id}`}>
          <Card.Title as="div">
            <strong>
            <h4>{book.title}</h4>
            </strong>
          </Card.Title>
        </Link>
      </Card.Body>

      <Card.Text as="div">
        <div className="my-3">
          <Rating value={book.rating}  text={`${book.rating} from ${book.numReviews} reviews`} color={"#fef08a"}/>
        </div>
      </Card.Text>

      <Card.Text as="h3" className="card-text ">
          ${book.price}
      </Card.Text>
    </Card>
  );
}

export default Book;
