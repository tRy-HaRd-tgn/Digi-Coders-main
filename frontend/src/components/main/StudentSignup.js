import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import app_config from "../../config";
import jwt_decode from "jwt-decode";
import { useUserContext } from "../../context/UserContext";
import {
  initializeGoogleSignIn,
  renderGoogleButton,
  promptGoogleSignIn,
} from "../../utils/googleAuth";

const StudentSignup = () => {
  const navigate = useNavigate();

  const [selImage, setSelImage] = useState(null);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState("");

  const { loggedIn, setLoggedIn } = useUserContext();

  const StudentsignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Слишком короткое имя!")
      .max(50, "Слишком длинное имя!")
      .required("Обязательное поле"),
    email: Yup.string()
      .email("Некорректный email")
      .required("Обязательное поле"),
    password: Yup.string().required("Пожалуйста, введите пароль"),
    mobile_no: Yup.string().required("Обязательное поле"),
    avatar: Yup.string().required("Обязательное поле"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    //   "Пароль должен содержать минимум 8 символов, одну заглавную, одну строчную букву, одну цифру и один специальный символ"
    // ),
  });

  const studentsignupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      avatar: "",
      mobile_no: "",
      createdAt: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Убеждаемся, что avatar установлен
        if (!selImage) {
          Swal.fire({
            icon: "error",
            title: "Ошибка",
            text: "Пожалуйста, загрузите изображение",
          });
          return;
        }

        values.avatar = selImage.name;
        values.createdAt = new Date();

        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

        const res = await fetch(`${apiUrl}/user/add`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Поздравляем!",
            text: "Ваш аккаунт успешно создан",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/main/studentlogin");
        } else {
          const errorData = await res.json();
          Swal.fire({
            icon: "error",
            title: "Ошибка...",
            text: errorData.message || "Что-то пошло не так!",
          });
        }
      } catch (error) {
        console.error("Registration error:", error);
        Swal.fire({
          icon: "error",
          title: "Ошибка",
          text: "Произошла ошибка при регистрации. Попробуйте еще раз.",
        });
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema: StudentsignupSchema,
  });

  const uploadFile = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    setSelImage(file);
    fd.append("myfile", file);

    // Устанавливаем значение для поля avatar в форме
    if (file) {
      studentsignupForm.setFieldValue("avatar", file.name);
    }

    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
    fetch(`${apiUrl}/util/uploadfile`, {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
      }
    });
  };

  const handleSignOut = (event) => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  };

  const saveGoogleUser = async (googleObj) => {
    setAvatar(googleObj.picture);
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const response = await fetch(`${apiUrl}/user/add`, {
      method: "POST",
      body: JSON.stringify({
        username: googleObj.name,
        email: googleObj.email,
        avatar: googleObj.picture,
        createdAt: new Date(),
        type: "google",
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      const data = await response.json();
      sessionStorage.setItem("user", JSON.stringify(data));
      setLoggedIn(true);
      navigate("/");
    }
  };

  const handleCallbackResponse = async (response) => {
    try {
      if (!response || !response.credential) {
        throw new Error("Invalid response from Google Sign-In");
      }

      var userObject = jwt_decode(response.credential);

      setUser(userObject);

      const signInDiv = document.getElementById("signInDiv");
      if (signInDiv) {
        signInDiv.hidden = true;
      }
      sessionStorage.setItem("user", JSON.stringify(userObject));

      navigate("/main/course");
    } catch (error) {
      console.error("Error handling Google Sign-In response:", error);
      Swal.fire({
        icon: "error",
        title: "Ошибка входа",
        text: "Не удалось войти через Google. Попробуйте другой способ.",
      });
    }
  };

  useEffect(() => {
    const clientId =
      "941149713723-22urp8pss6cdudmhnf9007ak61t6t68j.apps.googleusercontent.com";

    // Инициализируем Google Sign-In
    if (initializeGoogleSignIn(clientId, handleCallbackResponse)) {
      // Рендерим кнопку
      if (renderGoogleButton("signInDiv")) {
      } else {
      }
    } else {
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="modern-signup-container"
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
              className="modern-signup-card"
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
                    Уже с нами?
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
                    Войдите в свой аккаунт и продолжайте обучение!
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <NavLink
                      to="/main/studentlogin"
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
                          "Кнопка 'Войти' нажата - переход на /main/studentlogin"
                        );
                      }}
                    >
                      Войти
                    </NavLink>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    style={{ marginTop: "2rem" }}
                  >
                    <img
                      src="/images/register.svg"
                      alt="Регистрация"
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
                      Регистрация ученика
                    </h3>
                    <p
                      style={{
                        color: "#666",
                        fontSize: "1rem",
                        marginBottom: "0",
                      }}
                    >
                      Создайте свой аккаунт и начните обучение
                    </p>
                  </motion.div>

                  <form onSubmit={studentsignupForm.handleSubmit}>
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
                        onFocus={(e) => {
                          e.target.style.borderColor = "#667eea";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(102, 126, 234, 0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "transparent";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        <i
                          className="fas fa-user"
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
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Имя"
                          value={studentsignupForm.values.name}
                          onChange={studentsignupForm.handleChange}
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
                      {studentsignupForm.errors.name && (
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
                          {studentsignupForm.errors.name}
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
                          value={studentsignupForm.values.email}
                          onChange={studentsignupForm.handleChange}
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
                      {studentsignupForm.errors.email && (
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
                          {studentsignupForm.errors.email}
                        </motion.span>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
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
                          value={studentsignupForm.values.password}
                          onChange={studentsignupForm.handleChange}
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
                      {studentsignupForm.errors.password && (
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
                          {studentsignupForm.errors.password}
                        </motion.span>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.4 }}
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
                          className="fas fa-mobile-screen-button"
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
                          type="text"
                          id="mobile_no"
                          name="mobile_no"
                          className="form-control"
                          placeholder="Мобильный номер"
                          value={studentsignupForm.values.mobile_no}
                          onChange={studentsignupForm.handleChange}
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
                      {studentsignupForm.errors.mobile_no && (
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
                          {studentsignupForm.errors.mobile_no}
                        </motion.span>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.6 }}
                      style={{ marginBottom: "2rem" }}
                    >
                      <label
                        htmlFor="avatar-img"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "12px 24px",
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          color: "white",
                          borderRadius: "50px",
                          cursor: "pointer",
                          fontSize: "0.9rem",
                          fontWeight: "600",
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow =
                            "0 6px 16px rgba(102, 126, 234, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow =
                            "0 4px 12px rgba(102, 126, 234, 0.3)";
                        }}
                      >
                        <i className="fas fa-upload" />
                        Загрузить изображение
                      </label>
                      <input
                        type="file"
                        id="avatar-img"
                        hidden
                        onChange={uploadFile}
                      />
                      <span
                        style={{
                          color: selImage ? "#28a745" : "#6c757d",
                          fontSize: "0.875rem",
                          marginLeft: "12px",
                          fontWeight: "500",
                        }}
                      >
                        {selImage ? selImage.name : "Изображение не выбрано"}
                      </span>
                      {studentsignupForm.errors.avatar && (
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
                          {studentsignupForm.errors.avatar}
                        </motion.span>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.8 }}
                    >
                      <button
                        className="btn btn-primary btn-lg w-100"
                        type="submit"
                        disabled={studentsignupForm.isSubmitting}
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
                        {studentsignupForm.isSubmitting ? (
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
                            Регистрация...
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
                            Зарегистрироваться
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

        .modern-signup-container {
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
          .modern-signup-card {
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

export default StudentSignup;
