import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./components/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import Profile from "./routes/profile/profile.component";
import ProfileSettings from "./components/profile-settings/profile-settings.component";
import LoadingScreen from "./components/LoadingScreen/Loading-screen.component";

const App = () => {
  const [isLoading, setIsLoading] = useState(true); // Start with loading state as true

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after 3 seconds (for demonstration)
    }, 1000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="shop/*" element={<Shop />} />
            <Route path="auth" element={<Authentication />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile-settings" element={<ProfileSettings />} />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
