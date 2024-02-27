import React, { createContext, useState, useEffect, useContext } from "react";
import {
  fetchUserById,
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getUserOrders, // Assuming this is already defined as per your setup
  updateUserProfileDocument, // Make sure to define this function in your Firebase utils
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  userOrders: null,
  setUserOrders: () => null,
  updateUserProfile: () => Promise.resolve(), // New function for updating user profile
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userOrders, setUserOrders] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (userAuth) => {
      if (userAuth) {
        const userDoc = await createUserDocumentFromAuth(userAuth);
        const userData = await fetchUserById(userAuth.uid); // Fetch additional user data
        setUserData(userData); // Store it in state
        getUserOrders(userAuth).then((orders) => {
          setUserOrders(orders);
        });
      } else {
        setUserOrders(null);
        setUserData(null); // Clear user data if logged out
      }
      setCurrentUser(userAuth);
    });

    return () => unsubscribe();
  }, []);
  // New method to update user profile
  const updateUserProfile = async (additionalInformation) => {
    if (!currentUser) return;
    await updateUserProfileDocument(currentUser, additionalInformation);
    setCurrentUser({ ...currentUser, ...additionalInformation });
    // Optionally, refresh user data after update
    const updatedUserData = await fetchUserById(currentUser.uid);
    setUserData(updatedUserData);
  };
  const value = {
    currentUser,
    setCurrentUser,
    userOrders,
    setUserOrders,
    updateUserProfile,
    userData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Exporting useContext Hook for easier consumption of context
export const useUserContext = () => useContext(UserContext);
