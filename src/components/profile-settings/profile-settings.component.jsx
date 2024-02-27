import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/user.context";

const ProfileSettings = () => {
  const { currentUser, updateUserProfile, userData } = useContext(UserContext);
  console.log(userData);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || userData.displayName || "");
      setEmail(currentUser.email); // Assuming email is part of the user object
    }
  }, [currentUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Update profile here. Make sure to adjust this to your actual data structure and requirements
      await updateUserProfile({ displayName });
      alert("Profile updated successfully!");
    } catch (error) {
      console.log("Error updating profile", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="displayName">
            Display Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="displayName"
            type="text"
            placeholder={
              !currentUser?.displayName ? "Add Display Name" : "Display Name"
            }
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email">
            Email (cannot be changed)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={email}
            disabled
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
