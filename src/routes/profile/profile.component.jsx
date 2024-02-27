import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import { getUserOrders } from "../../utils/firebase/firebase.utils"; // Ensure this is implemented as discussed
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom for navigation
import Button from "../../components/button/button.component";

const Profile = () => {
  const { currentUser, userData } = useContext(UserContext);

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

  const allItems = orders.reduce((itemsAccumulator, order) => {
    return itemsAccumulator.concat(order.items);
  }, []);

  console.log(allItems);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
        <Button
          buttonType="google"
          onClick={navigateToSettings}
          className="text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Settings
        </Button>
      </div>
      <div className="mb-6">
        <p className="text-lg">
          <strong>Name: </strong> {userData.displayName}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {userData.email}
        </p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Your Orders
        </h3>
        {orders.length ? (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="border-b py-4">
                <p className="text-md font-semibold">Order ID: {order.id}</p>
                <p className="text-md">Total: ${order.total.toFixed(2)}</p>
                <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.items
                    .reduce((acc, item) => {
                      const existingItem = acc.find((i) => i.id === item.id);
                      if (existingItem) {
                        existingItem.quantity += item.quantity;
                      } else {
                        acc.push({ ...item, quantity: item.quantity });
                      }
                      return acc;
                    }, [])
                    .map((item) => (
                      <li key={item.id} className="flex space-x-4 items-center">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-sm">
                            Price: ${item.price.toFixed(2)}
                          </p>
                          <p className="text-sm">
                            Quantity:{" "}
                            {item.quantity > 1
                              ? `${item.quantity}`
                              : item.quantity}
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-600">You have no orders.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
