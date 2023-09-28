/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import toast from "react-hot-toast";

// this is a custom notification component
export const notifications = (msg, err = false) => {
  const theme = localStorage.getItem("theme");

  if (!err) {
    return toast.success(msg, {
      duration: 3000,
      style:
        theme === "dark"
          ? {
              background: "#333",
              color: "#fff",
            }
          : {
              background: "#fff",
              color: "#333",
            },
    });
  } else {
    return toast.error(msg, {
      duration: 3000,
      style:
        theme === "dark"
          ? {
              background: "#333",
              color: "#fff",
            }
          : {
              background: "#fff",
              color: "#333",
            },
    });
  }
};
