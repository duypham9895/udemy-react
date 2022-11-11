import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

function App() {
  return (
    <>
      <Notification />
      <Layout>
        <Cart />
        <Products />
      </Layout>
    </>
  );
}

export default App;
