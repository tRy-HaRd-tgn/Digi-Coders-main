import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTrainerContext } from '../../context/TrainerContext';
import { useState } from 'react';

const Navbar = () => {

    const { loggedIn, logout } = useTrainerContext();
    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem("trainer")));

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                {/* Container wrapper */}
                <div className="container">
                    {/* Navbar brand */}
                    <NavLink className="navbar-brand me-2" to="/main/home">
                        <img
                            src="/logo/logo.png"
                            height={50}
                            alt="Digi Coders Logo"
                            loading="lazy"
                            style={{ marginTop: "-1px" }}
                        />
                    </NavLink>
                    {/* Toggle button */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarButtonsExample"
                        aria-controls="navbarButtonsExample"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars" />
                    </button>
                    {/* Collapsible wrapper */}
                    <div className="collapse navbar-collapse justify-content-center" id="navbarButtonsExample">
                        {/* Left links */}
                        <ul className="navbar-nav mb-2 mb-lg-0" style={{ fontSize: 18 }}>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/trainer/home">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/trainer/about">
                                    About
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/trainer/managechapter">
                                    Manage Chapter
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/trainer/contact">
                                    Contact
                                </NavLink>
                            </li>

                        </ul>

                    </div>
                    {/* Collapsible wrapper */}

                    {/* Left links */}
                    <div className="d-flex align-items-center">
                        {
                            !loggedIn ? (
                                <>
                                    <Link
                                        class="nav-btn btn-link"
                                        to="/main/signup"
                                    >
                                        <i
                                            className="fas fa-user fa-lg me-1 fa-fw"
                                        />
                                        Sign Up
                                    </Link>

                                    <Link
                                        class="nav-btn btn-link"
                                        to="/main/login"
                                    >
                                        <i
                                            className="fas fa-right-to-bracket fa-lg me-1 fa-fw"
                                        />
                                        Login
                                    </Link>
                                </>
                            ) :
                                (

                                    <>
                                        <img
                                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                            className="rounded-circle"
                                            style={{ width: "50px", backgroundSize: "cover" }}
                                            alt="Black and White Portrait of a Man"
                                            loading="lazy"
                                        />
                                        <div className="dropdown">
                                            <NavLink
                                                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                                                to="#"
                                                id="navbarDropdownMenuAvatar"
                                                role="button"
                                                data-mdb-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <NavLink className='nav-avatar align-items-center ms-2'>
                                                    {currentUser.name}
                                                    <i className="fas fa-caret-down ms-2" />
                                                </NavLink>
                                            </NavLink>
                                            <ul
                                                className="dropdown-menu dropdown-menu-end"
                                                aria-labelledby="navbarDropdownMenuAvatar"
                                            >
                                                <li>
                                                    <NavLink className="dropdown-item" to="/trainer/trainerprofile">
                                                        My profile
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" type='button' onClick={logout}>
                                                        Logout
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                )
                        }
                    </div>

                </div>
                {/* Container wrapper */}
            </nav>
            {/* Navbar */}
        </>
    )
}

export default Navbar