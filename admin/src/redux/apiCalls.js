import {
  getUserFailure,
  getUserStart,
  getUserSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import axios from "axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  const TOKEN = localStorage.getItem("token");

  try {
    const res = await axios.post(
      "http://localhost:5050/api/v1/auth/login",
      user,
      {
        headers: { token: `Bearer ${TOKEN}` },
      }
    );
    dispatch(loginSuccess(res.data));
    localStorage.setItem("token", res.data.accessToken);
    // console.log(res.data.accessToken);
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  const TOKEN = localStorage.getItem("token");

  try {
    const res = await axios.get(
      "http://localhost:5050/api/v1/users",
      {
        headers: { token: `Bearer ${TOKEN}` },
      }
    );
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await axios.get(
      "http://localhost:5050/api/v1/products"
    );
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  const TOKEN = localStorage.getItem("token");

  try {
    await axios.delete(
      `http://localhost:5050/api/v1/products/${id}`,
      {
        headers: { token: `Bearer ${TOKEN}` },
      }
    );

    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};
