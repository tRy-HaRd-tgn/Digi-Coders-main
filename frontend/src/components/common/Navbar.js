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
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  // Используем соответствующий контекст
  const userContext = useUserContext();
  const trainerContext = useTrainerContext();
  const context = userType === "trainer" ? trainerContext : userContext;
  const { loggedIn, logout, currentUser } = context;

  /**
   * Обработчик скролла для изменения стилей navbar
   */
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav
      className={`navbar navbar-expand-lg fixed-top ${
        scrolled ? "navbar-scrolled" : "navbar-transparent"
      }`}
      style={{
        background: scrolled
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(20px)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        borderBottom: scrolled
          ? "1px solid rgba(0, 0, 0, 0.08)"
          : "1px solid rgba(0, 0, 0, 0.05)",
        boxShadow: scrolled
          ? "0 8px 32px rgba(0, 0, 0, 0.12)"
          : "0 4px 20px rgba(0, 0, 0, 0.08)",
        zIndex: 1030,
      }}
    >
      <div className="container">
        {/* Логотип */}
        <NavLink
          className="navbar-brand d-flex align-items-center"
          to={homeRoute}
          style={{
            textDecoration: "none",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <div className="d-flex flex-column">
            <span
              className="fw-bold"
              style={{
                fontSize: "1.4rem",
                lineHeight: "1",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: "800",
                letterSpacing: "0.5px",
              }}
            >
              DIGI<span style={{ color: "#667eea" }}>CODERS</span>
            </span>
            <small
              className="text-muted"
              style={{
                fontSize: "0.75rem",
                lineHeight: "1.2",
                fontWeight: "400",
                opacity: "0.8",
                marginTop: "2px",
              }}
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
          style={{
            padding: "0.5rem",
            borderRadius: "12px",
            transition: "all 0.3s ease",
            background: "rgba(102, 126, 234, 0.1)",
            border: "1px solid rgba(102, 126, 234, 0.2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(102, 126, 234, 0.15)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(102, 126, 234, 0.1)";
            e.currentTarget.style.transform = "scale(1)";
          }}
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
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    color: "#495057",
                    padding: "0.75rem 1.25rem",
                    borderRadius: "12px",
                    margin: "0 0.25rem",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(102, 126, 234, 0.1)";
                    e.currentTarget.style.color = "#667eea";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#495057";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {item.label}
                  <span
                    className="nav-link-underline"
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "50%",
                      width: "0",
                      height: "3px",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: "translateX(-50%)",
                      borderRadius: "2px",
                    }}
                  ></span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Правая часть навигации */}
          <div className="d-flex align-items-center">
            {!loggedIn ? (
              <div className="d-flex gap-3">
                <Link
                  className="btn btn-outline-primary"
                  to="/main/signup"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "12px",
                    border: "2px solid #667eea",
                    color: "#667eea",
                    background: "transparent",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#667eea";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 25px rgba(102, 126, 234, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#667eea";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <i className="fas fa-user-plus"></i>
                  Регистрация
                </Link>
                <Link
                  className="btn btn-primary"
                  to="/main/login"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                    color: "white",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 25px rgba(102, 126, 234, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(102, 126, 234, 0.3)";
                  }}
                >
                  <i className="fas fa-sign-in-alt"></i>
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
                    className="fw-medium"
                    style={{
                      fontSize: "0.95rem",
                      color: "#495057",
                      fontWeight: "600",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {getUserDisplayName()}
                  </span>
                </div>

                {/* Аватар */}
                <div className="position-relative">
                  <img
                    src={getAvatarSrc()}
                    className="rounded-circle border border-3"
                    style={{
                      width: "48px",
                      height: "48px",
                      objectFit: "cover",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      border: "3px solid rgba(102, 126, 234, 0.2)",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                    }}
                    alt="User Avatar"
                    loading="lazy"
                    onError={handleAvatarError}
                    onClick={toggleDropdown}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.1)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 25px rgba(102, 126, 234, 0.3)";
                      e.currentTarget.style.borderColor =
                        "rgba(102, 126, 234, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 15px rgba(0, 0, 0, 0.1)";
                      e.currentTarget.style.borderColor =
                        "rgba(102, 126, 234, 0.2)";
                    }}
                  />

                  {/* Индикатор dropdown */}
                  <button
                    className="btn btn-link p-0 position-absolute"
                    style={{
                      bottom: "-3px",
                      right: "-3px",
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "3px solid white",
                      color: "white",
                      fontSize: "0.7rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                      cursor: "pointer",
                    }}
                    onClick={toggleDropdown}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.15)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 20px rgba(102, 126, 234, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(102, 126, 234, 0.3)";
                    }}
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
                  <div
                    className="dropdown-menu show position-absolute end-0 mt-3"
                    style={{
                      minWidth: "250px",
                      maxWidth: "300px",
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(102, 126, 234, 0.1)",
                      borderRadius: "16px",
                      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                      zIndex: 1050,
                      overflow: "hidden",
                      animation:
                        "dropdownSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div
                      className="dropdown-header py-3 px-4"
                      style={{
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      <div
                        className="fw-bold"
                        style={{ fontSize: "1.1rem", marginBottom: "4px" }}
                      >
                        {getUserDisplayName()}
                      </div>
                      <small style={{ fontSize: "0.85rem", opacity: "0.9" }}>
                        {userType === "trainer" ? "Тренер" : "Студент"}
                      </small>
                    </div>
                    <NavLink
                      className="dropdown-item py-3 px-4 d-flex align-items-center"
                      to={profileRoute}
                      onClick={() => setIsDropdownOpen(false)}
                      style={{
                        fontSize: "0.95rem",
                        color: "#495057",
                        textDecoration: "none",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        borderRadius: "0",
                        fontWeight: "500",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(102, 126, 234, 0.1)";
                        e.currentTarget.style.color = "#667eea";
                        e.currentTarget.style.transform = "translateX(5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#495057";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <i
                        className="fas fa-user me-3"
                        style={{ color: "#667eea", width: "16px" }}
                      ></i>
                      Мой профиль
                    </NavLink>
                    <div
                      className="dropdown-divider"
                      style={{
                        margin: "0.5rem 1rem",
                        borderColor: "rgba(102, 126, 234, 0.1)",
                      }}
                    ></div>
                    <button
                      className="dropdown-item py-3 px-4 d-flex align-items-center"
                      onClick={handleLogout}
                      style={{
                        fontSize: "0.95rem",
                        color: "#dc3545",
                        background: "transparent",
                        border: "none",
                        width: "100%",
                        textAlign: "left",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        borderRadius: "0",
                        fontWeight: "500",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(220, 53, 69, 0.1)";
                        e.currentTarget.style.color = "#c82333";
                        e.currentTarget.style.transform = "translateX(5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#dc3545";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <i
                        className="fas fa-sign-out-alt me-3"
                        style={{ width: "16px" }}
                      ></i>
                      Выйти
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes dropdownSlideIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .navbar-transparent {
          background: rgba(255, 255, 255, 0.98) !important;
        }

        .navbar-scrolled {
          background: rgba(255, 255, 255, 0.95) !important;
        }

        @media (max-width: 991.98px) {
          .navbar-collapse {
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
            margin-top: 1rem;
            padding: 1rem;
            border: 1px solid rgba(102, 126, 234, 0.1);
          }

          .navbar-nav {
            text-align: center;
          }

          .nav-link {
            margin: 0.5rem 0;
            padding: 1rem 1.5rem !important;
            border-radius: 12px;
          }

          .d-flex.align-items-center {
            justify-content: center;
            margin-top: 1rem;
            flex-direction: column;
            gap: 1rem;
          }

          .dropdown-menu {
            position: static !important;
            transform: none !important;
            width: 100%;
            margin-top: 1rem;
            box-shadow: none;
            border: 1px solid rgba(102, 126, 234, 0.1);
            border-radius: 12px;
            overflow: hidden;
          }
        }
      `}</style>
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
