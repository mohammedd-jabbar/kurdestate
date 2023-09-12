import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export const getUserStatus = async () => {
  return await new Promise((resolve, reject) => {
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
