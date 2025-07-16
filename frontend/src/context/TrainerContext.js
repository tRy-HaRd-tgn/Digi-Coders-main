import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TrainerContext = createContext();

const TrainerProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      let trainer = sessionStorage.getItem("trainer");

      if (!trainer) {
        const user = sessionStorage.getItem("user");

        if (user) {
          const parsedUser = JSON.parse(user);

          if (
            parsedUser.type === "trainer" ||
            parsedUser.skills ||
            parsedUser.certifications
          ) {
            trainer = user;
          }
        }
      }

      const parsedTrainer = trainer ? JSON.parse(trainer) : null;

      return parsedTrainer;
    } catch (error) {
      console.error("Error parsing trainer from sessionStorage:", error);
      return null;
    }
  });

  const [loggedIn, setLoggedIn] = useState(() => {
    try {
      const trainer = sessionStorage.getItem("trainer");

      const parsedTrainer = trainer ? JSON.parse(trainer) : null;
      const isLoggedIn = parsedTrainer !== null;

      return isLoggedIn;
    } catch (error) {
      console.error("Error checking initial login status:", error);
      return false;
    }
  });

  const navigate = useNavigate();

  // Слушаем изменения в sessionStorage
  useEffect(() => {
    // Проверяем состояние при загрузке
    const checkInitialState = () => {
      try {
        // Сначала проверяем ключ "trainer"
        let trainer = sessionStorage.getItem("trainer");

        // Если нет данных тренера, проверяем ключ "user"
        if (!trainer) {
          const user = sessionStorage.getItem("user");
          if (user) {
            const parsedUser = JSON.parse(user);
            // Проверяем, является ли пользователь тренером
            if (
              parsedUser.type === "trainer" ||
              parsedUser.skills ||
              parsedUser.certifications
            ) {
              trainer = user;
            }
          }
        }

        const parsedTrainer = trainer ? JSON.parse(trainer) : null;
       
        setCurrentUser(parsedTrainer);
        setLoggedIn(parsedTrainer !== null);
      } catch (error) {
        console.error("Error checking initial state:", error);
        setCurrentUser(null);
        setLoggedIn(false);
      }
    };

    // Проверяем состояние сразу при загрузке
    checkInitialState();

    const handleStorageChange = () => {
      try {
        const trainer = sessionStorage.getItem("trainer");
        const parsedTrainer = trainer ? JSON.parse(trainer) : null;
        setCurrentUser(parsedTrainer);
        setLoggedIn(parsedTrainer !== null);
      } catch (error) {
        console.error("Error parsing trainer from sessionStorage:", error);
        setCurrentUser(null);
        setLoggedIn(false);
      }
    };

    // Слушаем события изменения storage
    window.addEventListener("storage", handleStorageChange);

    // Слушаем кастомное событие для обновления контекста
    const handleTrainerUpdate = () => {
      try {
        const trainer = sessionStorage.getItem("trainer");
        const parsedTrainer = trainer ? JSON.parse(trainer) : null;
        setCurrentUser(parsedTrainer);
        setLoggedIn(parsedTrainer !== null);
      } catch (error) {
        console.error("Error parsing trainer from sessionStorage:", error);
        setCurrentUser(null);
        setLoggedIn(false);
      }
    };

    window.addEventListener("trainerUpdated", handleTrainerUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("trainerUpdated", handleTrainerUpdate);
    };
  }, []);

  const logout = () => {
    try {
      sessionStorage.removeItem("trainer");
      sessionStorage.removeItem("user");
      setCurrentUser(null);
      setLoggedIn(false);
      navigate("/main/home");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const updateUser = (userData) => {
    try {
      

      if (!userData) {
        console.error(
          "TrainerContext - updateUser called with null/undefined data"
        );
        return;
      }

      setCurrentUser(userData);

      // Сохраняем данные под ключом "trainer"
      sessionStorage.setItem("trainer", JSON.stringify(userData));

      // Также удаляем данные из ключа "user", если они там есть
      sessionStorage.removeItem("user");

      setLoggedIn(userData !== null);
      

      // Отправляем кастомное событие для обновления контекста
      window.dispatchEvent(new Event("trainerUpdated"));

     
    } catch (error) {
      console.error("Error updating trainer user:", error);
    }
  };

  return (
    <TrainerContext.Provider
      value={{ loggedIn, setLoggedIn, logout, currentUser, updateUser }}
    >
      {children}
    </TrainerContext.Provider>
  );
};

export const useTrainerContext = () => useContext(TrainerContext);

export default TrainerProvider;
