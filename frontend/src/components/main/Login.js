import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="modern-login-container"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",

        padding: "2rem 0",
      }}
    >
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="modern-login-card"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "24px",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                overflow: "hidden",
                padding: "3rem 2rem",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mb-5"
              >
                <h2
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    color: "#333",
                    marginBottom: "1rem",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Выберите тип аккаунта
                </h2>
                <p
                  style={{
                    color: "#666",
                    fontSize: "1.1rem",
                    marginBottom: "0",
                  }}
                >
                  Войдите в свой аккаунт и продолжите обучение
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center mb-4"
              >
                <p
                  style={{
                    color: "#666",
                    fontSize: "1rem",
                    marginBottom: "0",
                  }}
                >
                  Нет аккаунта?{" "}
                  <Link
                    to="/main/signup"
                    style={{
                      color: "#667eea",
                      textDecoration: "none",
                      fontWeight: "600",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#764ba2";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#667eea";
                    }}
                  >
                    Зарегистрируйтесь здесь
                  </Link>
                </p>
              </motion.div>

              <div className="row g-4 justify-content-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="col-lg-5 col-md-6"
                >
                  <Link
                    to="/main/studentlogin"
                    style={{ textDecoration: "none" }}
                  >
                    <motion.div
                      className="modern-account-card"
                      style={{
                        background: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "20px",
                        padding: "2rem",
                        textAlign: "center",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        transition: "all 0.3s ease",
                        position: "relative",
                        overflow: "hidden",
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-50%",
                          right: "-50%",
                          width: "200%",
                          height: "200%",
                          background:
                            "radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)",
                          animation: "float 6s ease-in-out infinite",
                          pointerEvents: "none",
                          zIndex: 1,
                        }}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.0 }}
                        style={{ position: "relative", zIndex: 2 }}
                      >
                        <img
                          src="/icons/student_icon.jpg"
                          alt="Ученик"
                          style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginBottom: "1rem",
                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                          }}
                        />
                        <h3
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "700",
                            color: "#333",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Ученик
                        </h3>
                        <p
                          style={{
                            color: "#666",
                            fontSize: "0.9rem",
                            marginBottom: "0",
                          }}
                        >
                          Войдите в аккаунт ученика
                        </p>
                      </motion.div>
                    </motion.div>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="col-lg-5 col-md-6"
                >
                  <Link
                    to="/main/trainerlogin"
                    style={{ textDecoration: "none" }}
                  >
                    <motion.div
                      className="modern-account-card"
                      style={{
                        background: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "20px",
                        padding: "2rem",
                        textAlign: "center",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        transition: "all 0.3s ease",
                        position: "relative",
                        overflow: "hidden",
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-50%",
                          right: "-50%",
                          width: "200%",
                          height: "200%",
                          background:
                            "radial-gradient(circle, rgba(118, 75, 162, 0.1) 0%, transparent 70%)",
                          animation: "float 6s ease-in-out infinite",
                          pointerEvents: "none",
                          zIndex: 1,
                        }}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        style={{ position: "relative", zIndex: 2 }}
                      >
                        <img
                          src="/icons/teacher_icon.jpg"
                          alt="Преподаватель"
                          style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginBottom: "1rem",
                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                          }}
                        />
                        <h3
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "700",
                            color: "#333",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Преподаватель
                        </h3>
                        <p
                          style={{
                            color: "#666",
                            fontSize: "0.9rem",
                            marginBottom: "0",
                          }}
                        >
                          Войдите в аккаунт преподавателя
                        </p>
                      </motion.div>
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .modern-login-container {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, sans-serif;
        }

        .modern-account-card:hover {
          transform: translateY(-5px);
        }

        @media (max-width: 768px) {
          .modern-login-card {
            margin: 1rem;
            padding: 2rem 1rem !important;
          }

          .col-lg-5 {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Login;
