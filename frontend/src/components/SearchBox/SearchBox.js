import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";
import { useDispatch } from "react-redux";
import { listBookProduct} from "../../actions/bookProductActions";

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/?keyword=${encodeURIComponent(keyword)}&page=1`);
      dispatch(listBookProduct(keyword));
    } else {
      navigate(location.pathname);
      dispatch(listBookProduct(""));
    }
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleClearResults = () => {
    setKeyword("");
    dispatch(listBookProduct(""));
    navigate('/'); 
  };

  return (
    <div className="search-box-container">
      <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control
          type="text"
          name="q"
          value={keyword}
          onChange={handleKeywordChange}
          className="mr-2"
        />
        <Button type="submit" variant="secondary">
          Search
        </Button>
      </Form>

      {keyword && (
        <div className="search-results-container">
          <Button variant="link" onClick={handleClearResults}>
            Clear Results
          </Button>
        </div>
      )}
    </div>
  );
}

export default SearchBox;