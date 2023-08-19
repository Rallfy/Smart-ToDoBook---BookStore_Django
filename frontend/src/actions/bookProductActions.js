import {
  BOOKPRODUCT_LIST_REQUEST,
  BOOKPRODUCT_LIST_SUCCESS,
  BOOKPRODUCT_LIST_FAIL,
  BOOKPRODUCT_DETAILS_REQUEST,
  BOOKPRODUCT_DETAILS_SUCCESS,
  BOOKPRODUCT_DETAILS_FAIL,
  BOOKPRODUCT_DELETE_REQUEST,
  BOOKPRODUCT_DELETE_SUCCESS,
  BOOKPRODUCT_DELETE_FAIL,
  BOOKPRODUCT_CREATE_REQUEST,
  BOOKPRODUCT_CREATE_SUCCESS,
  BOOKPRODUCT_CREATE_FAIL,
  BOOKPRODUCT_UPDATE_REQUEST,
  BOOKPRODUCT_UPDATE_SUCCESS,
  BOOKPRODUCT_UPDATE_FAIL,
  BOOKPRODUCT_CREATE_REVIEW_REQUEST,
  BOOKPRODUCT_CREATE_REVIEW_SUCCESS,
  BOOKPRODUCT_CREATE_REVIEW_FAIL,
  BOOKPRODUCT_TOP_REQUEST,
  BOOKPRODUCT_TOP_SUCCESS,
  BOOKPRODUCT_TOP_FAIL,
} from "../constants/bookProductsConstants";
import axios from "axios";

export const listBookProduct = (keyword = "") => async (dispatch) => {
  try {
    dispatch({ type: BOOKPRODUCT_LIST_REQUEST });

    const encodedKeyword = encodeURIComponent(keyword);
    const { data } = await axios.get(`/api/book-product?keyword=${encodedKeyword}`);

    dispatch({
      type: BOOKPRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOKPRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.date.detail
          : error.message,
    });
  }
};

export const listTopBookProducts = () => async (dispatch) => {
  try {
    dispatch({ type: BOOKPRODUCT_TOP_REQUEST });

    const { data } = await axios.get(`/api/book-product/top/`);

    dispatch({
      type: BOOKPRODUCT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOKPRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listBookProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BOOKPRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/book-product/${id}`);

    dispatch({
      type: BOOKPRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOKPRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.date.detail
          : error.message,
    });
  }
};

export const deleteBookProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKPRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `/api/book-product/delete/${id}/`,
      config
    );

    dispatch({
      type: BOOKPRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: BOOKPRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createBookProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKPRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/book-product/create/`, {}, config);
    dispatch({
      type: BOOKPRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOKPRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateBookProduct = (bookProduct) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: BOOKPRODUCT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/book-product/update/${bookProduct.id}/`,
      bookProduct,
      config
    );
    dispatch({
      type: BOOKPRODUCT_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: BOOKPRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOKPRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createProductReview = (bookProductId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: BOOKPRODUCT_CREATE_REVIEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/book-product/${bookProductId}/reviews/`,
      review,
      config
    );
    dispatch({
      type: BOOKPRODUCT_CREATE_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOKPRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
