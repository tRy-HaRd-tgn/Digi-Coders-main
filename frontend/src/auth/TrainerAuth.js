import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const TrainerAuth = ({children}) => {
  
    const [currentTrainer, setCurrentTrainer] = useState(JSON.parse(sessionStorage.getItem('trainer')))

    if (currentTrainer !== null) {
        return children;
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You are not logged in!',
        });
        return <Navigate to="/main/trainerlogin" />;
    }
}

export default TrainerAuth