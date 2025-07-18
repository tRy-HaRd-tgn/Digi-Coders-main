import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserAuth = ({ children }) => {
  const [currentUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  if (currentUser !== null) {
    return children;
  } else {
    Swal.fire({
      icon: "error",
      title: "Упс...",
      text: "Вы не авторизованы!",
      confirmButtonText: "Понятно",
      confirmButtonColor: "#8B5CF6",
      background: "rgba(255, 255, 255, 0.95)",
      backdrop: "rgba(0, 0, 0, 0.4)",
      customClass: {
        popup: "modern-swal-popup swal2-error",
        title: "modern-swal-title",
        content: "modern-swal-content",
        confirmButton: "modern-swal-button",
      },
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
    return <Navigate to="/main/studentlogin" />;
  }
};

export default UserAuth;
