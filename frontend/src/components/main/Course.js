import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Course = () => {
  const navigate = useNavigate();

  const handleCourseClick = (category) => {
    navigate(`/user/viewchapters?category=${category}`);
  };

  return (
    <div className="course-container">
      <>
        <header className="mb-10">
          <div
            id="intro"
            className="bg-image"
            style={{
              backgroundImage: "url(/images/background-img3.webp)",
              height: 230,
              backgroundSize: "cover",
              backgroundPosition: "50% 65%",
              position: "relative",
            }}
          >
            <div
              className="mask text-white"
              style={{ backgroundColor: "rgba(35, 37, 45, 0.6)" }}
            >
              <div className="container d-flex align-items-center text-center h-100">
                <div className="page-heading">
                  <h1 className="fw-bold mb-3">Our Courses</h1>
                  <p className="paragraph">
                    "Give Your Child the Gift of Coding with Our Exciting and
                    Engaging Courses! Our Curriculum is Designed to Help Kids
                    Develop Strong Problem-Solving and Logical Reasoning Skills,
                    While Building a Foundation for a Lifetime of Learning."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>

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
                          <strong>20 Classes</strong>
                        </h5>
                        <h6 className="mb-3">
                          Duration : <strong>2 Months</strong>
                        </h6>

                        <hr className="hr hr-blurry" />

                        <p className="card-text">
                          An ideal course to help kids quickly grasp the basics
                          of html programming and start writing code using
                          blocks.
                        </p>
                        <button
                          className="btn btn-primary my-3"
                          onClick={() => handleCourseClick("HTML")}
                        >
                          Learn More
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
                          <strong>30 Classes</strong>
                        </h5>
                        <h6 className="mb-3">
                          Duration : <strong>3 Months</strong>
                        </h6>

                        <hr className="hr hr-blurry" />

                        <p className="card-text">
                          An ideal course to help kids quickly grasp the basics
                          of javascript programming and start writing code using
                          blocks.
                        </p>

                        <button
                          className="btn btn-primary my-3"
                          onClick={() => handleCourseClick("JavaScript")}
                        >
                          Learn More
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
                          <strong>25 Classes</strong>
                        </h5>
                        <h6 className="mb-3">
                          Duration : <strong>3 Months</strong>
                        </h6>

                        <hr className="hr hr-blurry" />

                        <p className="card-text">
                          An ideal course to help kids quickly grasp the basics
                          of python programming and start writing code using
                          blocks.
                        </p>

                        <button
                          className="btn btn-primary my-3"
                          onClick={() => handleCourseClick("Python")}
                        >
                          Learn More
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
                    <span>Our Upcoming Courses</span>
                  </h2>
                </div>
                <div className="sub-heading">
                  <h4 className="mb-8 text-center">
                    <span>Discover a world of coding with our courses</span>
                  </h4>
                </div>
                <div className="row text-center gx-lg-5 mb-6">
                  {/* First column */}
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
                          <strong>50 Classes</strong>
                        </h5>
                        <h6 className="mb-3">
                          Duration : <strong>7 Months</strong>
                        </h6>
                        {/* Divider here */}
                        <hr className="hr hr-blurry" />

                        <p className="card-text">
                          A perfect course for kids who want to excel at coding
                          and build complex games and applications.
                        </p>
                        <button className="btn btn-primary my-3">
                          Learn More
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
                          <strong>40 Classes</strong>
                        </h5>
                        <h6 className="mb-3">
                          Duration : <strong>6 Months</strong>
                        </h6>

                        <hr className="hr hr-blurry" />

                        <p className="card-text">
                          A perfect course for kids who want to excel at coding
                          and build complex games and applications.
                        </p>

                        <button className="btn btn-primary my-3">
                          Learn More
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
                          <strong>50 Classes</strong>
                        </h5>
                        <h6 className="mb-3">
                          Duration : <strong>7 Months</strong>
                        </h6>
                        {/* Divider here */}
                        <hr className="hr hr-blurry" />

                        <p className="card-text">
                          A perfect course for kids who want to excel at coding
                          and build complex games and applications.
                        </p>

                        <button className="btn btn-primary my-3">
                          Learn More
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
