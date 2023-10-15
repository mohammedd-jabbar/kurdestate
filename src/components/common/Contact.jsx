/* eslint-disable react/prop-types */
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { notifications } from "./Notifications";

const Contact = ({ userRef, listing }) => {
  const [landLord, setLandLord] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const getLandLord = async () => {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLandLord(docSnap.data());
      } else {
        notifications("Landlord not found", true);
      }
    };
    getLandLord();
  }, []);
  return (
    <>
      {landLord !== null && landLord.email && (
        <div className="flex flex-col w-full">
          <p>
            Contact {landLord.name} for the {listing.name.toLowerCase()}
          </p>
          <div className="mt-3 mb-6">
            <textarea
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg transition duration-150 ease-in-out focus:outline-none focus:border-slate-600 focus:text-gray-500 focus:bg-white"
              name="message"
              id="message"
              rows="2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <a
            href={`mailto:${landLord.email}?Subject=${listing.name}&body=${message}`}
          >
            <button
              className="px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center mb-6"
              type="button"
            >
              Send Message
            </button>
          </a>
        </div>
      )}
    </>
  );
};

export default Contact;
