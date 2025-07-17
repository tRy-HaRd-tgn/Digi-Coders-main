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
    if (openAccordion !== index) {
      setOpenedQuestions((prev) => {
        const newSet = new Set(prev);
        newSet.add(index);
        return newSet;
      });
      setFaqProgress((prev) => Math.min(prev + 16.67, 100));
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
          title: "Спасибо!",
          text: "Ваш отзыв успешно отправлен",
          showConfirmButton: false,
          timer: 1500,
        });
        resetForm();
        setSelectedEmoji("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Ошибка...",
          text: "Что-то пошло не так!",
        });
      }
    },
  });

  return (
    <div className="home-modern-bg">
      {/* Hero Section */}
      <section className="hero-section glassmorphism">
        <div className="hero-content">
          <h1 className="hero-title fade-in">Digi Coders</h1>
          <p className="hero-subtitle fade-in-delay">
            Программирование для детей — легко, интересно, современно!
          </p>
          <div className="hero-btns fade-in-delay-2">
            <NavLink className="btn-glass" to="/main/signup">
              Начать обучение
            </NavLink>
            <NavLink className="btn-glass-outline" to="/main/about">
              Подробнее
            </NavLink>
          </div>
        </div>
        <div className="hero-image-wrap">
          <img
            src="/images/banner.gif"
            alt="Digi Coders Banner"
            className="hero-image"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-modern-section">
        <h2 className="section-title">Почему выбирают нас?</h2>
        <div className="features-modern-cards">
          <div className="feature-modern-card glassmorphism fade-in-up">
            <i className="fas fa-chalkboard-user feature-modern-icon" />
            <h5>Интерактивное обучение</h5>
            <p>
              Практический подход, развитие критического мышления и навыков
              решения задач.
            </p>
          </div>
          <div
            className="feature-modern-card glassmorphism fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <i className="fas fa-briefcase feature-modern-icon" />
            <h5>Персонализированная программа</h5>
            <p>
              Индивидуальный подход к каждому ребенку, учитываем интересы и
              способности.
            </p>
          </div>
          <div
            className="feature-modern-card glassmorphism fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <i className="fas fa-gamepad feature-modern-icon" />
            <h5>Обучение через игры</h5>
            <p>
              Игровой подход к освоению новых концепций и навыков
              программирования.
            </p>
          </div>
          <div
            className="feature-modern-card glassmorphism fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <i className="fas fa-award feature-modern-icon" />
            <h5>Сертификат об окончании</h5>
            <p>
              Вручается за успешное завершение интерактивного курса или
              программы.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="courses-modern-section">
        <h2 className="section-title">Популярные курсы</h2>
        <div className="courses-modern-cards">
          <div className="course-modern-card fade-in-up">
            <img
              src="/images/course-html.jpg"
              alt="HTML"
              className="course-modern-img"
            />
            <div className="course-modern-content">
              <h3>HTML</h3>
              <p>26 занятий • 2 недели</p>
              <span>Быстрый старт в веб-разработке с помощью блоков.</span>
              <NavLink
                to="/user/viewchapters?category=HTML"
                className="btn-glass-sm"
              >
                Подробнее
              </NavLink>
            </div>
          </div>
          <div
            className="course-modern-card fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <img
              src="/images/course-js.jpg"
              alt="JavaScript"
              className="course-modern-img"
            />
            <div className="course-modern-content">
              <h3>JavaScript</h3>
              <p>26 занятий • 2 недели</p>
              <span>Изучение основ JS и практическое программирование.</span>
              <NavLink
                to="/user/viewchapters?category=JavaScript"
                className="btn-glass-sm"
              >
                Подробнее
              </NavLink>
            </div>
          </div>
          <div
            className="course-modern-card fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <img
              src="/images/course-python.jpg"
              alt="Python"
              className="course-modern-img"
            />
            <div className="course-modern-content">
              <h3>Python</h3>
              <p>26 занятий • 2 недели</p>
              <span>
                Первые шаги в Python и решение задач с помощью блоков.
              </span>
              <NavLink
                to="/user/viewchapters?category=Python"
                className="btn-glass-sm"
              >
                Подробнее
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Why Learn Section */}
      <section className="why-learn-modern-section">
        <h2 className="section-title">
          Почему детям стоит учиться программированию?
        </h2>
        <div className="why-learn-modern-cards">
          <div className="why-learn-modern-card glassmorphism fade-in-up">
            <img
              src="/images/img4.jpg"
              alt="Готовит к будущему"
              className="why-learn-modern-img"
            />
            <div>
              <h3>Готовит к будущему</h3>
              <p>
                Программирование — важный навык для будущей карьеры и жизни в
                цифровом мире.
              </p>
            </div>
          </div>
          <div
            className="why-learn-modern-card glassmorphism fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <img
              src="/images/img7.jpg"
              alt="Логическое мышление"
              className="why-learn-modern-img"
            />
            <div>
              <h3>Развивает логику</h3>
              <p>
                Структурирование мыслей, решение сложных задач и развитие
                логики.
              </p>
            </div>
          </div>
          <div
            className="why-learn-modern-card glassmorphism fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <img
              src="/images/img3.jpg"
              alt="Навыки решения проблем"
              className="why-learn-modern-img"
            />
            <div>
              <h3>Навыки решения проблем</h3>
              <p>
                Дети учатся разбивать задачи на части и находить решения с
                помощью кода.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-modern-section">
        <h2 className="section-title">Отзывы</h2>
        <div className="reviews-modern-cards">
          <div className="review-modern-card glassmorphism fade-in-up">
            <div className="review-modern-header">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Ирина Смирнова"
                className="review-modern-avatar"
              />
              <div className="review-modern-info">
                <div className="review-modern-role">Родитель</div>
                <div className="review-modern-name">ИРИНА СМИРНОВА</div>
                <div className="review-modern-stars">★★★★☆</div>
              </div>
            </div>
            <div className="review-modern-quote">
              "Я очень рада, что мы нашли этот сайт для нашего ребенка. Приятно
              наблюдать, как развиваются его навыки программирования, и ему
              очень нравятся интерактивные задания. Очень рекомендую!"
            </div>
          </div>
          <div
            className="review-modern-card glassmorphism fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="review-modern-header">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Артём Иванов"
                className="review-modern-avatar"
              />
              <div className="review-modern-info">
                <div className="review-modern-role">Ученик</div>
                <div className="review-modern-name">АРТЁМ ИВАНОВ</div>
                <div className="review-modern-stars">★★★★☆</div>
              </div>
            </div>
            <div className="review-modern-quote">
              "Сначала программирование казалось мне сложным, но этот сайт
              сделал обучение простым и увлекательным! Интерактивные задания и
              игры помогли мне лучше понять концепции программирования, и теперь
              я увереннее в своих силах."
            </div>
          </div>
          <div
            className="review-modern-card glassmorphism fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="review-modern-header">
              <img
                src="https://randomuser.me/api/portraits/men/45.jpg"
                alt="Алексей Петров"
                className="review-modern-avatar"
              />
              <div className="review-modern-info">
                <div className="review-modern-role">Родитель</div>
                <div className="review-modern-name">АЛЕКСЕЙ ПЕТРОВ</div>
                <div className="review-modern-stars">★★★★☆</div>
              </div>
            </div>
            <div className="review-modern-quote">
              "Как родитель, я рад видеть, что мой ребенок с интересом учится, и
              этот сайт этому способствует. Ему очень нравится игровой подход к
              программированию, и я поражен, сколько он уже освоил за короткое
              время."
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-modern-section">
        <h2 className="section-title">Часто задаваемые вопросы</h2>
        <div className="faq-modern-progress-wrap">
          <div
            className="faq-modern-progress-bar"
            style={{ width: `${faqProgress}%` }}
          />
          <small className="faq-modern-progress-text">
            Прогресс: {Math.round(faqProgress)}% ({openedQuestions.size} из{" "}
            {faqData.length})
            {faqProgress > 0 && (
              <button
                className="btn-glass-sm ms-2"
                onClick={() => {
                  setFaqProgress(0);
                  setOpenedQuestions(new Set());
                }}
              >
                Сбросить
              </button>
            )}
          </small>
        </div>
        <div className="faq-modern-accordion">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`faq-modern-item glassmorphism fade-in-up${
                openAccordion === index ? " open" : ""
              }`}
            >
              <button
                className="faq-modern-question"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openAccordion === index}
              >
                {item.question}
              </button>
              <div
                className={`faq-modern-answer${
                  openAccordion === index ? " show" : ""
                }`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feedback Floating Button & Modal */}
      <div className="feedback-modern-float">
        <button
          type="button"
          className="btn-glass-float"
          data-mdb-toggle="modal"
          data-mdb-target="#modernFeedbackModal"
        >
          <i className="far fa-comment-dots"></i> Отзыв
        </button>
      </div>
      <div
        className="modal fade"
        id="modernFeedbackModal"
        tabIndex="-1"
        aria-labelledby="modernFeedbackModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content glassmorphism">
            <div className="modal-header border-0">
              <h5 className="modal-title" id="modernFeedbackModalLabel">
                Оставьте отзыв
              </h5>
              <button
                type="button"
                className="btn-close"
                data-mdb-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form
                className="feedback-modern-form"
                onSubmit={feedbackForm.handleSubmit}
              >
                <div className="feedback-modern-field">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Ваше имя"
                    value={feedbackForm.values.name}
                    onChange={feedbackForm.handleChange}
                    onBlur={feedbackForm.handleBlur}
                  />
                  {feedbackForm.touched.name && feedbackForm.errors.name && (
                    <div className="text-danger small">
                      {feedbackForm.errors.name}
                    </div>
                  )}
                </div>
                <div className="feedback-modern-field">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={feedbackForm.values.email}
                    onChange={feedbackForm.handleChange}
                    onBlur={feedbackForm.handleBlur}
                  />
                  {feedbackForm.touched.email && feedbackForm.errors.email && (
                    <div className="text-danger small">
                      {feedbackForm.errors.email}
                    </div>
                  )}
                </div>
                <div className="feedback-modern-emojis">
                  {["🤬", "🙁", "😶", "😁", "😍"].map((emoji, idx) => (
                    <label
                      key={emoji}
                      className={`emoji-radio${
                        selectedEmoji === emoji ? " selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="emoji"
                        value={emoji}
                        checked={selectedEmoji === emoji}
                        onChange={() => handleEmojiSelect(emoji)}
                      />
                      <span>{emoji}</span>
                    </label>
                  ))}
                </div>
                {feedbackForm.touched.emoji && feedbackForm.errors.emoji && (
                  <div className="text-danger text-center small mb-2">
                    {feedbackForm.errors.emoji}
                  </div>
                )}
                <div className="feedback-modern-field">
                  <textarea
                    className="form-control"
                    id="message"
                    rows="3"
                    placeholder="Ваше сообщение..."
                    name="message"
                    value={feedbackForm.values.message}
                    onChange={feedbackForm.handleChange}
                    onBlur={feedbackForm.handleBlur}
                  ></textarea>
                  {feedbackForm.touched.message &&
                    feedbackForm.errors.message && (
                      <div className="text-danger small">
                        {feedbackForm.errors.message}
                      </div>
                    )}
                </div>
                <button
                  className="btn-glass"
                  type="submit"
                  disabled={feedbackForm.isSubmitting || !feedbackForm.isValid}
                >
                  Отправить <i className="far fa-paper-plane" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
