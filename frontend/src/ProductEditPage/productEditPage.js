import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loading&Error/Loader";
import Message from "../components/Loading&Error/Message";
import FormContainer from "../components/Form/FormContainer";
import {
  listBookProductDetails,
  updateBookProduct,
} from "../actions/bookProductActions";
import { BOOKPRODUCT_UPDATE_RESET } from "../constants/bookProductsConstants";

function ProductEditPage() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState(new Date());
  const [publisher, setPublisher] = useState("");
  const [pages, setPages] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const bookProductDetails = useSelector((state) => state.bookProductDetails);
  const { error, loading, bookProduct } = bookProductDetails;

  const bookProductUpdate = useSelector((state) => state.bookProductUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = bookProductUpdate;

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BOOKPRODUCT_UPDATE_RESET });
      navigate("/admin/bookproductlist");
    } else {
      if (!bookProduct.title || bookProduct.id !== Number(id)) {
        dispatch(listBookProductDetails(id));
      } else {
        setTitle(bookProduct.title);
        setSubtitle(bookProduct.subtitle);
        setAuthor(bookProduct.author);
        setPublished(bookProduct.published);
        setPublisher(bookProduct.publisher);
        setPages(bookProduct.pages);
        setCategory(bookProduct.category);
        setDescription(bookProduct.description);
        setPrice(bookProduct.price);
        setCountInStock(bookProduct.countInStock);
        setImage(bookProduct.image);
      }
    }
  }, [dispatch, bookProduct, id, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateBookProduct({
        id: id,
        title,
        subtitle,
        author,
        published,
        publisher,
        pages,
        category,
        description,
        price,
        countInStock,
        image,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('image', file)
    formData.append('bookProduct_id', id)

    setUploading(true)

    try{
        const config = {
          headers:{
            'Content-Type':'multipart/form-data'
          }
        }

        const {data} = await axios.post('/api/book-product/upload/', formData, config)

        setImage(data)
        setUploading(false)
    }catch(error){
      setUploading(false)
    }
  };

  return (
    <div>
      {" "}
      <Link to="/admin/bookproductlist">Go Back</Link>
      <FormContainer>
        <h1>Edit Book Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="subtitle">
              <Form.Label>Subtitle</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="published">
              <Form.Label>Published</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter published"
                value={published}
                onChange={(e) => setPublished(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="publisher">
              <Form.Label>Publisher</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter publisher"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="pages">
              <Form.Label>Pages</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter pages"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter count in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

              <Form.Control
                type="file"
                onChange={uploadFileHandler}
              ></Form.Control>

              {uploading && <Loader />}
            </Form.Group>

            <Button className="mt-3" type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductEditPage;
