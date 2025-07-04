import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const TrainerContext = createContext();

const TrainerProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('trainer')));

    const [loggedIn, setLoggedIn] = useState(currentUser!==null);

    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem('trainer');
        setCurrentUser(null);
        setLoggedIn(false);
        navigate('/main/home');
    }

    return <TrainerContext.Provider value={{loggedIn, setLoggedIn, logout}}>
        {children}
    </TrainerContext.Provider>
}

export const useTrainerContext = () => useContext(TrainerContext);

export default TrainerProvider;
