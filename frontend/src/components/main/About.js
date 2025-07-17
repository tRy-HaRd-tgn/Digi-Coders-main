import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";

const About = () => {
  const [animatedStats, setAnimatedStats] = useState({
    students: 0,
    courses: 0,
    years: 0,
    satisfaction: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateStats();
        }
      },
      { threshold: 0.1 }
    );

    const statsSection = document.querySelector(".stats-modern-section");
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  const animateStats = () => {
    const targets = { students: 500, courses: 50, years: 5, satisfaction: 95 };
    const duration = 2000;
    const steps = 60;
    const stepValue = {};

    Object.keys(targets).forEach((key) => {
      stepValue[key] = targets[key] / steps;
    });

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setAnimatedStats((prev) => ({
        students: Math.min(
          prev.students + stepValue.students,
          targets.students
        ),
        courses: Math.min(prev.courses + stepValue.courses, targets.courses),
        years: Math.min(prev.years + stepValue.years, targets.years),
        satisfaction: Math.min(
          prev.satisfaction + stepValue.satisfaction,
          targets.satisfaction
        ),
      }));

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);
  };

  const teamMembers = [
    {
      name: "Анна Петрова",
      role: "Главный методист",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      description: "Специалист по детскому образованию с 8-летним опытом",
    },
    {
      name: "Дмитрий Соколов",
      role: "Технический директор",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      description:
        "Full-stack разработчик с фокусом на образовательные технологии",
    },
    {
      name: "Елена Морозова",
      role: "Педагог-психолог",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      description: "Специалист по развитию когнитивных навыков у детей",
    },
    {
      name: "Михаил Волков",
      role: "Lead Developer",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      description:
        "Эксперт по игровому программированию и интерактивному обучению",
    },
  ];

  const values = [
    {
      icon: "fas fa-lightbulb",
      title: "Инновации",
      description: "Постоянно внедряем новые технологии и методики обучения",
    },
    {
      icon: "fas fa-hands-helping",
      title: "Сотрудничество",
      description: "Создаем поддерживающую среду для развития каждого ребенка",
    },
    {
      icon: "fas fa-palette",
      title: "Творчество",
      description: "Поощряем креативное мышление и нестандартные решения",
    },
    {
      icon: "fas fa-chart-line",
      title: "Развитие",
      description: "Фокусируемся на постоянном росте и улучшении навыков",
    },
  ];

  return (
    <div className="home-modern-bg">
      {/* Hero Section */}
      <section className="hero-section glassmorphism">
        <div className="hero-content">
          <div className="hero-badge">
            <span>🌟</span> О нашей команде
          </div>
          <h1 className="hero-title fade-in">Digi Coders</h1>
          <p className="hero-subtitle fade-in-delay">
            Мы создаем будущее программирования для детей, делая обучение
            увлекательным и эффективным
          </p>
          <div className="hero-features fade-in-delay-2">
            <div className="hero-feature">
              <i className="fas fa-graduation-cap"></i>
              <span>Опытные педагоги</span>
            </div>
            <div className="hero-feature">
              <i className="fas fa-rocket"></i>
              <span>Инновационные методики</span>
            </div>
            <div className="hero-feature">
              <i className="fas fa-heart"></i>
              <span>Индивидуальный подход</span>
            </div>
          </div>
        </div>
        <div className="hero-image-wrap">
          <div className="hero-image-card glassmorphism">
            <div className="hero-image-content">
              <div className="hero-image-header">
                <h3>НАША ИСТОРИЯ</h3>
                <p>Создаем образовательную революцию с 2019 года</p>
              </div>
              <div className="hero-image-visual">
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-marker">2019</div>
                    <div className="timeline-content">Основание проекта</div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker">2021</div>
                    <div className="timeline-content">Первые 100 учеников</div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker">2023</div>
                    <div className="timeline-content">
                      500+ успешных выпускников
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-modern-section">
        <div className="stats-modern-cards">
          <div className="stat-modern-card glassmorphism fade-in-up">
            <div className="stat-modern-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-modern-number">
              {Math.round(animatedStats.students)}+
            </div>
            <div className="stat-modern-label">Учеников</div>
          </div>
          <div
            className="stat-modern-card glassmorphism fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="stat-modern-icon">
              <i className="fas fa-book"></i>
            </div>
            <div className="stat-modern-number">
              {Math.round(animatedStats.courses)}+
            </div>
            <div className="stat-modern-label">Курсов</div>
          </div>
          <div
            className="stat-modern-card glassmorphism fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="stat-modern-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="stat-modern-number">
              {Math.round(animatedStats.years)}
            </div>
            <div className="stat-modern-label">Лет опыта</div>
          </div>
          <div
            className="stat-modern-card glassmorphism fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="stat-modern-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="stat-modern-number">
              {Math.round(animatedStats.satisfaction)}%
            </div>
            <div className="stat-modern-label">Довольных родителей</div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-modern-section">
        <div className="mission-vision-modern-cards">
          <div className="mission-vision-modern-card glassmorphism fade-in-up">
            <div className="mission-vision-modern-icon">
              <i className="fas fa-bullseye"></i>
            </div>
            <h3>НАША МИССИЯ</h3>
            <p>
              Предоставить качественное образование в области цифровых
              технологий, развивая у детей креативность, логическое мышление и
              навыки решения проблем. Мы создаем образовательную среду, где
              каждый ребенок может раскрыть свой потенциал и стать создателем
              технологий будущего.
            </p>
          </div>
          <div
            className="mission-vision-modern-card glassmorphism fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="mission-vision-modern-icon">
              <i className="fas fa-eye"></i>
            </div>
            <h3>НАШЕ ВИДЕНИЕ</h3>
            <p>
              Создать мир, где каждый ребенок имеет равный доступ к
              качественному технологическому образованию. Мы стремимся
              преодолеть цифровое неравенство и способствовать формированию
              инклюзивного общества, где технологии служат инструментом для
              реализации мечтаний.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-modern-section">
        <h2 className="section-title">Наши ценности</h2>
        <div className="values-modern-cards">
          {values.map((value, index) => (
            <div
              key={index}
              className="value-modern-card glassmorphism fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="value-modern-icon">
                <i className={value.icon}></i>
              </div>
              <h4>{value.title}</h4>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="team-modern-section">
        <h2 className="section-title">Наша команда</h2>
        <div className="team-modern-cards">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team-modern-card glassmorphism fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="team-modern-avatar">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="team-modern-info">
                <h4>{member.name}</h4>
                <div className="team-modern-role">{member.role}</div>
                <p>{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
