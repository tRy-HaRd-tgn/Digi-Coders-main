import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTrainerContext } from "../context/TrainerContext";

const TrainerAuth = ({ children }) => {
  const { loggedIn, currentUser, updateUser } = useTrainerContext();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        // Сначала проверяем ключ "trainer"
        let sessionTrainer = sessionStorage.getItem("trainer");
        console.log(
          "TrainerAuth - useEffect checkAuth, sessionTrainer:",
          sessionTrainer
        );

        // Если нет данных тренера, проверяем ключ "user"
        if (!sessionTrainer) {
          const sessionUser = sessionStorage.getItem("user");
          console.log(
            "TrainerAuth - useEffect checkAuth, sessionUser:",
            sessionUser
          );

          if (sessionUser) {
            const parsedUser = JSON.parse(sessionUser);
            // Проверяем, является ли пользователь тренером
            if (
              parsedUser.type === "trainer" ||
              parsedUser.skills ||
              parsedUser.certifications
            ) {
              console.log(
                "TrainerAuth - Found trainer in user data:",
                parsedUser
              );
              sessionTrainer = sessionUser;
            }
          }
        }

        if (sessionTrainer && !loggedIn) {
          const parsedTrainer = JSON.parse(sessionTrainer);
          console.log(
            "TrainerAuth - Found trainer in session, updating context:",
            parsedTrainer
          );
          updateUser(parsedTrainer);
        }

        setIsChecking(false);
      } catch (error) {
        console.error("TrainerAuth - Error checking auth:", error);
        setIsChecking(false);
      }
    };

    // Проверяем аутентификацию после небольшой задержки
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [loggedIn, updateUser]);

  // Дополнительная проверка sessionStorage
  const sessionTrainer = sessionStorage.getItem("trainer");
  const sessionUser = sessionStorage.getItem("user");
  console.log("TrainerAuth - loggedIn:", loggedIn, "currentUser:", currentUser);
  console.log("TrainerAuth - sessionStorage trainer:", sessionTrainer);
  console.log("TrainerAuth - sessionStorage user:", sessionUser);
  console.log("TrainerAuth - isChecking:", isChecking);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  if (loggedIn && currentUser !== null) {
    return children;
  } else {
    console.log("TrainerAuth - Redirecting to login");
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You are not logged in!",
    });
    return <Navigate to="/main/trainerlogin" />;
  }
};

export default TrainerAuth;
