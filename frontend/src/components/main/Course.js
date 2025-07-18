import React from "react";
import { useNavigate } from "react-router-dom";

const Course = () => {
  const navigate = useNavigate();

  const handleCourseClick = (category) => {
    navigate(`/user/viewchapters?category=${category}`);
  };

  const currentCourses = [
    {
      id: "html",
      title: "HTML",
      lessons: 26,
      duration: "2 недели",
      image: "/images/course-html.jpg",
      description:
        "Идеальный курс, чтобы дети быстро освоили основы HTML и начали писать код с помощью блоков.",
      category: "HTML",
      status: "active",
    },
    {
      id: "javascript",
      title: "JavaScript",
      lessons: 26,
      duration: "2 недели",
      image: "/images/course-js.jpg",
      description:
        "Изучение основ JS и практическое программирование с помощью интерактивных блоков.",
      category: "JavaScript",
      status: "active",
    },
    {
      id: "python",
      title: "Python",
      lessons: 26,
      duration: "2 недели",
      image: "/images/course-python.jpg",
      description:
        "Первые шаги в Python и решение задач с помощью блоков. Отличный старт для детей.",
      category: "Python",
      status: "active",
    },
  ];

  return (
    <div className="course-modern-bg">
      {/* Hero Section */}
      <section
        className="course-hero-section glassmorphism"
        style={{ borderRadius: "0px" }}
      >
        <div className="course-hero-content">
          <div className="course-hero-badge">
            <span>📚</span> Образовательные курсы
          </div>
          <h1 className="course-hero-title fade-in">Наши курсы</h1>
          <p className="course-hero-subtitle fade-in-delay">
            Подарите вашему ребёнку возможность изучать программирование с
            нашими увлекательными и интересными курсами! Наша программа помогает
            детям развивать навыки решения задач и логического мышления,
            закладывая фундамент для успешного будущего.
          </p>
          <div className="course-hero-stats fade-in-delay-2">
            <div className="course-hero-stat">
              <span className="course-hero-stat-number">6+</span>
              <span className="course-hero-stat-label">Курсов</span>
            </div>
            <div className="course-hero-stat">
              <span className="course-hero-stat-number">200+</span>
              <span className="course-hero-stat-label">Уроков</span>
            </div>
            <div className="course-hero-stat">
              <span className="course-hero-stat-number">95%</span>
              <span className="course-hero-stat-label">Успех</span>
            </div>
          </div>
        </div>
        <div className="course-hero-image-wrap">
          <div className="course-hero-image-card glassmorphism">
            <div className="course-hero-image-content">
              <div className="course-hero-image-header">
                <h3>DIGI CODERS</h3>
                <p>Программирование для детей от 5 лет</p>
              </div>
              <div className="course-hero-image-visual">
                <div className="course-blocks">
                  <div className="course-block">HTML</div>
                  <div className="course-block">CSS</div>
                  <div className="course-block">JS</div>
                  <div className="course-block">Python</div>
                </div>
                <div className="course-illustration">
                  <div className="course-avatar">👨‍💻</div>
                  <div className="course-laptop">
                    <div className="course-screen">
                      <div className="course-code-line">&lt;html&gt;</div>
                      <div className="course-code-line">&lt;body&gt;</div>
                      <div className="course-code-line">&lt;/body&gt;</div>
                      <div className="course-code-line">&lt;/html&gt;</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Courses Section */}
      <section className="courses-current-section">
        <h2 className="section-title">Доступные курсы</h2>
        <p className="section-subtitle">
          Начните обучение прямо сейчас с нашими активными курсами
        </p>
        <div className="courses-modern-grid">
          {currentCourses.map((course, index) => (
            <div
              key={course.id}
              className="course-modern-card glassmorphism fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="course-modern-image-wrap">
                <img
                  src={course.image}
                  alt={course.title}
                  className="course-modern-img"
                />
                <div className="course-modern-overlay">
                  <div className="course-modern-status active">Активный</div>
                </div>
              </div>
              <div className="course-modern-content">
                <div className="course-modern-header">
                  <h3 className="course-modern-title">{course.title}</h3>
                  <div className="course-modern-meta">
                    <span className="course-modern-lessons">
                      <i className="fas fa-book"></i> {course.lessons} занятий
                    </span>
                    <span className="course-modern-duration">
                      <i className="fas fa-clock"></i> {course.duration}
                    </span>
                  </div>
                </div>
                <p className="course-modern-description">
                  {course.description}
                </p>
                <div className="course-modern-actions">
                  <button
                    className="btn-glass"
                    onClick={() => handleCourseClick(course.category)}
                  >
                    <i className="fas fa-play"></i>
                    Начать обучение
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Course Features Section */}
      <section className="course-features-section">
        <h2 className="section-title">Почему наши курсы эффективны?</h2>
        <div className="course-features-grid">
          <div className="course-feature-card glassmorphism fade-in-up">
            <div className="course-feature-icon">
              <i className="fas fa-puzzle-piece"></i>
            </div>
            <h4>Блочное программирование</h4>
            <p>
              Дети учатся программировать с помощью визуальных блоков, что
              делает процесс понятным и увлекательным.
            </p>
          </div>
          <div
            className="course-feature-card glassmorphism fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="course-feature-icon">
              <i className="fas fa-gamepad"></i>
            </div>
            <h4>Игровой подход</h4>
            <p>
              Обучение через игры и интерактивные задания, которые мотивируют
              детей к изучению программирования.
            </p>
          </div>
          <div
            className="course-feature-card glassmorphism fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="course-feature-icon">
              <i className="fas fa-users"></i>
            </div>
            <h4>Персональный подход</h4>
            <p>
              Каждый ребенок получает индивидуальное внимание и может учиться в
              своем темпе.
            </p>
          </div>
          <div
            className="course-feature-card glassmorphism fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="course-feature-icon">
              <i className="fas fa-certificate"></i>
            </div>
            <h4>Сертификаты</h4>
            <p>
              По окончании курса дети получают сертификат, подтверждающий их
              достижения.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Course;
