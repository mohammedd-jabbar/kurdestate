import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const navigate = useNavigate();

  const OnGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider(); // this is the google provider
      const auth = getAuth(); // this is the auth object
      auth.useDeviceLanguage(); // this is to use the device language for the popup
      const result = await signInWithPopup(auth, provider); // this is to sign in with the popup
      const user = result.user; // this is to get the user

      // check if user is new or existing
      const docRef = await doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          timeStamp: serverTimestamp(),
        });
      }
      navigate("/");

      console.log(user);
    } catch (error) {
      console.error(error);
      toast.error("Could not authorize with Google!", {
        position: "top-center",
        icon: "🔴",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <button
      type="button" // because it is inside a form element by default it is a submit button so we need to change it to button, if we don't do this it will get as an error and refresh the page
      onClick={OnGoogleClick}
      className="w-full flex justify-center items-center bg-red-700 text-white px-7 py-3 text-sm font-medium uppercase rounded-md shadow-md hover:bg-red-800 transition duration-200 ease-in-out hover:shadow-lg active:shadow-lg active:bg-red-900"
    >
      <FcGoogle className="mr-2 text-2xl bg-white rounded-full" />
      Continue with Google
    </button>
  );
};

export default OAuth;
