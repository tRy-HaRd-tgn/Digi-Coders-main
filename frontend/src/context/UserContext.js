import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

    const [loggedIn, setLoggedIn] = useState(currentUser!==null);

    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem('user');
        setCurrentUser(null);
        setLoggedIn(false);
        navigate('/main/home');
    }

    return <UserContext.Provider value={{loggedIn, setLoggedIn, logout}}>
        {children}
    </UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
