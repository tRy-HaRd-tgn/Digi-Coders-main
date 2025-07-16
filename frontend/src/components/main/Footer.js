import React from "react";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <footer
      className="modern-footer"
      style={{
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Декоративные элементы */}
      <div
        className="footer-decoration"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #667eea, #764ba2, #667eea)",
          backgroundSize: "200% 100%",
          animation: "gradientShift 3s ease-in-out infinite",
        }}
      />

      <style>
        {`
           @keyframes gradientShift {
             0%, 100% { background-position: 0% 50%; }
             50% { background-position: 100% 50%; }
           }
           
           .social-icon {
             transition: all 0.3s ease;
             border-radius: 50%;
             width: 50px;
             height: 50px;
             display: inline-flex;
             align-items: center;
             justify-content: center;
             margin: 0 10px;
             background: rgba(255, 255, 255, 0.15);
             backdrop-filter: blur(10px);
             border: 2px solid rgba(255, 255, 255, 0.3);
             font-size: 1.2rem;
           }
           
           .social-icon:hover {
             transform: translateY(-5px) scale(1.1);
             background: linear-gradient(45deg, #667eea, #764ba2);
             box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
             border-color: #667eea;
           }
           
           .footer-link {
             transition: all 0.3s ease;
             display: inline-block;
             position: relative;
             font-size: 1rem;
             font-weight: 500;
             color: #ffffff !important;
           }
           
           .footer-link:hover {
             color: #667eea !important;
             transform: translateX(5px);
             text-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
           }
           
           .footer-link::after {
             content: '';
             position: absolute;
             width: 0;
             height: 2px;
             bottom: -2px;
             left: 0;
             background: linear-gradient(45deg, #667eea, #764ba2);
             transition: width 0.3s ease;
           }
           
           .footer-link:hover::after {
             width: 100%;
           }
           
           .contact-item {
             transition: all 0.3s ease;
             padding: 16px 20px;
             border-radius: 12px;
             background: rgba(255, 255, 255, 0.1);
             backdrop-filter: blur(10px);
             border: 1px solid rgba(255, 255, 255, 0.2);
             margin-bottom: 16px;
             box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
           }
           
           .contact-item:hover {
             background: rgba(255, 255, 255, 0.15);
             transform: translateX(5px);
             box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
           }
           
           .footer-section {
             position: relative;
             padding: 60px 0 40px;
           }
           
           .footer-section::before {
             content: '';
             position: absolute;
             top: 0;
             left: 50%;
             transform: translateX(-50%);
             width: 80%;
             height: 1px;
             background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
           }
           
           .footer-text {
             color: #ffffff !important;
             font-size: 1rem;
             line-height: 1.6;
             text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
           }
           
           .footer-heading {
             color: #ffffff !important;
             font-size: 1.1rem;
             font-weight: 700;
             text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
           }
           
           .footer-description {
             color: #e8f4fd !important;
             font-size: 1rem;
             line-height: 1.7;
             text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
           }
         `}
      </style>

      {/* Верхняя секция с социальными сетями */}
      <section className="footer-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
              <h5
                className="fw-bold mb-0 footer-heading"
                style={{ fontSize: "1.3rem" }}
              >
                <i
                  className="fas fa-share-alt me-2"
                  style={{ color: "#667eea" }}
                />
                Свяжитесь с нами в социальных сетях
              </h5>
            </div>
            <div className="col-lg-6 text-center text-lg-end">
              <div className="social-icons">
                <a
                  href="#"
                  className="social-icon text-white text-decoration-none"
                >
                  <i className="fab fa-facebook-f fa-lg" />
                </a>
                <a
                  href="#"
                  className="social-icon text-white text-decoration-none"
                >
                  <i className="fab fa-twitter fa-lg" />
                </a>
                <a
                  href="#"
                  className="social-icon text-white text-decoration-none"
                >
                  <i className="fab fa-google fa-lg" />
                </a>
                <a
                  href="#"
                  className="social-icon text-white text-decoration-none"
                >
                  <i className="fab fa-instagram fa-lg" />
                </a>
                <a
                  href="#"
                  className="social-icon text-white text-decoration-none"
                >
                  <i className="fab fa-linkedin fa-lg" />
                </a>
                <a
                  href="#"
                  className="social-icon text-white text-decoration-none"
                >
                  <i className="fab fa-github fa-lg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Основная секция с контентом */}
      <section className="footer-section" style={{ paddingTop: "40px" }}>
        <div className="container">
          <div className="row g-4">
            {/* Логотип и описание */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-brand mb-4">
                <div className="d-flex align-items-center mb-3">
                  <div>
                    <h4
                      className="mb-0 fw-bold footer-heading"
                      style={{ fontSize: "1.5rem" }}
                    >
                      <span className="text-white">DIGI</span>
                      <span style={{ color: "#667eea" }}>CODERS</span>
                    </h4>
                    <small
                      className="text-white-50"
                      style={{ fontSize: "1rem" }}
                    >
                      Fun With Coding
                    </small>
                  </div>
                </div>
                <p className="footer-description">
                  Digi Coders — это инновационная программа обучения детей
                  основам программирования через визуальные блоки. Мы делаем
                  обучение увлекательным и доступным для каждого ребенка.
                </p>
              </div>
            </div>

            {/* Курсы */}
            <div className="col-lg-2 col-md-6">
              <div className="footer-links">
                <h6
                  className="text-uppercase fw-bold mb-4"
                  style={{ color: "#667eea" }}
                >
                  <i className="fas fa-graduation-cap me-2" />
                  Курсы
                </h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <NavLink
                      to="/user/viewchapters?category=HTML"
                      className="footer-link text-white-75 text-decoration-none"
                    >
                      <i
                        className="fab fa-html5 me-2"
                        style={{ color: "#667eea" }}
                      />
                      HTML
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/user/viewchapters?category=JavaScript"
                      className="footer-link text-white-75 text-decoration-none"
                    >
                      <i
                        className="fab fa-js-square me-2"
                        style={{ color: "#667eea" }}
                      />
                      JavaScript
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/user/viewchapters?category=Python"
                      className="footer-link text-white-75 text-decoration-none"
                    >
                      <i
                        className="fab fa-python me-2"
                        style={{ color: "#667eea" }}
                      />
                      Python
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/main/course"
                      className="footer-link text-white-75 text-decoration-none"
                    >
                      <i
                        className="fas fa-plus-circle me-2"
                        style={{ color: "#667eea" }}
                      />
                      Новые курсы
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>

            {/* Полезные ссылки */}
            <div className="col-lg-2 col-md-6">
              <div className="footer-links">
                <h6
                  className="text-uppercase fw-bold mb-4"
                  style={{ color: "#667eea" }}
                >
                  <i className="fas fa-link me-2" />
                  Полезные ссылки
                </h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <NavLink
                      to="/main/home"
                      className="footer-link text-white-75 text-decoration-none"
                    >
                      <i
                        className="fas fa-home me-2"
                        style={{ color: "#667eea" }}
                      />
                      Главная
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/main/course"
                      className="footer-link text-white-75 text-decoration-none"
                    >
                      <i
                        className="fas fa-book me-2"
                        style={{ color: "#667eea" }}
                      />
                      Курсы
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/main/about"
                      className="footer-link text-white-75 text-decoration-none"
                    >
                      <i
                        className="fas fa-info-circle me-2"
                        style={{ color: "#667eea" }}
                      />
                      О нас
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/main/contact"
                      className="footer-link text-white-75 text-decoration-none"
                    >
                      <i
                        className="fas fa-envelope me-2"
                        style={{ color: "#667eea" }}
                      />
                      Контакты
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>

            {/* Контакты */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-contact">
                <h6
                  className="text-uppercase fw-bold mb-4"
                  style={{ color: "#667eea" }}
                >
                  <i className="fas fa-address-card me-2" />
                  Контакты
                </h6>
                <div className="contact-items">
                  <div className="contact-item">
                    <div className="d-flex align-items-center">
                      <div
                        className="contact-icon me-3"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(45deg, #667eea, #764ba2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <i className="fas fa-map-marker-alt text-white" />
                      </div>
                      <div>
                        <small className="text-white-50 d-block">Адрес</small>
                        <span className="text-white">
                          Хазрат Гандж, Лакнау 226001, УП
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="d-flex align-items-center">
                      <div
                        className="contact-icon me-3"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(45deg, #667eea, #764ba2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <i className="fas fa-envelope text-white" />
                      </div>
                      <div>
                        <small className="text-white-50 d-block">Email</small>
                        <span className="text-white">
                          digicoders12@gmail.com
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="d-flex align-items-center">
                      <div
                        className="contact-icon me-3"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(45deg, #667eea, #764ba2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <i className="fas fa-phone text-white" />
                      </div>
                      <div>
                        <small className="text-white-50 d-block">Телефон</small>
                        <span className="text-white">+91 9260964544</span>
                      </div>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="d-flex align-items-center">
                      <div
                        className="contact-icon me-3"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(45deg, #667eea, #764ba2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <i className="fas fa-fax text-white" />
                      </div>
                      <div>
                        <small className="text-white-50 d-block">Факс</small>
                        <span className="text-white">+91 8948911871</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Нижняя секция с копирайтом */}
      <div
        className="footer-bottom"
        style={{
          background: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="container">
          <div className="row align-items-center py-4">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0 text-white-75">© 2024 Все права защищены</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <NavLink
                className="text-decoration-none fw-bold"
                to="#"
                style={{ color: "#667eea" }}
              >
                DigiCoders.com
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
