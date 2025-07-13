import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useTrainerContext } from "../../context/TrainerContext";
import { getAvatarUrl, handleImageError } from "../../utils/avatarHelper";

const Navbar = () => {
  const { loggedIn, logout, currentUser } = useTrainerContext();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <NavLink className="navbar-brand me-2" to="/main/home">
            <img
              src="/logo/logo.png"
              height={50}
              alt="Digi Coders Logo"
              loading="lazy"
              style={{ marginTop: "-1px" }}
            />
          </NavLink>

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

          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarButtonsExample"
          >
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

          <div className="d-flex align-items-center">
            {!loggedIn ? (
              <>
                <Link className="nav-btn btn-link" to="/main/signup">
                  <i className="fas fa-user fa-lg me-1 fa-fw" />
                  Sign Up
                </Link>

                <Link className="nav-btn btn-link" to="/main/login">
                  <i className="fas fa-right-to-bracket fa-lg me-1 fa-fw" />
                  Login
                </Link>
              </>
            ) : (
              <>
                <div className="d-flex align-items-center me-3">
                  <span
                    className="text-dark fw-bold me-2"
                    style={{ fontSize: "16px" }}
                  >
                    {currentUser?.name || "Тренер"}
                  </span>
                </div>
                <img
                  src={getAvatarUrl(
                    currentUser?.avatar,
                    "https://bootdey.com/img/Content/avatar/avatar1.png"
                  )}
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  alt="Trainer Avatar"
                  loading="lazy"
                  onError={(e) =>
                    handleImageError(
                      e,
                      "https://bootdey.com/img/Content/avatar/avatar1.png"
                    )
                  }
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
                    <span className="nav-avatar align-items-center ms-2">
                      <i className="fas fa-caret-down ms-2" />
                    </span>
                  </NavLink>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdownMenuAvatar"
                  >
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/trainer/trainerprofile"
                      >
                        My profile
                      </NavLink>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        type="button"
                        onClick={logout}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
