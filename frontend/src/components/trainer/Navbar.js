import React from "react";
import Navbar from "../common/Navbar";

/**
 * Компонент навигации для тренера
 * @return {JSX.Element} Компонент навигации
 */
const TrainerNavbar = () => {
  const navItems = [
    { label: "Главная", path: "/trainer/home" },
    { label: "О нас", path: "/trainer/about" },
    { label: "Управление главами", path: "/trainer/managechapter" },
    { label: "Контакты", path: "/trainer/contact" },
  ];

  return (
    <Navbar
      userType="trainer"
      navItems={navItems}
      profileRoute="/trainer/trainerprofile"
      homeRoute="/trainer/home"
    />
  );
};

export default TrainerNavbar;
