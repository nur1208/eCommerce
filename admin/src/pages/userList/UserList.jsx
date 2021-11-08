import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import {
  UserListContainer,
  UserListDeleteIcon,
  UserListEditBtn,
  UserListImg,
  UserListUser,
} from "./userListSC";
import { rows } from "./userListUtils";
import {
  UserAddButton,
  UserTitle,
  UserTitleContainer,
} from "../user/userSc";
import { getUsers } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

export const UserList = () => {
  const user = useSelector((state) => state.user);

  const { users } = user;

  const [userRows, setUserRows] = useState([]);

  const handleDelete = (id) => {
    const newUserRows = userRows.filter((row) => row.id !== id);
    setUserRows(newUserRows);
  };

  const dispatch = useDispatch(null);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const newRow = users
      ? users.map(({ username, email, _id: id }) => {
          const avatar =
            "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500";
          const status = "active";
          const transaction = "$120.00";
          return {
            id,
            username,
            avatar,
            status,
            transaction,
            email,
          };
        })
      : [];
    setUserRows(newRow);
  }, [users]);

  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <UserListUser id="UserListUser">
            <UserListImg
              id="userListImg"
              src={params.row.avatar}
              alt={params.row.username}
            />
            {params.row.username}
          </UserListUser>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/user/" + params.row.id}>
              <UserListEditBtn>Edit</UserListEditBtn>
            </Link>
            <UserListDeleteIcon
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <UserListContainer>
      <UserTitleContainer id="UserTitleContainer">
        <UserTitle id="UserTitle">Users</UserTitle>
        <Link to="/admin/newUser">
          <UserAddButton id="UserAddButton">Create</UserAddButton>
        </Link>
      </UserTitleContainer>
      <DataGrid
        rows={userRows}
        columns={columns}
        pageSize={9}
        checkboxSelection
        disableSelectionOnClick
      />
    </UserListContainer>
  );
};
