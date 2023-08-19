import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "../Loading&Error/Loader";
import Message from "../Loading&Error/Message";
import { listTopBookProducts } from "../../actions/bookProductActions";


function ProductCarousel() {
    const dispatch = useDispatch()

    const bookProductTopRated = useSelector(state => state.bookProductTopRated)
    const { error, loading, bookProducts } = bookProductTopRated

    useEffect(() => {
        dispatch(listTopBookProducts())
    }, [dispatch])

    return (loading ? <Loader />
        : error
            ? <Message variant='danger'>{error}</Message>
            : (
                <Carousel pause='hover'>
                    {bookProducts.map(bookProducts => (
                        <Carousel.Item key={bookProducts.id}>
                            <Link to={`/book-product/${bookProducts.id}`}>
                                <Image src={bookProducts.image} alt={bookProducts.title} fluid />
                                <Carousel.Caption>
                                    <h4>{bookProducts.title} (${bookProducts.price})</h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )

    )
}

export default ProductCarousel