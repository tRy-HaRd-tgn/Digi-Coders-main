import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TrainerContext = createContext();

const TrainerProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("trainer"))
  );

  const [loggedIn, setLoggedIn] = useState(currentUser !== null);

  const navigate = useNavigate();

  // Слушаем изменения в sessionStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const trainer = JSON.parse(sessionStorage.getItem("trainer"));
      setCurrentUser(trainer);
      setLoggedIn(trainer !== null);
    };

    // Слушаем события изменения storage
    window.addEventListener("storage", handleStorageChange);

    // Слушаем кастомное событие для обновления контекста
    const handleTrainerUpdate = () => {
      const trainer = JSON.parse(sessionStorage.getItem("trainer"));
      setCurrentUser(trainer);
      setLoggedIn(trainer !== null);
    };

    window.addEventListener("trainerUpdated", handleTrainerUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("trainerUpdated", handleTrainerUpdate);
    };
  }, []);

  const logout = () => {
    sessionStorage.removeItem("trainer");
    setCurrentUser(null);
    setLoggedIn(false);
    navigate("/main/home");
  };

  const updateUser = (userData) => {
    setCurrentUser(userData);
    sessionStorage.setItem("trainer", JSON.stringify(userData));
    // Отправляем кастомное событие для обновления контекста
    window.dispatchEvent(new Event("trainerUpdated"));
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
