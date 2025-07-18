import React, { useState } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTrainerContext } from "../../context/TrainerContext";

const TrainerLogin = () => {
  const navigate = useNavigate();
  const { updateUser } = useTrainerContext();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const trainerlogin = Yup.object().shape({
    email: Yup.string()
      .email("Некорректный email")
      .required("Обязательное поле"),
    password: Yup.string().required("Пароль обязателен."),
  });
  const Trainerlogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

        const res = await fetch(`${apiUrl}/trainer/authenticate`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Отлично!",
            text: "Вход выполнен успешно",
            showConfirmButton: false,
            timer: 1500,
            background: "rgba(255, 255, 255, 0.95)",
            backdrop: "rgba(0, 0, 0, 0.4)",
            customClass: {
              popup: "modern-swal-popup swal2-success",
              title: "modern-swal-title",
              content: "modern-swal-content",
            },
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });

          const data = await res.json();
          updateUser(data);

          navigate("/trainer/managechapter");
        } else {
          const errorData = await res.json();
          Swal.fire({
            icon: "error",
            title: "Ошибка входа",
            text: errorData.message || "Неверный email или пароль!",
          });
        }
      } catch (error) {
        console.error("Login error:", error);
        Swal.fire({
          icon: "error",
          title: "Ошибка",
          text: "Произошла ошибка при входе. Попробуйте еще раз.",
        });
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema: trainerlogin,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="modern-trainer-login-container"
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
              className="modern-trainer-login-card"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "24px",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                overflow: "hidden",
              }}
            >
              <div className="row g-0">
                {/* Левая панель */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="col-lg-6"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    padding: "3rem 2rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    color: "white",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-50%",
                      right: "-50%",
                      width: "200%",
                      height: "200%",
                      background:
                        "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                      animation: "float 6s ease-in-out infinite",
                      pointerEvents: "none",
                      zIndex: 1,
                    }}
                  />
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "700",
                      marginBottom: "1rem",
                      textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    }}
                  >
                    Впервые здесь?
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    style={{
                      fontSize: "1.1rem",
                      marginBottom: "2rem",
                      opacity: 0.9,
                      lineHeight: "1.6",
                    }}
                  >
                    Начните свой путь с нами — зарегистрируйтесь и откройте мир
                    возможностей.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <NavLink
                      to="/main/trainersignup"
                      className="btn btn-light btn-lg"
                      style={{
                        borderRadius: "50px",
                        padding: "12px 32px",
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                        transition: "all 0.3s ease",
                        textDecoration: "none",
                        display: "inline-block",
                        cursor: "pointer",
                        position: "relative",
                        zIndex: 10,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 12px 24px rgba(0,0,0,0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 16px rgba(0,0,0,0.2)";
                      }}
                      onClick={() => {
                        console.log(
                          "Кнопка 'Зарегистрироваться' нажата - переход на /main/trainersignup"
                        );
                      }}
                    >
                      Зарегистрироваться
                    </NavLink>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    style={{ marginTop: "2rem" }}
                  >
                    <img
                      src="/images/login.svg"
                      alt="Вход для тренера"
                      style={{
                        maxWidth: "80%",
                        height: "auto",
                        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* Правая панель - форма */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="col-lg-6"
                  style={{ padding: "3rem 2rem" }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center mb-4"
                  >
                    <h3
                      style={{
                        fontSize: "2.2rem",
                        fontWeight: "700",
                        color: "#333",
                        marginBottom: "0.5rem",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Вход для преподавателя
                    </h3>
                    <p
                      style={{
                        color: "#666",
                        fontSize: "1rem",
                        marginBottom: "0",
                      }}
                    >
                      Войдите в свой аккаунт и продолжите обучение
                    </p>
                  </motion.div>

                  <form onSubmit={Trainerlogin.handleSubmit}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="modern-form-group"
                      style={{ marginBottom: "1.5rem" }}
                    >
                      <div
                        style={{
                          position: "relative",
                          background: "#f8f9fa",
                          borderRadius: "12px",
                          border: "2px solid transparent",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <i
                          className="fas fa-envelope"
                          style={{
                            position: "absolute",
                            left: "16px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#667eea",
                            fontSize: "1.1rem",
                            zIndex: 2,
                          }}
                        />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          autoComplete="off"
                          className="form-control"
                          placeholder="Электронная почта"
                          value={Trainerlogin.values.email}
                          onChange={Trainerlogin.handleChange}
                          style={{
                            border: "none",
                            background: "transparent",
                            padding: "16px 16px 16px 48px",
                            fontSize: "1rem",
                            borderRadius: "12px",
                            outline: "none",
                            width: "100%",
                          }}
                        />
                      </div>
                      {Trainerlogin.errors.email && (
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          style={{
                            color: "#dc3545",
                            fontSize: "0.875rem",
                            marginTop: "0.25rem",
                            display: "block",
                          }}
                        >
                          {Trainerlogin.errors.email}
                        </motion.span>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.0 }}
                      className="modern-form-group"
                      style={{ marginBottom: "1.5rem" }}
                    >
                      <div
                        style={{
                          position: "relative",
                          background: "#f8f9fa",
                          borderRadius: "12px",
                          border: "2px solid transparent",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <i
                          className="fas fa-key"
                          style={{
                            position: "absolute",
                            left: "16px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#667eea",
                            fontSize: "1.1rem",
                            zIndex: 2,
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleShow}
                          style={{
                            position: "absolute",
                            right: "16px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "none",
                            border: "none",
                            color: "#667eea",
                            cursor: "pointer",
                            zIndex: 2,
                          }}
                        >
                          <i
                            className={`far fa-${show ? "eye" : "eye-slash"}`}
                          />
                        </button>
                        <input
                          type={show ? "text" : "password"}
                          id="password"
                          name="password"
                          autoComplete="off"
                          className="form-control"
                          placeholder="Пароль"
                          value={Trainerlogin.values.password}
                          onChange={Trainerlogin.handleChange}
                          style={{
                            border: "none",
                            background: "transparent",
                            padding: "16px 48px",
                            fontSize: "1rem",
                            borderRadius: "12px",
                            outline: "none",
                            width: "100%",
                          }}
                        />
                      </div>
                      {Trainerlogin.errors.password && (
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          style={{
                            color: "#dc3545",
                            fontSize: "0.875rem",
                            marginTop: "0.25rem",
                            display: "block",
                          }}
                        >
                          {Trainerlogin.errors.password}
                        </motion.span>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      className="text-center mb-4"
                    >
                      <NavLink
                        to="/main/resetpassword"
                        style={{
                          color: "#667eea",
                          textDecoration: "none",
                          fontSize: "0.9rem",
                          fontWeight: "500",
                          transition: "color 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = "#764ba2";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = "#667eea";
                        }}
                      >
                        Забыли пароль?
                      </NavLink>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.4 }}
                    >
                      <button
                        className="btn btn-primary btn-lg w-100"
                        type="submit"
                        disabled={Trainerlogin.isSubmitting}
                        style={{
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          border: "none",
                          borderRadius: "50px",
                          padding: "16px 32px",
                          fontSize: "1.1rem",
                          fontWeight: "600",
                          color: "white",
                          boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
                          transition: "all 0.3s ease",
                          position: "relative",
                          overflow: "hidden",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow =
                            "0 12px 32px rgba(102, 126, 234, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow =
                            "0 8px 24px rgba(102, 126, 234, 0.3)";
                        }}
                      >
                        {Trainerlogin.isSubmitting ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "8px",
                            }}
                          >
                            <div
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                              style={{ color: "white" }}
                            />
                            Вход...
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "8px",
                            }}
                          >
                            Войти
                            <i className="fas fa-arrow-right-to-bracket" />
                          </div>
                        )}
                      </button>
                    </motion.div>
                  </form>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .modern-trainer-login-container {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, sans-serif;
        }

        .modern-form-group input:focus {
          border-color: #667eea !important;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
        }

        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .modern-trainer-login-card {
            margin: 1rem;
          }

          .col-lg-6:first-child {
            padding: 2rem 1rem !important;
          }

          .col-lg-6:last-child {
            padding: 2rem 1rem !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default TrainerLogin;
