import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.setNotification({
        title: "Sending Request....",
        status: "",
        message: "Getting Cart Data!",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_URL}/cart.json`
      );
      if (!response.ok) {
        throw new Error("Failed to send data");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await sendRequest();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
      dispatch(
        uiActions.setNotification({
          title: "Success !",
          status: "success",
          message: "Getting Cart Data Successfully....",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.setNotification({
          title: "Error !",
          status: "error",
          message: "Get Cart Data Failed....",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    //sending req
    dispatch(
      uiActions.setNotification({
        title: "Sending Request....",
        status: "",
        message: "Sent Cart Data!",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_URL}/cart.json`,
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to send data");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.setNotification({
          title: "Success !",
          status: "success",
          message: "Sent Cart Data Successfully....",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.setNotification({
          title: "Error !",
          status: "error",
          message: "Sent Cart Data Failed....",
        })
      );
    }
  };
};
