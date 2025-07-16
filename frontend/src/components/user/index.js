import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import { Footer } from "../main/Footer";

const index = () => {
  const navItems = [
    { label: "Главная", path: "/main/home" },
    { label: "О нас", path: "/main/about" },
    { label: "Курсы", path: "/main/course" },
    { label: "Контакты", path: "/main/contact" },
  ];

  return (
    <div className="main-layout">
      <Navbar
        userType="user"
        navItems={navItems}
        profileRoute="/user/userprofile"
        homeRoute="/main/home"
      />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default index;
