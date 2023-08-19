import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const UseAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // loading

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      // Listen for changes in user authentication state, including sign-in and sign-out events.
      if (user) {
        // if user is logged in
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    });
  }, []);

  return { isLoggedIn, isLoading };
};
