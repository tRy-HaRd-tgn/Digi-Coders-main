import React from "react";
import { NavLink } from "react-router-dom";

const About = () => {
  return (
    <div>
      <>
        <header className="">
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
                  <h1 className="fw-bold mb-3">About Us</h1>
                  <p className="paragraph">
                    "Welcome to Digi Coders, where we believe that learning to
                    code should be fun and exciting! Our team of expert
                    educators and innovative teaching methods ensure that kids
                    not only gain essential coding skills but also have a blast
                    while doing it."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>
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
                              <span>Why Choose Us?</span>
                            </h2>
                          </div>
                          <div className="sub-heading">
                            <h4 className="mb-6">
                              <span>Innovative Learning Approach</span>
                            </h4>
                          </div>
                          <div className="content">
                            <p className="mb-3">
                              <span>
                                Digi Coders is a block-based coding program for
                                kids, where they can learn the basics of coding
                                while having fun. Through interactive and
                                engaging activities, kids can develop logical
                                thinking, problem-solving, and other valuable
                                skills that will prepare them for the future.
                              </span>
                            </p>
                            <p className="mb-3">
                              <span>
                                At Digi Coders, we believe that every child has
                                the potential to become a creator, innovator,
                                and problem-solver. That's why we've created a
                                fun and engaging platform for young coders to
                                learn, create and explore the world of coding.
                                Our program is designed to empower kids to
                                unleash their creativity, build their own
                                projects, and develop essential coding skills
                                that will set them up for success in the future.
                                With our experienced instructors, innovative
                                curriculum, and supportive community, we're here
                                to help kids discover their passion for coding
                                and bring their ideas to life.
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                </section>
              </section>
            </div>
          </div>
        </div>
      </>

      <div className="container mb-5">
        <section
          className="text-center rounded-7 shadow-4-strong"
          style={{
            backgroundImage: "url(/images/background-img4.jpg)",
            height: 350,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            position: "relative",
          }}
        >
          <div className="row">
            <div className="heading col-md-4 offset-md-7">
              <h2 className="text-center fw-bold my-3">
                <strong>Our Mission</strong>
              </h2>
              <div className="content">
                <p className="text-center align-items-justify mb-4">
                  Our mission is to provide quality education in the field of
                  digital technology. We aim to equip our students with the
                  necessary skills and knowledge to succeed in the digital
                  world. We strive to create a learning environment that fosters
                  creativity, innovation, and collaboration.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="container mb-10">
        <section
          className="text-center rounded-7 shadow-4-strong"
          style={{
            backgroundImage: "url(/images/background-img5.jpg)",
            height: 350,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            position: "relative",
          }}
        >
          <div className="row">
            <div className="heading col-md-4 offset-md-1">
              <h2 className="text-center fw-bold my-3">
                <strong>Our Vision</strong>
              </h2>
              <div className="content">
                <p className="text-center align-items-justify mb-4">
                  Our vision is to create a world where everyone has equal
                  access to high-quality education and technology. We strive to
                  empower individuals with digital skills and knowledge to
                  unlock their potential and achieve their dreams. Our goal is
                  to bridge the digital divide and foster a more inclusive and
                  connected global community.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
