import { Redirect, Route, Switch } from "react-router-dom";

import MainHeader from "./components/MainHeader";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <>
      <MainHeader />
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/welcome" />
          </Route>
          <Route path="/welcome" children={<Welcome />} />
          <Route path="/products" children={<Products />} exact />
          <Route path="/products/:productId" children={<ProductDetail />} />
        </Switch>
      </main>
    </>
  );
}

export default App;
