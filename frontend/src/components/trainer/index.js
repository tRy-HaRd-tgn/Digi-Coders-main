import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Footer } from "../main/Footer";

const Trainer = () => {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Trainer;
