import React from "react";
import Navbar from "../common/Navbar";

/**
 * Компонент навигации для основных страниц
 * @return {JSX.Element} Компонент навигации
 */
const MainNavbar = () => {
  const navItems = [
    { label: "Главная", path: "/main/home" },
    { label: "О нас", path: "/main/about" },
    { label: "Курсы", path: "/main/course" },
    { label: "Контакты", path: "/main/contact" },
  ];

  return (
    <Navbar
      userType="user"
      navItems={navItems}
      profileRoute="/user/userprofile"
      homeRoute="/main/home"
    />
  );
};

export default MainNavbar;
