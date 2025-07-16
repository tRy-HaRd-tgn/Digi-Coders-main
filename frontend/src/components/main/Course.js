import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Course = () => {
  const navigate = useNavigate();

  const handleCourseClick = (category) => {
    navigate(`/user/viewchapters?category=${category}`);
  };

  return (
    <div className="course-container">
      <div
        className="about-section"
        style={{
          backgroundImage: "url(/images/background-img3.webp)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            filter: "blur(4px)",
            backgroundImage: "inherit",
            backgroundSize: "cover",
            backgroundPosition: "50% 65%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(30, 40, 60, 0.7)",
            zIndex: 2,
          }}
        />
        <div
          className="about-content"
          style={{ position: "relative", zIndex: 3 }}
        >
          <h1 className="about-title">НАШИ КУРСЫ</h1>
          <p className="about-description">
            "Подарите вашему ребёнку возможность изучать программирование с
            нашими увлекательными и интересными курсами! Наша программа помогает
            детям развивать навыки решения задач и логического мышления,
            закладывая фундамент для успешного будущего."
          </p>
        </div>
      </div>

      <div className="course-content">
        <div className="mb-8">
          <div data-draggable="true">
            <section draggable="false" className="container" data-v-271253ee="">
              <section>
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
                          alt="HTML Course"
                        />
                        <div
                          className="mask"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.15)",
                            cursor: "pointer",
                          }}
                          onClick={() => handleCourseClick("HTML")}
                        />
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
                          <strong>20 занятий</strong>
                        </h5>
                        <h6 className="mb-3">
                          Длительность: <strong>2 месяца</strong>
                        </h6>

                        <hr className="hr hr-blurry" />

                        <p className="card-text">
                          Идеальный курс, чтобы дети быстро освоили основы HTML
                          и начали писать код с помощью блоков.
                        </p>
                        <button
                          className="btn btn-primary my-3"
                          onClick={() => handleCourseClick("HTML")}
                        >
                          Подробнее
                        </button>
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
                          src="/images/course-js.jpg"
                          className="img-fluid"
                          alt="JavaScript Course"
                        />
                        <div
                          className="mask"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.15)",
                            cursor: "pointer",
                          }}
                          onClick={() => handleCourseClick("JavaScript")}
                        />
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
                          <strong>30 занятий</strong>
                        </h5>
                        <h6 className="mb-3">
                          Длительность: <strong>3 месяца</strong>
                        </h6>

                        <hr className="hr hr-blurry" />

                        <p className="card-text">
                          Идеальный курс, чтобы дети быстро освоили основы
                          JavaScript и начали писать код с помощью блоков.
                        </p>

                        <button
                          className="btn btn-primary my-3"
                          onClick={() => handleCourseClick("JavaScript")}
                        >
                          Подробнее
                        </button>
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
                          alt="Python Course"
                        />
                        <div
                          className="mask"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.15)",
                            cursor: "pointer",
                          }}
                          onClick={() => handleCourseClick("Python")}
                        />
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
                          <strong>25 занятий</strong>
                        </h5>
                        <h6 className="mb-3">
                          Длительность: <strong>3 месяца</strong>
                        </h6>

                        <hr className="hr hr-blurry" />

                        <p className="card-text">
                          Идеальный курс, чтобы дети быстро освоили основы
                          Python и начали писать код с помощью блоков.
                        </p>

                        <button
                          className="btn btn-primary my-3"
                          onClick={() => handleCourseClick("Python")}
                        >
                          Подробнее
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </div>
        </div>

        <div className="mb-8">
          <div data-draggable="true">
            <section draggable="false" className="container" data-v-271253ee="">
              <section>
                <div className="heading">
                  <h2 className="mb-3 text-center display-3">
                    <span>Наши будущие курсы</span>
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
                          src="/images/course-upcomming1.jpg"
                          className="img-fluid"
                          alt="Game Development Course"
                        />
                        <NavLink to="#">
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
                            fontSize: "30px",
                            letterSpacing: "1px",
                          }}
                        >
                          <strong>Game Development</strong>
                        </h4>
                        <h5 className="mb-3">
                          <strong>50 занятий</strong>
                        </h5>
                        <h6 className="mb-3">
                          Длительность: <strong>7 месяцев</strong>
                        </h6>
                        {/* Divider here */}
                        <hr className="hr hr-blurry" />

                        <p className="card-text">
                          Идеальный курс для детей, которые хотят углубиться в
                          программирование и создавать сложные игры и
                          приложения.
                        </p>
                        <button className="btn btn-primary my-3">
                          Подробнее
                        </button>
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
                          src="/images/course-upcomming2.jpg"
                          className="img-fluid"
                          alt="Web Development Course"
                        />
                        <NavLink to="#">
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
                          <strong>Web Development</strong>
                        </h4>
                        <h5 className="mb-3">
                          <strong>40 занятий</strong>
                        </h5>
                        <h6 className="mb-3">
                          Длительность: <strong>6 месяцев</strong>
                        </h6>

                        <hr className="hr hr-blurry" />

                        <p className="card-text">
                          Идеальный курс для детей, которые хотят углубиться в
                          программирование и создавать сложные игры и
                          приложения.
                        </p>

                        <button className="btn btn-primary my-3">
                          Подробнее
                        </button>
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
                          src="/images/course-upcomming3.jpg"
                          className="img-fluid"
                          alt="Roblox Course"
                        />
                        <NavLink to="#">
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
                          <strong>Roblox</strong>
                        </h4>
                        <h5 className="mb-3">
                          <strong>50 занятий</strong>
                        </h5>
                        <h6 className="mb-3">
                          Длительность: <strong>7 месяцев</strong>
                        </h6>

                        <hr className="hr hr-blurry" />

                        <p className="card-text">
                          Идеальный курс для детей, которые хотят углубиться в
                          программирование и создавать сложные игры и
                          приложения.
                        </p>

                        <button className="btn btn-primary my-3">
                          Подробнее
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
