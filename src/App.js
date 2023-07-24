import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";
import { uiActions } from "./store/ui-slice";

function App() {
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(
      uiActions.setNotification({
        title: "Sending Request....",
        status: "",
        message: "Sent Cart Data!",
      })
    );
    fetch(`${process.env.REACT_APP_FIREBASE_URL}/cart.json`, {
      method: "PUT",
      body: JSON.stringify(cart),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send data");
        }
        dispatch(
          uiActions.setNotification({
            title: "Success !",
            status: "success",
            message: "Sent Cart Data Successfully....",
          })
        );
      })
      .catch((err) => {
        dispatch(
          uiActions.setNotification({
            title: "Error !",
            status: "error",
            message: "Sent Cart Data Failed....",
          })
        );
      });
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
