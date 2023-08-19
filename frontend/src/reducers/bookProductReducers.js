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
  BOOKPRODUCT_CREATE_RESET,
  BOOKPRODUCT_UPDATE_REQUEST,
  BOOKPRODUCT_UPDATE_SUCCESS,
  BOOKPRODUCT_UPDATE_FAIL,
  BOOKPRODUCT_UPDATE_RESET,
  BOOKPRODUCT_CREATE_REVIEW_REQUEST,
  BOOKPRODUCT_CREATE_REVIEW_SUCCESS,
  BOOKPRODUCT_CREATE_REVIEW_FAIL,
  BOOKPRODUCT_CREATE_REVIEW_RESET,
  BOOKPRODUCT_TOP_REQUEST,
  BOOKPRODUCT_TOP_SUCCESS,
  BOOKPRODUCT_TOP_FAIL,
} from "../constants/bookProductsConstants";

export const bookProductListReducer = (
  state = { bookProducts: [] },
  action
) => {
  switch (action.type) {
    case BOOKPRODUCT_LIST_REQUEST:
      return { loading: true, bookProducts: [] };

    case BOOKPRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        bookProducts: action.payload
      };

    case BOOKPRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const bookProductDetailsReducer = (
  state = { bookProduct: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case BOOKPRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };

    case BOOKPRODUCT_DETAILS_SUCCESS:
      return { loading: false, bookProduct: action.payload };

    case BOOKPRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const bookProductDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKPRODUCT_DELETE_REQUEST:
      return { loading: true };

    case BOOKPRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };

    case BOOKPRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const bookProductCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKPRODUCT_CREATE_REQUEST:
      return { loading: true };

    case BOOKPRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case BOOKPRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case BOOKPRODUCT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const bookProductUpdateReducer = (
  state = { bookProduct: {} },
  action
) => {
  switch (action.type) {
    case BOOKPRODUCT_UPDATE_REQUEST:
      return { loading: true };

    case BOOKPRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case BOOKPRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case BOOKPRODUCT_UPDATE_RESET:
      return { bookProduct: {} };

    default:
      return state;
  }
};

export const bookProductReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKPRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };

    case BOOKPRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };

    case BOOKPRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };

    case BOOKPRODUCT_CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};

export const bookProductTopRatedReducer = (
  state = { bookProducts: [] },
  action
) => {
  switch (action.type) {
    case BOOKPRODUCT_TOP_REQUEST:
      return { loading: true, bookProducts: [] };

    case BOOKPRODUCT_TOP_SUCCESS:
      return { loading: false, bookProducts: action.payload };

    case BOOKPRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
