import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const [loggedIn, setLoggedIn] = useState(currentUser !== null);

  const navigate = useNavigate();

  // Слушаем изменения в sessionStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      setCurrentUser(user);
      setLoggedIn(user !== null);
    };

    // Слушаем события изменения storage
    window.addEventListener("storage", handleStorageChange);

    // Слушаем кастомное событие для обновления контекста
    const handleUserUpdate = () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      setCurrentUser(user);
      setLoggedIn(user !== null);
    };

    window.addEventListener("userUpdated", handleUserUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userUpdated", handleUserUpdate);
    };
  }, []);

  const logout = () => {
    sessionStorage.removeItem("user");
    setCurrentUser(null);
    setLoggedIn(false);
    navigate("/main/home");
  };

  const updateUser = (userData) => {
    setCurrentUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
    // Отправляем кастомное событие для обновления контекста
    window.dispatchEvent(new Event("userUpdated"));
  };

  return (
    <UserContext.Provider
      value={{ loggedIn, setLoggedIn, logout, currentUser, updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
