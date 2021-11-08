import { Sidebar } from "./components/sidebar/Sidebar";
import { Topbar } from "./components/topbar/Topbar";
import "./App.css";
import { AdminHomePage } from "./pages/adminHome/AdminHomePage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { UserList } from "./pages/userList/UserList";
import { User } from "./pages/user/User";
import { NewUser } from "./pages/newUser/NewUser";
import { ProductList } from "./pages/productList/ProductList";
import { Product } from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {
  // const admin = useSelector(
  //   (state) => state.user.currentUser.isAdmin
  // );

  const user = useSelector((state) => state.user);
  const { currentUser } = user;

  const admin = true;
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        {currentUser && currentUser.isAdmin ? (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/admin/">
                <AdminHomePage />
              </Route>
              <Route path="/admin/users">
                <UserList />
              </Route>
              <Route path="/admin/user/:userId">
                <User />
              </Route>
              <Route path="/admin/newUser">
                <NewUser />
              </Route>
              <Route path="/admin/products">
                <ProductList />
              </Route>
              <Route path="/admin/product/:productId">
                <Product />
              </Route>
              <Route path="/admin/newproduct">
                <NewProduct />
              </Route>
            </div>
          </>
        ) : (
          <Login />
        )}
      </Switch>
    </Router>
  );
}

export default App;
