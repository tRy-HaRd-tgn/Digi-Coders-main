import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Signup = () => {
  return (
    <div className="signup-modern-bg">
      <section
        className="signup-hero-section glassmorphism"
        style={{
          borderRadius: "0px",
        }}
      >
        <div className="signup-hero-content">
          <div className="signup-hero-badge">
            <span>🚀</span> Присоединяйтесь к нам
          </div>
          <h1 className="signup-hero-title fade-in">Выберите тип аккаунта</h1>
          <p className="signup-hero-subtitle fade-in-delay">
            Присоединяйтесь к сообществу Digi Coders и начните свой путь в
            программировании
          </p>
          <div className="signup-login-link fade-in-delay-2">
            <p>
              Уже есть аккаунт?{" "}
              <Link to="/main/login" className="signup-login-text">
                Войти
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="signup-cards-section">
        <div className="signup-cards-container">
          <div className="signup-card glassmorphism fade-in-up">
            <div className="signup-card-image">
              <img
                src="/icons/student_icon.jpg"
                alt="Ученик"
                className="signup-card-avatar"
              />
            </div>
            <div className="signup-card-content">
              <h3 className="signup-card-title">Ученик</h3>
              <p className="signup-card-description">
                Начните изучение программирования с интерактивных уроков и
                игровых заданий
              </p>
              <div className="signup-card-features">
                <div className="signup-card-feature">
                  <i className="fas fa-gamepad"></i>
                  <span>Игровое обучение</span>
                </div>
                <div className="signup-card-feature">
                  <i className="fas fa-certificate"></i>
                  <span>Сертификаты</span>
                </div>
                <div className="signup-card-feature">
                  <i className="fas fa-users"></i>
                  <span>Сообщество</span>
                </div>
              </div>
              <Link
                to="/main/studentsignup"
                className="btn-glass signup-card-btn"
              >
                <i className="fas fa-rocket"></i>
                Стать учеником
              </Link>
            </div>
          </div>

          <div
            className="signup-card glassmorphism fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="signup-card-image">
              <img
                src="/icons/teacher_icon.jpg"
                alt="Преподаватель"
                className="signup-card-avatar"
              />
            </div>
            <div className="signup-card-content">
              <h3 className="signup-card-title">Преподаватель</h3>
              <p className="signup-card-description">
                Создавайте курсы и делитесь знаниями с будущими программистами
              </p>
              <div className="signup-card-features">
                <div className="signup-card-feature">
                  <i className="fas fa-chalkboard-teacher"></i>
                  <span>Создание курсов</span>
                </div>
                <div className="signup-card-feature">
                  <i className="fas fa-chart-line"></i>
                  <span>Аналитика</span>
                </div>
                <div className="signup-card-feature">
                  <i className="fas fa-star"></i>
                  <span>Рейтинг</span>
                </div>
              </div>
              <Link
                to="/main/trainersignup"
                className="btn-glass signup-card-btn"
              >
                <i className="fas fa-graduation-cap"></i>
                Стать преподавателем
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
