import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../redux/apiCalls";
import {
  UserAddButton,
  UserTitle,
  UserTitleContainer,
} from "../user/userSc";
import { ProductListContainer } from "./productListSC";
import { useProductList } from "./productListUtils";

export const ProductList = () => {
  // all the react hooks (useState, useEffect, ...) for ProductList
  // component inside useProductList custom hook

  const dispatch = useDispatch(null);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const { data, columns } = useProductList();

  return (
    <ProductListContainer id="ProductListContainer">
      <UserTitleContainer id="UserTitleContainer">
        <UserTitle id="UserTitle">Products</UserTitle>
        <Link to="/admin/newproduct">
          <UserAddButton id="UserAddButton">Create</UserAddButton>
        </Link>
      </UserTitleContainer>

      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </ProductListContainer>
  );
};
