import { DeleteOutline } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../redux/apiCalls";
import {
  ProductListDelete,
  ProductListEdit,
  ProductListImg,
  ProductListItem,
} from "./productListSC";

const productRows = [
  {
    id: 1,
    name: "Apple Airpods",
    img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    stock: 123,
    status: "active",
    price: "$120.00",
  },
  {
    id: 2,
    name: "Apple Airpods",
    img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    stock: 123,
    status: "active",
    price: "$120.00",
  },
  {
    id: 3,
    name: "Apple Airpods",
    img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    stock: 123,
    status: "active",
    price: "$120.00",
  },
  {
    id: 4,
    name: "Apple Airpods",
    img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    stock: 123,
    status: "active",
    price: "$120.00",
  },
  {
    id: 5,
    name: "Apple Airpods",
    img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    stock: 123,
    status: "active",
    price: "$120.00",
  },
  {
    id: 6,
    name: "Apple Airpods",
    img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    stock: 123,
    status: "active",
    price: "$120.00",
  },
  {
    id: 7,
    name: "Apple Airpods",
    img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    stock: 123,
    status: "active",
    price: "$120.00",
  },
  {
    id: 8,
    name: "Apple Airpods",
    img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    stock: 123,
    status: "active",
    price: "$120.00",
  },
  {
    id: 9,
    name: "Apple Airpods",
    img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    stock: 123,
    status: "active",
    price: "$120.00",
  },
  {
    id: 10,
    name: "Apple Airpods",
    img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    stock: 123,
    status: "active",
    price: "$120.00",
  },
];

export const useProductList = () => {
  const [data, setData] = useState(productRows);

  const product = useSelector((state) => state.product);
  const { products } = product;

  useEffect(() => {
    const newRow = products.map(
      ({ title: name, _id: id, img, price, inStock: stock }) => {
        const status = "active";
        return {
          id,
          name,
          stock,
          img: `/${img}`,
          status,
          price: `$${price}`,
        };
      }
    );
    setData(newRow);
  }, [products]);

  const dispatch = useDispatch(null);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <ProductListItem id="productListItem">
            <ProductListImg
              id="productListImg"
              src={params.row.img}
              alt={params.row.name}
            />
            {params.row.name}
          </ProductListItem>
        );
      },
    },
    { field: "stock", headerName: "Stock", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/product/" + params.row.id}>
              <ProductListEdit id="productListEdit">
                Edit
              </ProductListEdit>
            </Link>
            <ProductListDelete
              id="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return { data, columns };
};
