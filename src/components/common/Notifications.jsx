/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { toast } from "react-toastify";

// this is a custom notification component
export const notifications = (msg, err = false) => {
  if (!err) {
    return toast(msg, {
      position: "top-center",
      autoClose: 3000,
      icon: "✅",
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  } else {
    return toast.error(msg, {
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
