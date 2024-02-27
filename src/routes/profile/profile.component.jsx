import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import {
  getUserOrders,
  fetchUserById,
} from "../../utils/firebase/firebase.utils"; // Ensure this is implemented as discussed
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom for navigation
import Button from "../../components/button/button.component";

const Profile = () => {
  const { currentUser, userData } = useContext(UserContext);
  console.log(userData);
  const [orders, setOrders] = useState([]);
  const history = useNavigate(); // Use useHistory hook for navigation

  useEffect(() => {
    if (currentUser) {
      getUserOrders(currentUser).then(setOrders).catch(console.error); // Handle potential errors appropriately
    }
  }, [currentUser]);

  // Function to navigate to profile settings
  const navigateToSettings = () => {
    history("/profile-settings"); // Adjust the path as needed based on your routing setup
  };

  if (!currentUser) {
    return (
      <div className="text-center">Please sign in to view your profile.</div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Profile</h2>
        <Button buttonType="google" onClick={navigateToSettings}>
          Settings
        </Button>
      </div>
      <div className="mt-2">
        <p>
          <strong>Name: </strong> {userData.displayName}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Your Orders</h3>
        {orders.length ? (
          <ul className="mt-2">
            {orders.map((order) => (
              <li key={order.id} className="border-b py-2">
                {/* Adjust according to your order data structure */}
                <p>Order ID: {order.id}</p>
                <p>Total: ${order.total}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no orders.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
