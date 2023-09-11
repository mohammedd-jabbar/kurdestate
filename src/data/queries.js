import { getAuth, onAuthStateChanged } from "firebase/auth";

export const getUserStatus = async () => {
  const auth = getAuth();
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
