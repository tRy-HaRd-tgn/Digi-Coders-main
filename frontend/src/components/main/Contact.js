import { useFormik } from "formik";
import React from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";

const Contact = () => {
  const contactValidationSchema = Yup.object().shape({
    name: Yup.string().required("Пожалуйста, введите имя"),
    email: Yup.string()
      .email("Некорректный email")
      .required("Пожалуйста, введите email"),
    subject: Yup.string().required("Пожалуйста, введите тему"),
    message: Yup.string()
      .required("Пожалуйста, введите сообщение")
      .min(10, "Сообщение должно содержать минимум 10 символов")
      .max(1000, "Сообщение не должно превышать 1000 символов"),
  });

  const contactForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: contactValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

      const res = await fetch(`${apiUrl}/contact/add`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSubmitting(false);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Спасибо!",
          text: "Ваше сообщение успешно отправлено",
          showConfirmButton: false,
          timer: 1500,
        });
        resetForm();
      } else {
        Swal.fire({
          icon: "error",
          title: "Упс...",
          text: "Что-то пошло не так!",
        });
      }
    },
  });

  const contactInfo = [
    {
      icon: "fas fa-map-marker-alt",
      title: "Адрес",
      content: "Хазратгандж, Лакхнау, Уттар-Прадеш, Индия",
      color: "#4ade80",
    },
    {
      icon: "fas fa-phone",
      title: "Телефон",
      content: "+91 9260964544",
      color: "#29c1fe",
    },
    {
      icon: "fas fa-envelope",
      title: "Email",
      content: "digicoders12@gmail.com",
      color: "#f59e0b",
    },
  ];

  const socialLinks = [
    { icon: "fab fa-facebook-f", href: "#", color: "#1877f2" },
    { icon: "fab fa-twitter", href: "#", color: "#1da1f2" },
    { icon: "fab fa-instagram", href: "#", color: "#e4405f" },
    { icon: "fab fa-linkedin", href: "#", color: "#0077b5" },
    { icon: "fab fa-github", href: "#", color: "#333" },
    { icon: "fab fa-telegram", href: "#", color: "#0088cc" },
  ];

  return (
    <div className="contact-modern-bg">
      {/* Hero Section */}
      <section className="contact-hero-section glassmorphism">
        <div className="contact-hero-content">
          <div className="contact-hero-badge">
            <span>📞</span> Свяжитесь с нами
          </div>
          <h1 className="contact-hero-title fade-in">Свяжитесь с нами</h1>
          <p className="contact-hero-subtitle fade-in-delay">
            Мы будем рады услышать вас! Напишите нам, и давайте обсудим, как мы
            можем помочь вам и вашему ребенку изучать программирование.
          </p>
          <div className="contact-hero-stats fade-in-delay-2">
            <div className="contact-hero-stat">
              <span className="contact-hero-stat-number">24/7</span>
              <span className="contact-hero-stat-label">Поддержка</span>
            </div>
            <div className="contact-hero-stat">
              <span className="contact-hero-stat-number">5 мин</span>
              <span className="contact-hero-stat-label">Ответ</span>
            </div>
            <div className="contact-hero-stat">
              <span className="contact-hero-stat-number">100%</span>
              <span className="contact-hero-stat-label">Безопасность</span>
            </div>
          </div>
        </div>
        <div className="contact-hero-image-wrap">
          <div className="contact-hero-image-card glassmorphism">
            <div className="contact-hero-image-content">
              <div className="contact-hero-image-header">
                <h3>DIGI CODERS</h3>
                <p>Поддержка и консультации</p>
              </div>
              <div className="contact-hero-image-visual">
                <div className="contact-illustration">
                  <div className="contact-avatar">👨‍💻</div>
                  <div className="contact-chat">
                    <div className="chat-bubble">
                      <div className="chat-text">Привет! 👋</div>
                    </div>
                    <div className="chat-bubble response">
                      <div className="chat-text">Чем могу помочь?</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <div className="contact-info-grid">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="contact-info-card glassmorphism fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="contact-info-icon"
                style={{ backgroundColor: info.color }}
              >
                <i className={info.icon}></i>
              </div>
              <div className="contact-info-content">
                <h4>{info.title}</h4>
                <p>{info.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="contact-form-container">
          <div className="contact-form-card glassmorphism">
            <div className="contact-form-header">
              <h2>Напишите нам</h2>
              <p>
                Заполните форму ниже, и мы свяжемся с вами в ближайшее время
              </p>
            </div>
            <form className="contact-form" onSubmit={contactForm.handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-form-field">
                  <label htmlFor="name">Имя</label>
                  <div className="contact-input-wrap">
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Введите ваше имя"
                      value={contactForm.values.name}
                      onChange={contactForm.handleChange}
                      onBlur={contactForm.handleBlur}
                    />
                  </div>
                  {contactForm.touched.name && contactForm.errors.name && (
                    <div className="contact-error">
                      {contactForm.errors.name}
                    </div>
                  )}
                </div>
                <div className="contact-form-field">
                  <label htmlFor="email">Email</label>
                  <div className="contact-input-wrap">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Введите ваш email"
                      value={contactForm.values.email}
                      onChange={contactForm.handleChange}
                      onBlur={contactForm.handleBlur}
                    />
                  </div>
                  {contactForm.touched.email && contactForm.errors.email && (
                    <div className="contact-error">
                      {contactForm.errors.email}
                    </div>
                  )}
                </div>
              </div>
              <div className="contact-form-field">
                <label htmlFor="subject">Тема</label>
                <div className="contact-input-wrap">
                  <i className="fas fa-tag"></i>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Введите тему сообщения"
                    value={contactForm.values.subject}
                    onChange={contactForm.handleChange}
                    onBlur={contactForm.handleBlur}
                  />
                </div>
                {contactForm.touched.subject && contactForm.errors.subject && (
                  <div className="contact-error">
                    {contactForm.errors.subject}
                  </div>
                )}
              </div>
              <div className="contact-form-field">
                <label htmlFor="message">Сообщение</label>
                <div className="contact-input-wrap">
                  <i className="fas fa-pencil-alt"></i>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Введите ваше сообщение..."
                    value={contactForm.values.message}
                    onChange={contactForm.handleChange}
                    onBlur={contactForm.handleBlur}
                  ></textarea>
                </div>
                {contactForm.touched.message && contactForm.errors.message && (
                  <div className="contact-error">
                    {contactForm.errors.message}
                  </div>
                )}
              </div>
              <div className="contact-form-actions">
                <button
                  type="submit"
                  className="btn-glass"
                  disabled={contactForm.isSubmitting || !contactForm.isValid}
                >
                  <i className="far fa-paper-plane"></i>
                  Отправить сообщение
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="contact-social-section">
        <h2 className="section-title">Мы в социальных сетях</h2>
        <p className="section-subtitle">
          Следите за нашими новостями и обновлениями
        </p>
        <div className="contact-social-grid">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              className="contact-social-card glassmorphism fade-in-up"
              style={{
                animationDelay: `${index * 0.1}s`,
                "--social-color": social.color,
              }}
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
