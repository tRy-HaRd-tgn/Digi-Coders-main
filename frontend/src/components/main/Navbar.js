import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { getAvatarUrl, handleImageError } from "../../utils/avatarHelper";
import { useTrainerContext } from "../../context/TrainerContext";

const Navbar = () => {
  const { loggedIn, logout, currentUser } = useUserContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

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
                <NavLink className="nav-link" to="/main/home">
                  Главная
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/main/about">
                  О нас
                </NavLink>
              </li>

              <li className={`dropdown ${isDropdownOpen ? "show" : ""}`}>
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  aria-expanded={isDropdownOpen}
                  onClick={toggleDropdown}
                >
                  Курсы
                </a>

                <ul
                  className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/user/viewchapters?category=HTML"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      HTML
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/user/viewchapters?category=JavaScript"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      JavaScript
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/user/viewchapters?category=Python"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Python
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/user/viewchapters?category=Game Development"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Разработка игр
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/user/viewchapters?category=Web Development"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Веб-разработка
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/user/viewchapters?category=Roblox"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Roblox
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/main/contact">
                  Контакты
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/trainer/trainerprofile">
                  Тренер
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            {!loggedIn ? (
              <>
                <Link className="nav-btn btn-link" to="/main/signup">
                  <i className="fas fa-user fa-lg me-1 fa-fw" />
                  Регистрация
                </Link>

                <Link className="nav-btn btn-link" to="/main/login">
                  <i className="fas fa-right-to-bracket fa-lg me-1 fa-fw" />
                  Войти
                </Link>
              </>
            ) : (
              <>
                <div className="d-flex align-items-center me-3">
                  <span
                    className="text-dark fw-bold me-2"
                    style={{ fontSize: "16px" }}
                  >
                    {currentUser?.name || "Пользователь"}
                  </span>
                </div>
                <img
                  src={getAvatarUrl(currentUser?.avatar)}
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  alt="User Avatar"
                  loading="lazy"
                  onError={(e) => handleImageError(e)}
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
                      <NavLink className="dropdown-item" to="/user/userprofile">
                        Мой профиль
                      </NavLink>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        type="button"
                        onClick={logout}
                      >
                        Выйти
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
