import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { createGlobalStyle } from "styled-components";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin:0
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      {/* <Home /> */}
      {/* <Cart /> */}
      {/* <Login /> */}
      {/* <Product /> */}
      {/* <ProductList /> */}
      <Register />
    </>
  );
}

export default App;
