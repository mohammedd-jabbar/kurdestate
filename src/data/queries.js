/* eslint-disable no-useless-catch */
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export const getUserInfo = async () => {
  try {
    return await new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        if (user) {
          resolve(user);
        } else {
          reject(new Error("User not found")); // Reject with an error if user is not found
        }
      });
    });
  } catch (error) {
    throw error; // Rethrow the error to propagate it further if needed
  }
};
