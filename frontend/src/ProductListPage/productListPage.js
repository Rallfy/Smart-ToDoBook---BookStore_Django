import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loading&Error/Loader";
import Message from "../components/Loading&Error/Message";
// import Paginate from "../components/Paginate";
import {
  listBookProduct,
  deleteBookProduct,
  createBookProduct,
} from "../actions/bookProductActions";
import { BOOKPRODUCT_CREATE_RESET } from "../constants/bookProductsConstants";

function ProductListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  const bookProductList = useSelector((state) => state.bookProductList);
  const { loading, error, bookProducts} = bookProductList;

  const bookProductDelete = useSelector((state) => state.bookProductDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bookProductDelete;

  const bookProductCreate = useSelector((state) => state.bookProductCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = bookProductCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: BOOKPRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
        navigate(`/admin/book-product/${createdProduct.id}/edit`);
        
    } else {
      dispatch(listBookProduct(search));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    search,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteBookProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createBookProduct());
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>

        <Col className="col-auto">
          <Button className="ml-4" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
            <Col md={12}>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>SUBTITLE</th>
                <th>AUTHOR</th>
                <th>PAGES</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {bookProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.subtitle}</td>
                  <td>{product.author}</td>
                  <td>{product.pages}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  

                  <td>
                    <LinkContainer to={`/admin/book-product/${product.id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </Col>
          {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
        </div>
      )}
    </div>
  );
}

export default ProductListPage;
