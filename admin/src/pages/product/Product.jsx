import { Publish } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Chart } from "../../components/chart/Chart";
import {
  ProductAddBtn,
  ProductBottom,
  ProductButton,
  ProductContainer,
  ProductForm,
  ProductFormLeft,
  ProductFormLeftWrapper,
  ProductFormRight,
  ProductInfoBottom,
  ProductInfoImg,
  ProductInfoTop,
  ProductName,
  ProductTitle,
  ProductTitleContainer,
  ProductTop,
  ProductTopLeft,
  ProductTopRight,
  ProductUpload,
  ProductUploadImg,
} from "./productSC";
import { chartProps, renderProductInfoItem } from "./productUtils";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Product = () => {
  const [{ title, inStock, price, desc }, setProductData] =
    useState({});

  const [input, setInput] = useState({});

  const { productId } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://localhost:5050/api/v1/products/find/${productId}`
      );

      setProductData(data);
      const { title, price, desc, inStock } = data;
      setInput({
        title,
        price,
        desc,
        inStock,
      });
    })();
  }, [productId]);

  const productInfoItems = [
    { key: "id", value: "123" },
    { key: "sales", value: "5123" },
    { key: "active", value: "yes" },
    { key: "in stock", value: inStock ? "yes" : "no" },
  ];

  const handleOnChange = (e) => {
    setInput({
      ...input,
      [e.target.name]:
        e.target.name === "inStock"
          ? e.target.value === "yes"
          : e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const TOKEN = localStorage.getItem("token");
    const { data } = await axios.put(
      `http://localhost:5050/api/v1/products/${productId}`,
      input,
      { headers: { token: `Bearer ${TOKEN}` } }
    );

    setProductData(data);
    const { title, price, desc, inStock } = data;
    setInput({
      title,
      price,
      desc,
      inStock,
    });
    console.log({ input });
  };

  return (
    <ProductContainer id="ProductContainer">
      <ProductTitleContainer id="ProductTitleContainer">
        <ProductTitle id="ProductTitle">Product</ProductTitle>
        <Link to="/admin/newProduct">
          <ProductAddBtn id="ProductAddBtn">Create</ProductAddBtn>
        </Link>
      </ProductTitleContainer>
      <ProductTop id="ProductTop">
        <ProductTopLeft id="ProductTopLeft">
          <Chart {...chartProps} />
        </ProductTopLeft>
        <ProductTopRight id="ProductTopRight">
          <ProductInfoTop id="ProductInfoTop">
            <ProductInfoImg
              id="ProductInfoImg"
              src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="ProductInfoImg"
            />
            <ProductName id="ProductName">{title}</ProductName>
          </ProductInfoTop>
          <ProductInfoBottom id="ProductInfoBottom">
            {renderProductInfoItem(productInfoItems)}
          </ProductInfoBottom>
        </ProductTopRight>
      </ProductTop>
      <ProductBottom id="ProductBottom">
        <ProductForm id="ProductForm">
          <ProductFormLeftWrapper id="ProductFormLeftWrapper">
            <ProductFormLeft id="ProductFormLeft">
              <label>Product Name</label>
              <input
                type="text"
                name="title"
                placeholder="Apple AirPod"
                value={input.title}
                onChange={handleOnChange}
              />

              <label>Product Price</label>
              <input
                name="price"
                type="number"
                placeholder="1000"
                value={input.price}
                onChange={handleOnChange}
              />
            </ProductFormLeft>
            <ProductFormLeft id="ProductFormLeft">
              <label>Product Description</label>
              <input
                name="desc"
                type="text"
                placeholder="product description"
                onChange={handleOnChange}
                value={input.desc}
              />

              <label>In Stock</label>
              <select
                name="inStock"
                id="idStock"
                onChange={handleOnChange}
                value={input.inStock ? "yes" : "no"}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </ProductFormLeft>
          </ProductFormLeftWrapper>
          <ProductFormRight id="ProductFormRight">
            <ProductUpload id="ProductUpload">
              <ProductUploadImg
                id="ProductUploadImg"
                src="/images/image1.jpg"
                alt=""
              />{" "}
              <label for="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
              />
            </ProductUpload>
            <ProductButton
              id="ProductButton"
              onClick={handleUpdate}
            >
              Update
            </ProductButton>
          </ProductFormRight>
        </ProductForm>
      </ProductBottom>
    </ProductContainer>
  );
};
