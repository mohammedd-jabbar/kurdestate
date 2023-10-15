import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { notifications } from "./Notifications";
import { useTranslation } from "react-i18next";

const OAuth = () => {
  const navigateTo = useNavigate();
  const { t } = useTranslation("login");

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider(); // this is the google provider
      const auth = getAuth(); // this is the auth object
      auth.useDeviceLanguage(); // this is to use the device language for the popup
      const signInResult = await signInWithPopup(auth, provider); // this is to sign in with the popup
      const user = signInResult.user; // this is to get the user

      // check if user is new or existing (Document Reference)
      const docRef = await doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      // if user is new then add it to the database (Document Snapshot)
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          timeStamp: serverTimestamp(),
        });
      }
      navigateTo("/");
      window.location.reload();
      notifications("Successfully authorized with Google!");
    } catch (error) {
      console.error(error);
      notifications("Could not authorize with Google!", true);
    }
  };

  return (
    <button
      type="button" // because it is inside a form element by default it is a submit button so we need to change it to button, if we don't do this it will get as an error and refresh the page
      onClick={handleGoogleClick}
      className="w-full flex justify-center items-center bg-transparent text-gray-600 dark:text-gray-200 px-7 py-3 max-xs:text-[9px] text-sm font-medium uppercase rounded-md border-2 border-border hover:bg-primary-500 transition duration-200 ease-in-out hover:shadow-lg active:shadow-lg active:bg-primary-600 hover:border-primary-500 hover:text-white"
    >
      <FcGoogle className="rtl:order-1 mr-2 text-2xl bg-white rounded-full" />
      {t("Continue with Google")}
    </button>
  );
};

export default OAuth;
