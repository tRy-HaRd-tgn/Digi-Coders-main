import React, { useState } from "react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import app_config from "../../config";
import * as Yup from "yup";

const Home = () => {
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    feedbackForm.setFieldValue("emoji", emoji);
  };

  const feedbackValidationSchema = Yup.object().shape({
    name: Yup.string().required("Пожалуйста, введите имя"),
    email: Yup.string()
      .email("Некорректный email")
      .required("Пожалуйста, введите email"),
    emoji: Yup.string().required("Пожалуйста, выберите оценку"),
    message: Yup.string().required("Пожалуйста, введите сообщение"),
  });

  const feedbackForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      emoji: "",
      message: "",
    },
    validationSchema: feedbackValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      values.emoji = selectedEmoji;

      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

      const res = await fetch(`${apiUrl}/contact/add`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: "Your feedback is successfully submitted",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        resetForm();
        setSelectedEmoji("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    },
  });

  return (
    <div>
      <>
        <header>
          <div
            className="p-5 mb-10 text-center bg-image"
            style={{
              backgroundImage: 'url("/images/banner.gif")',
              height: 600,
              backgroundSize: "cover",
              backgroundPosition: "50% 40%",
              backgroundColor: "rgba(0, 0, 0, 0)",
            }}
          ></div>
        </header>
      </>

      <>
        <div className="container mb-8">
          <section>
            <div className="heading">
              <h2 className="mt-5 mb-3 text-center display-3">
                <span>Преимущества выбора нас</span>
              </h2>
            </div>
            <div className="sub-heading">
              <h4 className="mb-8 text-center">
                <span>Развивайте свои навыки вместе с нами</span>
              </h4>
            </div>

            <div className="row" style={{ display: "flex" }}>
              <div className="col-md-6 col-xl-3" style={{ height: "100%" }}>
                <div
                  className="card rounded-7 shadow-4-strong text-center text-white h-100"
                  style={{
                    backgroundColor: "#29c1fe",
                    height: "100%",
                    minHeight: "420px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div className="card-body">
                    <p className="mt-4 pt-2">
                      <i className="fas fa-chalkboard-user fa-4x" />
                    </p>
                    <h5 className="font-weight-normal text-white my-4 py-2">
                      Интерактивное обучение
                    </h5>
                    <p className="mb-4">
                      Практический подход к обучению детей основам
                      программирования, развитие критического мышления и навыков
                      решения задач.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="col-md-6 col-xl-3 mb-4"
                style={{ height: "100%" }}
              >
                <div
                  className="card rounded-7 shadow-4-strong text-center text-white h-100"
                  style={{
                    backgroundColor: "#000",
                    height: "100%",
                    minHeight: "420px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div className="card-body">
                    <p className="mt-4 pt-2">
                      <i className="fas fa-briefcase fa-4x" />
                    </p>
                    <h5 className="font-weight-normal text-white my-4 py-2">
                      Персонализированная программа
                    </h5>
                    <p className="mb-4">
                      Индивидуальная программа обучения для детей с учетом их
                      стиля, интересов и способностей.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-xl-3" style={{ height: "100%" }}>
                <div
                  className="card rounded-7 shadow-4-strong text-center text-white h-100"
                  style={{
                    backgroundColor: "#29c1fe",
                    height: "100%",
                    minHeight: "420px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div className="card-body">
                    <p className="mt-4 pt-2">
                      <i className="fas fa-gamepad fa-4x" />
                    </p>
                    <h5 className="font-weight-normal text-white my-4 py-2">
                      Обучение через игры
                    </h5>
                    <p className="mb-4">
                      Игровой подход к обучению новым концепциям и навыкам
                      программирования.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="col-md-6 col-xl-3 mb-4"
                style={{ height: "100%" }}
              >
                <div
                  className="card rounded-7 shadow-4-strong text-center text-white h-100"
                  style={{
                    backgroundColor: "#000",
                    height: "100%",
                    minHeight: "420px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div className="card-body">
                    <p className="mt-4 pt-2">
                      <i className="fas fa-award fa-4x" />
                    </p>
                    <h5 className="font-weight-normal text-white my-4 py-2">
                      Сертификат об окончании
                    </h5>
                    <p className="mb-4">
                      Вручается детям за успешное завершение интерактивного
                      курса или программы.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>

      <>
        <div className="mb-7">
          <div style={{ display: "none" }} />
          <div>
            <div data-draggable="true" style={{ position: "relative" }}>
              <section
                draggable="false"
                className="overflow-hidden pt-0"
                data-v-271253ee=""
              >
                <section>
                  {" "}
                  <div
                    className="py-2 text-center"
                    style={{ backgroundColor: "#f6feff" }}
                  >
                    <div className="container pb-md-5">
                      <div className="row d-flex justify-content-center">
                        <div className="header-text col-lg-10">
                          <div className="heading">
                            <h2 className="mt-5 mb-3 display-3">
                              <span>Почему выбирают нас?</span>
                            </h2>
                          </div>
                          <div className="sub-heading">
                            <h4 className="mb-6">
                              <span>Инновационный подход к обучению</span>
                            </h4>
                          </div>
                          <div className="content">
                            <p className="mb-6">
                              <span>
                                В Digi Coders мы верим, что каждый ребенок может
                                стать создателем, новатором и решателем проблем.
                                Поэтому мы создали увлекательную платформу для
                                юных программистов, чтобы они могли учиться,
                                создавать и исследовать мир программирования.
                                Наша программа помогает детям раскрыть
                                творческий потенциал, создавать собственные
                                проекты и развивать важные навыки
                                программирования для успешного будущего.
                              </span>
                            </p>
                          </div>
                          <NavLink
                            className="btn btn-primary py-3 px-5 mb-5 mb-md-3 me-md-2"
                            to="/main/signup"
                            role="button"
                            aria-controls="#picker-editor"
                          >
                            Начать обучение
                          </NavLink>{" "}
                          <NavLink
                            className="btn btn-primary py-3 px-5 mb-5 mb-md-3 me-md-2"
                            to="/main/about"
                            role="button"
                            aria-controls="#picker-editor"
                          >
                            Подробнее
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                </section>
              </section>
              {/**/}
            </div>
          </div>
        </div>
      </>

      <div id="feedback-form-wrapper">
        <div id="floating-icon">
          <button
            type="button"
            className="btn btn-sm rounded-4"
            data-mdb-toggle="modal"
            data-mdb-target="#exampleModal"
            style={{ zIndex: 2 }}
          >
            Feedback
          </button>
        </div>
        <div id="feedback-form-modal">
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div
                className="modal-content"
                style={{ backgroundColor: "#f4f4f4" }}
              >
                <div className="d-md-flex justify-content-md-end mt-2 me-2">
                  <button
                    type="button"
                    className="btn-close"
                    data-mdb-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <form
                    className="feedback-form mx-1 mx-md-4 text-black"
                    onSubmit={feedbackForm.handleSubmit}
                  >
                    <div className="d-flex flex-row align-items-center mb-5">
                      <div className="flex-fill mb-0">
                        <div className="mb-5">
                          <h3>Насколько это было полезно?</h3>
                        </div>
                        <div className="form-group has-icon mb-4">
                          <i className="fas fa-user fa-lg form-control-icon" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control form-control-lg"
                            placeholder="Введите полное имя"
                            value={feedbackForm.values.name}
                            onChange={feedbackForm.handleChange}
                            onBlur={feedbackForm.handleBlur}
                          />
                          {feedbackForm.touched.name &&
                            feedbackForm.errors.name && (
                              <div
                                className="text-danger"
                                style={{ fontSize: "0.9em" }}
                              >
                                {feedbackForm.errors.name}
                              </div>
                            )}
                        </div>
                        <div className="form-group has-icon mb-4">
                          <i className="fas fa-envelope fa-lg form-control-icon" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control form-control-lg"
                            placeholder="Введите адрес электронной почты"
                            value={feedbackForm.values.email}
                            onChange={feedbackForm.handleChange}
                            onBlur={feedbackForm.handleBlur}
                          />
                          {feedbackForm.touched.email &&
                            feedbackForm.errors.email && (
                              <div
                                className="text-danger"
                                style={{ fontSize: "0.9em" }}
                              >
                                {feedbackForm.errors.email}
                              </div>
                            )}
                        </div>
                        <div className="d-flex flex-row justify-content-center mb-4">
                          <div className="item">
                            <label htmlFor="0">
                              <input
                                className="radio"
                                type="radio"
                                name="emoji"
                                id="0"
                                value="🤬"
                                checked={selectedEmoji === "🤬"}
                                onChange={() => handleEmojiSelect("🤬")}
                              />
                              <span>🤬</span>
                            </label>
                          </div>
                          <div className="item">
                            <label htmlFor="1">
                              <input
                                className="radio"
                                type="radio"
                                name="emoji"
                                id="1"
                                value="🙁"
                                checked={selectedEmoji === "🙁"}
                                onChange={() => handleEmojiSelect("🙁")}
                              />
                              <span>🙁</span>
                            </label>
                          </div>
                          <div className="item">
                            <label htmlFor="2">
                              <input
                                className="radio"
                                type="radio"
                                name="emoji"
                                id="2"
                                value="😶"
                                checked={selectedEmoji === "😶"}
                                onChange={() => handleEmojiSelect("😶")}
                              />
                              <span>😶</span>
                            </label>
                          </div>
                          <div className="item">
                            <label htmlFor="3">
                              <input
                                className="radio"
                                type="radio"
                                name="emoji"
                                id="3"
                                value="😁"
                                checked={selectedEmoji === "😁"}
                                onChange={() => handleEmojiSelect("😁")}
                              />
                              <span>😁</span>
                            </label>
                          </div>
                          <div className="item">
                            <label htmlFor="4">
                              <input
                                className="radio"
                                type="radio"
                                name="emoji"
                                id="4"
                                value="😍"
                                checked={selectedEmoji === "😍"}
                                onChange={() => handleEmojiSelect("😍")}
                              />
                              <span>😍</span>
                            </label>
                          </div>
                        </div>
                        {feedbackForm.touched.emoji &&
                          feedbackForm.errors.emoji && (
                            <div
                              className="text-danger text-center mb-2"
                              style={{ fontSize: "0.9em" }}
                            >
                              {feedbackForm.errors.emoji}
                            </div>
                          )}
                        <div className="form-group has-icon mb-5">
                          <i className="fas fa-pencil-alt fa-lg form-control-icon" />

                          <textarea
                            className="form-control form-control-lg"
                            id="textarea"
                            rows="4"
                            placeholder="Введите сообщение..."
                            name="message"
                            value={feedbackForm.values.message}
                            onChange={feedbackForm.handleChange}
                            onBlur={feedbackForm.handleBlur}
                          ></textarea>
                          {feedbackForm.touched.message &&
                            feedbackForm.errors.message && (
                              <div
                                className="text-danger"
                                style={{ fontSize: "0.9em" }}
                              >
                                {feedbackForm.errors.message}
                              </div>
                            )}
                        </div>
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                          style={{ borderRadius: "10px", marginLeft: "0px" }}
                          disabled={
                            feedbackForm.isSubmitting || !feedbackForm.isValid
                          }
                        >
                          Отправить отзыв &nbsp;
                          <i className="far fa-paper-plane" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <div data-draggable="true">
          <section draggable="false" className="container" data-v-271253ee="">
            <section>
              <div className="heading">
                <h2 className="mb-3 text-center display-3">
                  <span>Наши популярные курсы</span>
                </h2>
              </div>
              <div className="sub-heading">
                <h4 className="mb-8 text-center">
                  <span>
                    Откройте для себя мир программирования с нашими курсами
                  </span>
                </h4>
              </div>
              <div className="row text-center gx-lg-5 mb-6">
                <div className="col-lg-4 col-md-12 mb-lg-0 hover-zoom">
                  <div className="card">
                    <div
                      className="mt-n3 bg-image hover-overlay ripple mx-3 shadow-4-strong rounded-6"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        src="/images/course-html.jpg"
                        className="img-fluid"
                      />
                      <NavLink to="/user/viewchapters?category=HTML">
                        <div
                          className="mask"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.15)",
                          }}
                        />
                      </NavLink>
                    </div>
                    <div className="card-body">
                      <h4
                        className="card-tittle my-3"
                        style={{
                          backgroundColor: "#f1f1f1",
                          fontSize: "32px",
                          letterSpacing: "1px",
                        }}
                      >
                        <strong>HTML</strong>
                      </h4>
                      <h5 className="mb-3">
                        <strong>26 занятий</strong>
                      </h5>
                      <h6 className="mb-3">
                        Длительность: <strong>2 недели</strong>
                      </h6>

                      <hr className="hr hr-blurry" />

                      <p className="card-text">
                        Идеальный курс, чтобы дети быстро освоили основы html и
                        начали писать код с помощью блоков.
                      </p>
                      <NavLink
                        to="/user/viewchapters?category=HTML"
                        className="btn btn-primary my-3"
                      >
                        Подробнее
                      </NavLink>
                    </div>
                  </div>
                </div>
                {/* First column */}
                {/* Second column */}
                <div className="col-lg-4 col-md-12 mb-lg-0 hover-zoom">
                  <div className="card">
                    <div
                      className="mt-n3 bg-image hover-overlay ripple mx-3 shadow-4-strong rounded-6"
                      data-mdb-ripple-color="light"
                    >
                      <img src="/images/course-js.jpg" className="img-fluid" />
                      <NavLink to="/user/viewchapters?category=JavaScript">
                        <div
                          className="mask"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.15)",
                          }}
                        />
                      </NavLink>
                    </div>
                    <div className="card-body">
                      <h4
                        className="card-tittle my-3"
                        style={{
                          backgroundColor: "#f1f1f1",
                          fontSize: "32px",
                          letterSpacing: "1px",
                        }}
                      >
                        <strong>JavaScript</strong>
                      </h4>
                      <h5 className="mb-3">
                        <strong>26 занятий</strong>
                      </h5>
                      <h6 className="mb-3">
                        Длительность: <strong>2 недели</strong>
                      </h6>

                      <hr className="hr hr-blurry" />

                      <p className="card-text">
                        Идеальный курс, чтобы дети быстро освоили основы
                        javascript и начали писать код с помощью блоков.
                      </p>

                      <NavLink
                        to="/user/viewchapters?category=JavaScript"
                        className="btn btn-primary my-3"
                      >
                        Подробнее
                      </NavLink>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-12 mb-lg-0 hover-zoom">
                  <div className="card">
                    <div
                      className="mt-n3 bg-image hover-overlay ripple mx-3 shadow-4-strong rounded-6"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        src="/images/course-python.jpg"
                        className="img-fluid"
                      />
                      <NavLink to="/user/viewchapters?category=Python">
                        <div
                          className="mask"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.15)",
                          }}
                        />
                      </NavLink>
                    </div>
                    <div className="card-body">
                      <h4
                        className="card-tittle my-3"
                        style={{
                          backgroundColor: "#f1f1f1",
                          fontSize: "32px",
                          letterSpacing: "1px",
                        }}
                      >
                        <strong>Python</strong>
                      </h4>
                      <h5 className="mb-3">
                        <strong>26 занятий</strong>
                      </h5>
                      <h6 className="mb-3">
                        Длительность: <strong>2 недели</strong>
                      </h6>
                      {/* Divider here */}
                      <hr className="hr hr-blurry" />

                      <p className="card-text">
                        Идеальный курс, чтобы дети быстро освоили основы python
                        и начали писать код с помощью блоков.
                      </p>

                      <NavLink
                        to="/user/viewchapters?category=Python"
                        className="btn btn-primary my-3"
                      >
                        Подробнее
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
          {/**/}
        </div>
      </div>

      <>
        <div className="mb-10">
          <div style={{ display: "none" }} />
          <div>
            <div data-draggable="true" style={{ position: "relative" }}>
              <section
                draggable="false"
                className="overflow-hidden pt-0"
                data-v-271253ee=""
              >
                <section className="overflow-hidden">
                  {" "}
                  <div
                    className="px-4 py-5 px-md-5 text-center bg-image"
                    style={{
                      backgroundImage: 'url("/images/background-img1.jpg")',
                      height: 450,
                      backgroundSize: "cover",
                      backgroundPosition: "50% 50%",
                      backgroundAttachment: "fixed",
                      position: "relative",
                    }}
                    aria-controls="#picker-editor"
                  >
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(35, 37, 45, 0.6)" }}
                    >
                      <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                          <div className="col-lg-10">
                            <div className="content pb-5">
                              <h1 className="mt-5 mb-6 display-3 text-stroke">
                                <span>
                                  Начните свой путь в программировании уже
                                  сегодня и воплотите свои мечты в реальность!
                                </span>{" "}
                                <br />{" "}
                                {/* <span className="">and</span> <br />{" "}
                                <span className="">make your dreams a reality!&nbsp;</span>{" "} */}
                              </h1>{" "}
                              <NavLink
                                className="btn btn-primary py-3 px-5 mb-5 mb-md-3 me-md-2"
                                to="/main/signup"
                                role="button"
                                aria-controls="#picker-editor"
                              >
                                Начать обучение
                              </NavLink>{" "}
                              <NavLink
                                className="btn btn-primary py-3 px-5 mb-5 mb-md-3 me-md-2"
                                to="/main/about"
                                role="button"
                                aria-controls="#picker-editor"
                              >
                                Подробнее
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className=""
                    style={{
                      height: 30,
                      marginTop: "-30px",
                      transform: "scale(2)",
                      transformOrigin: "top center",
                      color: "#fff",
                    }}
                  ></div>{" "}
                </section>
              </section>
            </div>
          </div>
        </div>
      </>

      <div className="mb-10">
        <div data-draggable="true">
          <section draggable="false" className="container" data-v-271253ee="">
            <section>
              <div className="heading">
                <h2 className="mb-3 text-center display-3">
                  <span>Почему детям стоит учиться программированию</span>
                </h2>
              </div>
              <div className="sub-heading">
                <h4 className="mb-8 text-center">
                  <span>Программирование — язык будущего</span>
                </h4>
              </div>

              <div className="row gx-lg-5 mb-5 align-items-center">
                <div className="col-md-6 mb-4 mb-md-0">
                  {" "}
                  <img
                    src="/images/img4.jpg"
                    className="w-100 shadow-4-strong rounded-7 mb-4"
                    alt=""
                    aria-controls="#picker-editor"
                  />{" "}
                </div>
                <div className="content text-center col-md-6 mb-4 mb-md-0">
                  <h4 className="fw-bold mb-3">
                    <strong>Готовит к будущему</strong>
                  </h4>
                  <p className="align-items-justify mb-4">
                    В современном цифровом мире программирование становится
                    важным навыком для многих профессий. Осваивая
                    программирование с раннего возраста, дети лучше подготовлены
                    к будущему и получают конкурентное преимущество на рынке
                    труда.
                  </p>
                </div>
              </div>

              {/* row - 2 */}
              <div className="row gx-lg-5 mb-5 flex-lg-row-reverse align-items-center">
                <div className="col-md-6 mb-4 mb-md-0">
                  {" "}
                  <img
                    src="/images/img7.jpg"
                    className="w-100 shadow-4-strong rounded-7 mb-4"
                    alt=""
                    aria-controls="#picker-editor"
                  />{" "}
                </div>
                <div className="content text-center col-md-6 mb-4 mb-md-0">
                  <h4 className="fw-bold mb-3">
                    <strong>Развивает логическое мышление</strong>
                  </h4>
                  <p className="align-items-justify mb-4">
                    Программирование помогает детям развивать логическое
                    мышление. Они учатся структурировать мысли и разбивать
                    сложные задачи на простые части. Этот навык полезен не
                    только в программировании, но и в жизни.
                  </p>{" "}
                </div>
              </div>

              <div className="row gx-lg-5 mb-5 align-items-center">
                <div className="col-md-6 mb-4 mb-md-0">
                  {" "}
                  <img
                    src="/images/img3.jpg"
                    className="w-100 shadow-4-strong rounded-7 mb-4"
                    alt=""
                    aria-controls="#picker-editor"
                  />{" "}
                </div>
                <div className="content text-center col-md-6 mb-4 mb-md-0">
                  <h4 className="fw-bold mb-3">
                    <strong>Формирует навыки решения проблем</strong>
                  </h4>
                  <p className="align-items-justify mb-4">
                    Обучение программированию помогает детям развивать навыки
                    решения проблем, разбивать задачи на части и находить пути
                    их решения с помощью кода. Этот навык полезен в разных
                    сферах жизни.
                  </p>{" "}
                </div>
              </div>
            </section>
          </section>
          {/**/}
        </div>
      </div>

      <>
        <div className="mb-10">
          <div
            className=""
            data-draggable="true"
            style={{
              backgroundImage: 'url("/images/background-img2.jpeg")',
              backgroundAttachment: "fixed",
              position: "relative",
              minHeight: 750,
              height: "auto",
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
            }}
            aria-controls="#picker-editor"
          >
            <div
              className="mask"
              style={{ backgroundColor: "rgba(35, 37, 45, 0.6)" }}
            >
              <section
                draggable="false"
                className="container pt-5"
                data-v-271253ee=""
              >
                <section>
                  <div className="main-heading">
                    <h2 className="mb-3 text-center display-3">
                      <span>Отзывы</span>
                    </h2>
                  </div>
                  <div className="sub-heading">
                    <h4 className="mb-8 text-center">
                      <span>Что говорят клиенты</span>
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="row text-center gx-lg-5">
                      <div className="col-lg-4 mb-5 mb-lg-0 hover-zoom">
                        <div>
                          <div
                            className="rounded-7 p-4 shadow-3"
                            style={{ backgroundColor: "hsl(218, 62.2%, 95%)" }}
                          >
                            <h6 className="text-muted fw-bold mt-4 mb-2">
                              Родитель
                            </h6>
                            <div className="name">
                              <p className="h5 fw-bold mb-1">Gauri Parulkar</p>
                            </div>
                            <ul className="list-unstyled d-flex justify-content-center text-warning mb-2">
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="far fa-star fa-sm" />
                              </li>
                            </ul>

                            <hr className="hr hr-blurry"></hr>

                            <i
                              className="fa-solid fa-quote-left fa-sm"
                              style={{ color: "#29c1fe" }}
                            ></i>
                            <p className="pb-4 mb-4">
                              Я очень рада, что мы нашли этот сайт для нашего
                              ребенка. Приятно наблюдать, как развиваются его
                              навыки программирования, и ему очень нравятся
                              интерактивные задания. <br /> Очень рекомендую!
                            </p>
                          </div>
                          <img
                            src="/images/review1.jpg"
                            className="w-100 rounded-circle mt-n5 shadow-5-strong"
                            style={{ maxWidth: 100 }}
                            alt="Avatar"
                          />
                        </div>
                      </div>

                      <div className="col-lg-4 mb-5 mb-lg-0 hover-zoom">
                        <div>
                          <div
                            className="rounded-7 p-4 shadow-3"
                            style={{ backgroundColor: "hsl(218, 62.2%, 95%)" }}
                          >
                            <h6 className="text-muted fw-bold mt-4 mb-2">
                              Ученик
                            </h6>
                            <div className="name">
                              <p className="h5 mb-1 fw-bold">Akash Vukoti</p>
                            </div>
                            <ul className="list-unstyled d-flex justify-content-center text-warning mb-2">
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="far fa-star fa-sm" />
                              </li>
                            </ul>

                            <hr className="hr hr-blurry"></hr>

                            <i
                              className="fa-solid fa-quote-left fa-sm"
                              style={{ color: "#29c1fe" }}
                            ></i>
                            <p className="pb-4 mb-4">
                              Сначала программирование казалось мне сложным, но
                              этот сайт сделал обучение простым и увлекательным!
                              Интерактивные задания и игры помогли мне лучше
                              понять концепции программирования, и теперь я
                              увереннее в своих силах.
                            </p>
                          </div>
                          <img
                            src="/images/review2.jpg"
                            className="w-100 rounded-circle mt-n5 shadow-5-strong"
                            style={{ maxWidth: 100 }}
                            alt="Avatar"
                          />
                        </div>
                      </div>

                      <div className="col-lg-4 mb-5 mb-lg-0 hover-zoom">
                        <div>
                          <div
                            className="rounded-7 p-4 shadow-3"
                            style={{ backgroundColor: "hsl(218, 62.2%, 95%)" }}
                          >
                            <h6 className="text-muted fw-bold mt-4 mb-2">
                              Родитель
                            </h6>
                            <div className="name">
                              <p className="h5 mb-1 fw-bold">
                                Abhijeet Gawande
                              </p>
                            </div>
                            <ul className="list-unstyled d-flex justify-content-center text-warning mb-2">
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="far fa-star fa-sm" />
                              </li>
                            </ul>

                            <hr className="hr hr-blurry"></hr>

                            <i
                              className="fa-solid fa-quote-left fa-sm"
                              style={{ color: "#29c1fe" }}
                            ></i>
                            <p className="pb-4 mb-4">
                              Как родитель, я рад видеть, что мой ребенок с
                              интересом учится, и этот сайт этому способствует.
                              Ему очень нравится игровой подход к
                              программированию, и я поражен, сколько он уже
                              освоил за короткое время.
                            </p>
                          </div>
                          <img
                            src="/images/review3.jpg"
                            className="w-100 rounded-circle mt-n5 shadow-5-strong"
                            style={{ maxWidth: 100 }}
                            alt="Avatar"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </section>
            </div>
          </div>
        </div>
      </>

      <>
        <div className="container mb-8">
          <section>
            <div className="heading">
              <h2 className="mb-3 text-center display-3">
                <span>Часто задаваемые вопросы</span>
              </h2>
            </div>
            <div className="sub-heading">
              <h4 className="mb-8 text-center">
                <span>FAQ</span>
              </h4>
            </div>
            <div className="accordion" id="basicAccordion">
              <div className="accordion-item rounded-7 shadow-4-strong">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button rounded-7 collapsed"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#basicAccordionCollapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    <span>Почему детям стоит учиться программированию?</span>
                  </button>
                </h2>
                <div
                  id="basicAccordionCollapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-mdb-parent="#basicAccordion"
                  style={{}}
                >
                  <div className="accordion-body">
                    <span>
                      Дети должны учиться программированию, потому что это
                      развивает навыки решения проблем, творческое мышление,
                      логическое мышление и готовит их к технологичному
                      будущему. Кроме того, программирование учит настойчивости,
                      работе в команде, вниманию к деталям и открывает карьерные
                      возможности в различных сферах.
                    </span>
                  </div>
                </div>
              </div>
              <div className="accordion-item rounded-7 shadow-4-strong">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button rounded-7 collapsed"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#basicAccordionCollapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    <span>
                      Мой ребенок новичок, нужен ли опыт программирования?
                    </span>
                  </button>
                </h2>
                <div
                  id="basicAccordionCollapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-mdb-parent="#basicAccordion"
                  style={{}}
                >
                  <div className="accordion-body">
                    <span>
                      Нет, опыт программирования не требуется. Мы принимаем
                      детей с любым уровнем подготовки, включая новичков. Наши
                      курсы начинаются с основ и постепенно усложняются, чтобы
                      каждый ребенок мог учиться в своем темпе.
                    </span>
                  </div>
                </div>
              </div>
              <div className="accordion-item rounded-7 shadow-4-strong">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button rounded-7 collapsed"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#basicAccordionCollapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    <span>
                      С какого возраста можно начинать учиться программированию?
                    </span>
                  </button>
                </h2>
                <div
                  id="basicAccordionCollapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-mdb-parent="#basicAccordion"
                  style={{}}
                >
                  <div className="accordion-body">
                    <span>
                      Рекомендуемый возраст для начала — от 5-6 лет с блочным
                      программированием. По мере развития можно переходить к
                      более сложным языкам и проектам. Но учиться никогда не
                      поздно — программирование полезно людям любого возраста.
                    </span>
                  </div>
                </div>
              </div>
              <div className="accordion-item rounded-7 shadow-4-strong">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button rounded-7 collapsed"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#basicAccordionCollapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    <span>Какие курсы предлагает Digi Coders?</span>
                  </button>
                </h2>
                <div
                  id="basicAccordionCollapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-mdb-parent="#basicAccordion"
                  style={{}}
                >
                  <div className="accordion-body">
                    <span>
                      Digi Coders предлагает курсы блочного программирования для
                      детей: Python, веб-разработка, разработка приложений, игр,
                      искусственный интеллект и IoT. Курсы делают обучение
                      программированию интересным и интерактивным, обучая важным
                      навыкам.
                    </span>
                  </div>
                </div>
              </div>
              <div className="accordion-item rounded-7 shadow-4-strong">
                <h2 className="accordion-header" id="headingFive">
                  <button
                    className="accordion-button rounded-7 collapsed"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#basicAccordionCollapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    <span>Гибкое ли расписание курсов?</span>
                  </button>
                </h2>
                <div
                  id="basicAccordionCollapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-mdb-parent="#basicAccordion"
                  style={{}}
                >
                  <div className="accordion-body">
                    <span>
                      Да! Вы можете подобрать удобное время и дни для занятий,
                      чтобы они вписывались в ваш график.
                    </span>
                  </div>
                </div>
              </div>
              <div className="accordion-item rounded-7 shadow-4-strong">
                <h2 className="accordion-header" id="headingSix">
                  <button
                    className="accordion-button rounded-7 collapsed"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#basicAccordionCollapseSix"
                    aria-expanded="false"
                    aria-controls="collapseSix"
                  >
                    <span>Какое устройство нужно для обучения?</span>
                  </button>
                </h2>
                <div
                  id="basicAccordionCollapseSix"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingSix"
                  data-mdb-parent="#basicAccordion"
                  style={{}}
                >
                  <div className="accordion-body">
                    <span>
                      Для обучения в Digi Coders нужен только компьютер/ноутбук
                      с веб-камерой и стабильным интернетом.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    </div>
  );
};

export default Home;
