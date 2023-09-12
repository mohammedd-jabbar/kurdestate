import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";

const auth = getAuth();

export const getUserStatus = async () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        reject(user);
      }
    });
  });
};

const getUserInfo = async () => {
  // Wait for auth.currentUser to be available
  while (!auth?.currentUser) {
    // Wait for 100ms before checking again
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return {
    name: auth?.currentUser?.displayName,
    email: auth?.currentUser?.email,
  };
};

export const useUserInfo = () => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    retry: 3,
  });
};
