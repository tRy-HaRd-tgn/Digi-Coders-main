import React, { useState } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import app_config from "../../config";
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
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0.5, x: -300 }}
      transition={{ type: "spring" }}
      className="vid-manage-bg"
      // style={{
      //   backgroundImage: `url('/images/bg-animation-img2.jpg`
      // }}
    >
      <section className="form">
        <div className="">
          <div className="row g-0">
            <div className="col-lg-6 curve">
              <div className="pt-5" style={{ marginLeft: "285px" }}>
                <h2 className="my-1">Впервые здесь?</h2>
              </div>

              <div className="py-2" style={{ marginLeft: "100px" }}>
                <div className="d-flex flex-row align-items-center">
                  <div className="flex-fill text-center mb-2 mx-5">
                    <p>
                      Начните свой путь с нами — зарегистрируйтесь и откройте
                      мир возможностей.
                    </p>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <div className="flex-fill text-center mb-2">
                    <NavLink
                      to="/main/trainersignup"
                      className="btn btn-primary"
                    >
                      Зарегистрироваться
                    </NavLink>
                  </div>
                </div>
                <img
                  src="/images/login.svg"
                  className="image"
                  alt=""
                  style={{
                    height: 400,
                    marginTop: "10%",
                    marginLeft: "-5%",
                  }}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-5">
                <div className="text-center mb-5">
                  <h3 className="my-5 text-center">Вход для преподавателя</h3>
                </div>
                <form
                  className="mx-md-5 text-black"
                  onSubmit={Trainerlogin.handleSubmit}
                >
                  <div className="form-group has-icon mb-4">
                    <i className="fas fa-envelope fa-lg form-control-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="off"
                      className="form-control form-control-lg"
                      placeholder="Электронная почта"
                      value={Trainerlogin.values.email}
                      onChange={Trainerlogin.handleChange}
                    />
                    <span
                      className="text-danger"
                      style={{ minHeight: 20, display: "block" }}
                    >
                      {Trainerlogin.errors.email}
                    </span>
                  </div>

                  <div className="form-group has-icon mb-4">
                    <i className="fas fa-key fa-lg form-control-icon" />
                    <div className="d-grid d-md-flex justify-content-md-end">
                      <span className="form-control-eye" onClick={handleShow}>
                        {show ? (
                          <i
                            className="far fa-eye"
                            style={{ color: "#c5c5c5" }}
                          />
                        ) : (
                          <i
                            className="far fa-eye-slash"
                            style={{ color: "#c5c5c5" }}
                          />
                        )}
                      </span>
                    </div>
                    <input
                      type={show ? "text" : "password"}
                      id="password"
                      name="password"
                      autoComplete="off"
                      className="form-control form-control-lg"
                      placeholder="Пароль"
                      value={Trainerlogin.values.password}
                      onChange={Trainerlogin.handleChange}
                    />
                    <span
                      className="text-danger"
                      style={{ minHeight: 20, display: "block" }}
                    >
                      {Trainerlogin.errors.password}
                    </span>
                  </div>
                  <div className="mb-4 text-center">
                    <NavLink className="nav-link" to="/main/resetpassword">
                      Забыли пароль?
                    </NavLink>
                  </div>
                  <div className="pt-1 pb-1">
                    <button
                      className="btn btn-primary btn-block mb-5"
                      type="submit"
                      disabled={Trainerlogin.isSubmitting}
                      style={{ borderRadius: "10px", marginLeft: "0px" }}
                    >
                      {Trainerlogin.isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Вход...
                        </>
                      ) : (
                        <>
                          Войти &nbsp;
                          <i className="fas fa-arrow-right-to-bracket" />
                        </>
                      )}
                    </button>

                    <div>{/* Социальные кнопки входа удалены */}</div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default TrainerLogin;
