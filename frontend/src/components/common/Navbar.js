import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useTrainerContext } from "../../context/TrainerContext";
import { getAvatarUrl, handleImageError } from "../../utils/avatarHelper";
import PropTypes from "prop-types";

/**
 * Универсальный компонент навигации
 * @param {Object} props - Свойства компонента
 * @param {string} props.userType - Тип пользователя ('user' или 'trainer')
 * @param {Array} props.navItems - Массив элементов навигации
 * @param {string} props.logoPath - Путь к логотипу
 * @param {string} props.brandName - Название бренда
 * @param {string} props.profileRoute - Маршрут к профилю пользователя
 * @param {string} props.homeRoute - Маршрут к главной странице
 * @param {string} props.defaultAvatar - URL аватара по умолчанию
 * @return {JSX.Element} Компонент навигации
 */
const Navbar = ({
  userType = "user",
  navItems = [],
  logoPath = "/logo/logo.png",
  brandName = "DIGICODERS",
  profileRoute = "/user/userprofile",
  homeRoute = "/main/home",
  defaultAvatar = "https://bootdey.com/img/Content/avatar/avatar1.png",
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  // Используем соответствующий контекст
  const userContext = useUserContext();
  const trainerContext = useTrainerContext();
  const context = userType === "trainer" ? trainerContext : userContext;
  const { loggedIn, logout, currentUser } = context;

  /**
   * Обработчик клика вне dropdown
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Закрытие мобильного меню при смене маршрута
   */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  /**
   * Переключение мобильного меню
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  /**
   * Переключение dropdown меню
   */
  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  /**
   * Обработчик выхода из системы
   */
  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  /**
   * Получение имени пользователя
   */
  const getUserDisplayName = () => {
    if (!currentUser?.name) {
      return userType === "trainer" ? "Тренер" : "Пользователь";
    }

    const nameParts = currentUser.name.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0]} ${nameParts[1]}`;
    }
    return currentUser.name;
  };

  /**
   * Получение аватара пользователя
   */
  const getAvatarSrc = () => {
    return getAvatarUrl(currentUser?.avatar, defaultAvatar);
  };

  /**
   * Обработчик ошибки загрузки аватара
   */
  const handleAvatarError = (e) => {
    handleImageError(e, defaultAvatar);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        {/* Логотип */}
        <NavLink
          className="navbar-brand d-flex align-items-center"
          to={homeRoute}
        >
          <div className="d-flex flex-column">
            <span
              className="fw-bold text-dark"
              style={{ fontSize: "1.2rem", lineHeight: "1" }}
            >
              <span className="text-dark">DIGI</span>
              <span className="text-primary">CODERS</span>
            </span>
            <small
              className="text-muted"
              style={{ fontSize: "0.7rem", lineHeight: "1" }}
            >
              Весело с программированием
            </small>
          </div>
        </NavLink>

        {/* Кнопка мобильного меню */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Навигационное меню */}
        <div
          className={`collapse navbar-collapse ${
            isMobileMenuOpen ? "show" : ""
          }`}
          ref={mobileMenuRef}
        >
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {navItems.map((item, index) => (
              <li className="nav-item" key={index}>
                <NavLink
                  className="nav-link position-relative px-3"
                  to={item.path}
                  style={{ fontSize: "1rem", fontWeight: "500" }}
                >
                  {item.label}
                  <span className="nav-link-underline"></span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Правая часть навигации */}
          <div className="d-flex align-items-center">
            {!loggedIn ? (
              <div className="d-flex gap-2">
                <Link
                  className="btn btn-outline-primary btn-sm"
                  to="/main/signup"
                  style={{ fontSize: "0.9rem" }}
                >
                  <i className="fas fa-user me-1"></i>
                  Регистрация
                </Link>
                <Link
                  className="btn btn-primary btn-sm"
                  to="/main/login"
                  style={{ fontSize: "0.9rem" }}
                >
                  <i className="fas fa-right-to-bracket me-1"></i>
                  Войти
                </Link>
              </div>
            ) : (
              <div
                className="d-flex align-items-center position-relative"
                ref={dropdownRef}
              >
                {/* Информация о пользователе */}
                <div className="d-none d-md-flex align-items-center me-3">
                  <span
                    className="text-dark fw-medium"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {getUserDisplayName()}
                  </span>
                </div>

                {/* Аватар */}
                <div className="position-relative">
                  <img
                    src={getAvatarSrc()}
                    className="rounded-circle border border-2 border-light shadow-sm"
                    style={{
                      width: "45px",
                      height: "45px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    alt="User Avatar"
                    loading="lazy"
                    onError={handleAvatarError}
                    onClick={toggleDropdown}
                  />

                  {/* Индикатор dropdown */}
                  <button
                    className="btn btn-link p-0 position-absolute"
                    style={{
                      bottom: "-5px",
                      right: "-5px",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: "#007bff",
                      border: "2px solid white",
                      color: "white",
                      fontSize: "0.7rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={toggleDropdown}
                  >
                    <i
                      className={`fas fa-caret-${
                        isDropdownOpen ? "up" : "down"
                      }`}
                    ></i>
                  </button>
                </div>

                {/* Dropdown меню */}
                {isDropdownOpen && (
                  <div className="dropdown-menu show position-absolute end-0 mt-2 shadow-lg border-0 rounded-3">
                    <div className="dropdown-header py-2 px-3 border-bottom">
                      <div className="fw-bold text-dark">
                        {getUserDisplayName()}
                      </div>
                      <small className="text-muted">
                        {userType === "trainer" ? "Тренер" : "Студент"}
                      </small>
                    </div>
                    <NavLink
                      className="dropdown-item py-2 px-3"
                      to={profileRoute}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <i className="fas fa-user me-2 text-muted"></i>
                      Мой профиль
                    </NavLink>
                    <div className="dropdown-divider"></div>
                    <button
                      className="dropdown-item py-2 px-3 text-danger"
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt me-2"></i>
                      Выйти
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  userType: PropTypes.oneOf(["user", "trainer"]),
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
  logoPath: PropTypes.string,
  brandName: PropTypes.string,
  profileRoute: PropTypes.string,
  homeRoute: PropTypes.string,
  defaultAvatar: PropTypes.string,
};

export default Navbar;
