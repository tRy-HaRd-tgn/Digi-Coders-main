import React, { useState } from "react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import app_config from "../../config";
import * as Yup from "yup";
import "./Home.css";

const Home = () => {
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [openAccordion, setOpenAccordion] = useState(null);
  const [faqProgress, setFaqProgress] = useState(0);
  const [openedQuestions, setOpenedQuestions] = useState(new Set());

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    feedbackForm.setFieldValue("emoji", emoji);
  };

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);

    // Обновляем прогресс при открытии FAQ
    if (openAccordion !== index) {
      setOpenedQuestions((prev) => {
        const newSet = new Set(prev);
        newSet.add(index);
        return newSet;
      });
      setFaqProgress((prev) => Math.min(prev + 16.67, 100)); // 100% / 6 вопросов
    }
  };

  const faqData = [
    {
      question: "Почему детям стоит учиться программированию?",
      answer:
        "Дети должны учиться программированию, потому что это развивает навыки решения проблем, творческое мышление, логическое мышление и готовит их к технологичному будущему. Кроме того, программирование учит настойчивости, работе в команде, вниманию к деталям и открывает карьерные возможности в различных сферах.",
    },
    {
      question: "Мой ребенок новичок, нужен ли опыт программирования?",
      answer:
        "Нет, опыт программирования не требуется. Мы принимаем детей с любым уровнем подготовки, включая новичков. Наши курсы начинаются с основ и постепенно усложняются, чтобы каждый ребенок мог учиться в своем темпе.",
    },
    {
      question: "С какого возраста можно начинать учиться программированию?",
      answer:
        "Рекомендуемый возраст для начала — от 5-6 лет с блочным программированием. По мере развития можно переходить к более сложным языкам и проектам. Но учиться никогда не поздно — программирование полезно людям любого возраста.",
    },
    {
      question: "Какие курсы предлагает Digi Coders?",
      answer:
        "Digi Coders предлагает курсы блочного программирования для детей: Python, веб-разработка, разработка приложений, игр, искусственный интеллект и IoT. Курсы делают обучение программированию интересным и интерактивным, обучая важным навыкам.",
    },
    {
      question: "Гибкое ли расписание курсов?",
      answer:
        "Да! Вы можете подобрать удобное время и дни для занятий, чтобы они вписывались в ваш график.",
    },
    {
      question: "Какое устройство нужно для обучения?",
      answer:
        "Для обучения в Digi Coders нужен только компьютер/ноутбук с веб-камерой и стабильным интернетом.",
    },
  ];

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
        {/* Features Section Modernized */}
        <section className="features-section">
          <h2 className="features-title">ПРЕИМУЩЕСТВА ВЫБОРА НАС</h2>
          <h4 className="features-subtitle">
            РАЗВИВАЙТЕ СВОИ НАВЫКИ ВМЕСТЕ С НАМИ
          </h4>
          <div className="features-cards">
            <div
              className="feature-card feature-card--blue fade-in-up"
              style={{ animationDelay: "0.05s" }}
            >
              <div className="feature-icon">
                <i className="fas fa-chalkboard-user" />
              </div>
              <h5>ИНТЕРАКТИВНОЕ ОБУЧЕНИЕ</h5>
              <p>
                Практический подход к обучению детей основам программирования,
                развитие критического мышления и навыков решения задач.
              </p>
            </div>
            <div
              className="feature-card feature-card--black fade-in-up"
              style={{ animationDelay: "0.15s" }}
            >
              <div className="feature-icon">
                <i className="fas fa-briefcase" />
              </div>
              <h5>ПЕРСОНАЛИЗИРОВАННАЯ ПРОГРАММА</h5>
              <p>
                Индивидуальная программа обучения для детей с учетом их стиля,
                интересов и способностей.
              </p>
            </div>
            <div
              className="feature-card feature-card--blue fade-in-up"
              style={{ animationDelay: "0.25s" }}
            >
              <div className="feature-icon">
                <i className="fas fa-gamepad" />
              </div>
              <h5>ОБУЧЕНИЕ ЧЕРЕЗ ИГРЫ</h5>
              <p>
                Игровой подход к обучению новым концепциям и навыкам
                программирования.
              </p>
            </div>
            <div
              className="feature-card feature-card--black fade-in-up"
              style={{ animationDelay: "0.35s" }}
            >
              <div className="feature-icon">
                <i className="fas fa-award" />
              </div>
              <h5>СЕРТИФИКАТ ОБ ОКОНЧАНИИ</h5>
              <p>
                Вручается детям за успешное завершение интерактивного курса или
                программы.
              </p>
            </div>
          </div>
        </section>
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

      <>
        {/* Popular Courses Modern Section */}
        <section className="popular-courses-section">
          <h2 className="popular-courses-title">НАШИ ПОПУЛЯРНЫЕ КУРСЫ</h2>
          <h4 className="popular-courses-subtitle">
            ОТКРОЙТЕ ДЛЯ СЕБЯ МИР ПРОГРАММИРОВАНИЯ С НАШИМИ КУРСАМИ
          </h4>
          <div className="popular-courses-cards">
            <div
              className="course-card fade-in-up"
              style={{ animationDelay: "0.05s" }}
            >
              <img
                src="/images/course-html.jpg"
                className="course-card-img"
                alt="HTML"
              />
              <div className="course-card-content">
                <div className="course-card-header">HTML</div>
                <div className="course-card-info">
                  <span>26 ЗАНЯТИЙ</span>
                  <span>
                    ДЛИТЕЛЬНОСТЬ: <b>2 НЕДЕЛИ</b>
                  </span>
                </div>
                <div className="course-card-desc">
                  Идеальный курс, чтобы дети быстро освоили основы html и начали
                  писать код с помощью блоков.
                </div>
                <NavLink
                  to="/user/viewchapters?category=HTML"
                  className="course-card-btn"
                >
                  ПОДРОБНЕЕ
                </NavLink>
              </div>
            </div>
            <div
              className="course-card fade-in-up"
              style={{ animationDelay: "0.15s" }}
            >
              <img
                src="/images/course-js.jpg"
                className="course-card-img"
                alt="JavaScript"
              />
              <div className="course-card-content">
                <div className="course-card-header">JAVASCRIPT</div>
                <div className="course-card-info">
                  <span>26 ЗАНЯТИЙ</span>
                  <span>
                    ДЛИТЕЛЬНОСТЬ: <b>2 НЕДЕЛИ</b>
                  </span>
                </div>
                <div className="course-card-desc">
                  Идеальный курс, чтобы дети быстро освоили основы javascript и
                  начали писать код с помощью блоков.
                </div>
                <NavLink
                  to="/user/viewchapters?category=JavaScript"
                  className="course-card-btn"
                >
                  ПОДРОБНЕЕ
                </NavLink>
              </div>
            </div>
            <div
              className="course-card fade-in-up"
              style={{ animationDelay: "0.25s" }}
            >
              <img
                src="/images/course-python.jpg"
                className="course-card-img"
                alt="Python"
              />
              <div className="course-card-content">
                <div className="course-card-header">PYTHON</div>
                <div className="course-card-info">
                  <span>26 ЗАНЯТИЙ</span>
                  <span>
                    ДЛИТЕЛЬНОСТЬ: <b>2 НЕДЕЛИ</b>
                  </span>
                </div>
                <div className="course-card-desc">
                  Идеальный курс, чтобы дети быстро освоили основы python и
                  начали писать код с помощью блоков.
                </div>
                <NavLink
                  to="/user/viewchapters?category=Python"
                  className="course-card-btn"
                >
                  ПОДРОБНЕЕ
                </NavLink>
              </div>
            </div>
          </div>
        </section>
      </>

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

      {/* --- СОВРЕМЕННАЯ СЕКЦИЯ: Почему детям стоит учиться программированию --- */}
      <section className="why-learn-section">
        <div className="why-learn-header">
          <h2>Почему детям стоит учиться программированию</h2>
          <p>Программирование — язык будущего</p>
        </div>
        <div className="why-learn-cards">
          <div className="why-learn-card fade-in-up">
            <div className="why-learn-img-wrap">
              <img
                src="/images/img4.jpg"
                alt="Готовит к будущему"
                className="why-learn-img"
              />
            </div>
            <div className="why-learn-content">
              <h3>Готовит к будущему</h3>
              <p>
                В современном цифровом мире программирование становится важным
                навыком для многих профессий. Осваивая программирование с
                раннего возраста, дети лучше подготовлены к будущему и получают
                конкурентное преимущество на рынке труда.
              </p>
            </div>
          </div>
          <div
            className="why-learn-card fade-in-up"
            style={{ animationDelay: "0.15s" }}
          >
            <div className="why-learn-img-wrap">
              <img
                src="/images/img7.jpg"
                alt="Развивает логическое мышление"
                className="why-learn-img"
              />
            </div>
            <div className="why-learn-content">
              <h3>Развивает логическое мышление</h3>
              <p>
                Программирование помогает детям развивать логическое мышление.
                Они учатся структурировать мысли и разбивать сложные задачи на
                простые части. Этот навык полезен не только в программировании,
                но и в жизни.
              </p>
            </div>
          </div>
          <div
            className="why-learn-card fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="why-learn-img-wrap">
              <img
                src="/images/img3.jpg"
                alt="Формирует навыки решения проблем"
                className="why-learn-img"
              />
            </div>
            <div className="why-learn-content">
              <h3>Формирует навыки решения проблем</h3>
              <p>
                Обучение программированию помогает детям развивать навыки
                решения проблем, разбивать задачи на части и находить пути их
                решения с помощью кода. Этот навык полезен в разных сферах
                жизни.
              </p>
            </div>
          </div>
        </div>
      </section>

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
                  <div className="reviews-flex">
                    {/* Отзыв 1 */}
                    <div className="review-card">
                      <div className="review-card-content">
                        <div className="review-role">Родитель</div>
                        <div className="review-name">ИРИНА СМИРНОВА</div>
                        <div className="review-stars">
                          {[1, 2, 3, 4].map((i) => (
                            <i key={i} className="fas fa-star fa-sm" />
                          ))}
                          <i className="far fa-star fa-sm" />
                        </div>
                        <div className="review-quote">
                          “Я очень рада, что мы нашли этот сайт для нашего
                          ребенка. Приятно наблюдать, как развиваются его навыки
                          программирования, и ему очень нравятся интерактивные
                          задания. Очень рекомендую!”
                        </div>
                      </div>
                      <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        className="review-avatar"
                        alt="Ирина Смирнова"
                      />
                    </div>
                    {/* Отзыв 2 */}
                    <div className="review-card">
                      <div className="review-card-content">
                        <div className="review-role">Ученик</div>
                        <div className="review-name">АРТЁМ ИВАНОВ</div>
                        <div className="review-stars">
                          {[1, 2, 3, 4].map((i) => (
                            <i key={i} className="fas fa-star fa-sm" />
                          ))}
                          <i className="far fa-star fa-sm" />
                        </div>
                        <div className="review-quote">
                          “Сначала программирование казалось мне сложным, но
                          этот сайт сделал обучение простым и увлекательным!
                          Интерактивные задания и игры помогли мне лучше понять
                          концепции программирования, и теперь я увереннее в
                          своих силах.”
                        </div>
                      </div>
                      <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        className="review-avatar"
                        alt="Артём Иванов"
                      />
                    </div>
                    {/* Отзыв 3 */}
                    <div className="review-card">
                      <div className="review-card-content">
                        <div className="review-role">Родитель</div>
                        <div className="review-name">АЛЕКСЕЙ ПЕТРОВ</div>
                        <div className="review-stars">
                          {[1, 2, 3, 4].map((i) => (
                            <i key={i} className="fas fa-star fa-sm" />
                          ))}
                          <i className="far fa-star fa-sm" />
                        </div>
                        <div className="review-quote">
                          “Как родитель, я рад видеть, что мой ребенок с
                          интересом учится, и этот сайт этому способствует. Ему
                          очень нравится игровой подход к программированию, и я
                          поражен, сколько он уже освоил за короткое время.”
                        </div>
                      </div>
                      <img
                        src="https://randomuser.me/api/portraits/men/45.jpg"
                        className="review-avatar"
                        alt="Алексей Петров"
                      />
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
          <section className="faq-section">
            <div className="heading">
              <h2 className="mb-3 text-center display-3 faq-title">
                <span>Часто задаваемые вопросы</span>
              </h2>
            </div>
            <div className="sub-heading">
              <h4 className="mb-8 text-center faq-subtitle">
                <i className="fas fa-question-circle me-2"></i>
                <span>FAQ</span>
              </h4>
              <div className="text-center mb-4">
                <div
                  className="progress"
                  style={{ height: "8px", borderRadius: "10px" }}
                >
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${faqProgress}%`,
                      backgroundColor: "#29c1fe",
                      transition: "width 0.5s ease",
                    }}
                    aria-valuenow={faqProgress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <small className="text-muted mt-2 d-block">
                  Прогресс изучения: {Math.round(faqProgress)}% (
                  {openedQuestions.size} из {faqData.length} вопросов)
                  {faqProgress > 0 && (
                    <button
                      className="btn btn-sm btn-outline-primary ms-2"
                      onClick={() => {
                        setFaqProgress(0);
                        setOpenedQuestions(new Set());
                      }}
                      style={{ fontSize: "0.75rem" }}
                    >
                      <i className="fas fa-redo me-1"></i>
                      Сбросить
                    </button>
                  )}
                </small>
              </div>
            </div>
            <div className="accordion" id="basicAccordion">
              {faqData.map((item, index) => (
                <div
                  key={index}
                  className="accordion-item rounded-7 shadow-4-strong"
                >
                  <h2 className="accordion-header" id={`heading${index + 1}`}>
                    <button
                      className={`accordion-button rounded-7 ${
                        openAccordion === index ? "" : "collapsed"
                      }`}
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      aria-expanded={openAccordion === index}
                      aria-controls={`basicAccordionCollapse${index + 1}`}
                    >
                      <span>{item.question}</span>
                    </button>
                  </h2>
                  <div
                    id={`basicAccordionCollapse${index + 1}`}
                    className={`accordion-collapse ${
                      openAccordion === index ? "show" : "collapse"
                    }`}
                    aria-labelledby={`heading${index + 1}`}
                    data-mdb-parent="#basicAccordion"
                  >
                    <div className="accordion-body">
                      <span>{item.answer}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </>
    </div>
  );
};

export default Home;
