import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cart.context";
import { UserContext } from "../../context/user.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { createOrderForUser } from "../../utils/firebase/firebase.utils";
import "./checkout.styles.scss";
import { useNavigate } from "react-router-dom";

import PaymentForm from "../../components/payment-form/payment-form.component";
const Checkout = () => {
  const { cartItems, cartTotal, clearItemFromCart, clearCart } =
    useContext(CartContext);
  const { currentUser } = useContext(UserContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!currentUser) {
      alert("You must be signed in to place an order");
      return;
    }

    setIsProcessing(true);

    // Mock payment processing
    // In a real scenario, you would integrate with a payment SDK here
    setTimeout(async () => {
      try {
        // Create order data
        const orderData = {
          items: cartItems,
          total: cartTotal,
          createdAt: new Date(),
        };

        // Save the order to Firebase
        await createOrderForUser(currentUser, orderData);
        clearCart();
        // Redirect to a success page or display a success message
        navigate("/profile"); // Adjust the route as needed
      } catch (error) {
        alert("There was an issue with your order. Please try again.");
        console.error("Order placement error:", error);
      } finally {
        setIsProcessing(false);
      }
    }, 2000); // Mock processing delay
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map((cartItem) => {
        return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
      })}
      <span className="total">Total: ${cartTotal}</span>

      <div>
        <PaymentForm onPaymentSuccess={handlePlaceOrder} />
      </div>
    </div>
  );
};

export default Checkout;
