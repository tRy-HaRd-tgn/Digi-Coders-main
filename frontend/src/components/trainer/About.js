import React from 'react'
import { NavLink } from 'react-router-dom'

const About = () => {
  return (
    <div>
      <>
        {/*Page Header*/}
        <header className=''>
          {/* Background image */}
          <div
            id="intro"
            className="bg-image"
            style={{
              backgroundImage: "url(/images/background-img3.webp)",
              height: 230,
              backgroundSize: "cover",
              backgroundPosition: "50% 65%",
              position: "relative"
            }}
          >
            <div
              className="mask text-white"
              style={{ backgroundColor: "rgba(35, 37, 45, 0.6)" }}
            >
              <div className="container d-flex align-items-center text-center h-100">
                <div className='page-heading'>
                  <h1 className="fw-bold mb-3">About Us</h1>
                  <p className='paragraph'>
                    "Welcome to Digi Coders, where we believe that learning
                    to code should be fun and exciting! Our team of expert
                    educators and innovative teaching methods ensure that
                    kids not only gain essential coding skills but also have
                    a blast while doing it."
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Background image */}
        </header>
        {/*Page Header*/}
      </>

      {/* About Us */}
      <>
        <div className='mb-7'>
          <div style={{ display: "none" }} />
          <div>
            <div data-draggable="true" style={{ position: "relative" }}>
              {/**/}
              {/**/}
              <section
                draggable="false"
                className="overflow-hidden pt-0"
                data-v-271253ee=""
              >
                <section>
                  {" "}
                  {/* Jumbotron */}
                  <div className="py-2 text-center" style={{ backgroundColor: '#f6feff' }}>
                    <div className="container pb-md-5">
                      <div className="row d-flex justify-content-center">
                        <div className="header-text col-lg-10">
                          <div className='heading'>
                            <h2 className="mt-5 mb-3 display-3">
                              <span>Why Choose Us?</span>
                            </h2>
                          </div>
                          <div className='sub-heading'>
                            <h4 className="mb-6">
                              <span>Innovative Learning Approach</span>
                            </h4>
                          </div>
                          <div className='content'>
                            <p className="mb-3">
                              <span>Digi Coders is a block-based coding program for kids, where
                                they can learn the basics of coding while having fun. Through
                                interactive and engaging activities, kids can develop logical
                                thinking, problem-solving, and other valuable skills that will
                                prepare them for the future.</span>
                            </p>
                            <p className="mb-3">
                              <span>At Digi Coders, we believe that every child has the potential
                                to become a creator, innovator, and problem-solver. That's why
                                we've created a fun and engaging platform for young coders to
                                learn, create and explore the world of coding. Our program is
                                designed to empower kids to unleash their creativity, build
                                their own projects, and develop essential coding skills that
                                will set them up for success in the future. With our experienced
                                instructors, innovative curriculum, and supportive community,
                                we're here to help kids discover their passion for coding and
                                bring their ideas to life.</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  {/* Jumbotron */}
                </section>
              </section>
              {/**/}
            </div>
          </div>
        </div>
      </>
      {/* About Us */}

      {/* Our Mision */}
      <div className="container mb-5">
        {/* Section: Block Content */}
        <section className="text-center rounded-7 shadow-4-strong"
          style={{
            backgroundImage: "url(/images/background-img4.jpg)",
            height: 350,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            position: "relative"
          }}
        >
          {/*Grid row*/}
          <div className="row">
            {/*Grid column*/}
            <div className="heading col-md-4 offset-md-7">
              <h2 className="text-center fw-bold my-3">
                <strong>Our Mission</strong>
              </h2>
              <div className="content">
                <p className="text-center align-items-justify mb-4">
                  Our mission is to provide quality education in the field of digital technology.
                  We aim to equip our students with the necessary skills and knowledge to succeed
                  in the digital world. We strive to create a learning environment that fosters
                  creativity, innovation, and collaboration.
                </p>
              </div>
            </div>
            {/*Grid column*/}
          </div>
          {/*Grid row*/}
        </section >
        {/* Section: Block Content */}
      </div >
      {/* Our Mission */}

      {/* Our Vision */}
      <div className="container mb-10">
        {/* Section: Block Content */}
        <section className="text-center rounded-7 shadow-4-strong"
          style={{
            backgroundImage: "url(/images/background-img5.jpg)",
            height: 350,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            position: "relative"
          }}
        >
          {/*Grid row*/}
          <div className="row">
            {/*Grid column*/}
            <div className="heading col-md-4 offset-md-1">
              <h2 className="text-center fw-bold my-3">
                <strong>Our Vision</strong>
              </h2>
              <div className="content">
                <p className="text-center align-items-justify mb-4">
                  Our vision is to create a world where everyone has equal access to high-quality
                  education and technology. We strive to empower individuals with digital skills
                  and knowledge to unlock their potential and achieve their dreams. Our goal is to
                  bridge the digital divide and foster a more inclusive and connected global
                  community.
                </p>
              </div>
            </div>
            {/*Grid column*/}
          </div>
          {/*Grid row*/}
        </section >
        {/* Section: Block Content */}
      </div >
      {/* Our Vision */}

      {/* Team Members */}
      <>
        <div className="mb-10">
          <div data-draggable="true" style={{ position: "relative" }}>
            {/**/}
            {/**/}
            <section draggable="false" className="container" data-v-271253ee="">
              <section className="">
                <div className='heading'>
                  <h2 className="mb-3 text-center display-3">
                    <span>Meet Our Team</span>
                  </h2>
                </div>
                <div className='sub-heading'>
                  <h4 className="mb-10 text-center">
                    <span>Faces behind our success</span>
                  </h4>
                </div>
                <div className="row text-center gx-lg-5">
                  <div className="col-lg-4 mb-10 mb-lg-0 hover-zoom">
                    <div className="card rounded-7 shadow-4-strong h-100">
                      <div
                        className="d-flex justify-content-center"
                        style={{ marginTop: "-75px" }}
                      >
                        {" "}
                        <img
                          src="/images/team-member-1.png"
                          className="rounded-circle shadow-4-strong"
                          alt=""
                          style={{ width: 150, height: 150, backgroundPosition: "center", backgroundSize: "cover" }}
                          aria-controls="#picker-editor"
                        />{" "}
                      </div>
                      <div className="card-body">
                        <h4 className="card-tittle fw-bold mb-3">
                          <strong>Prince Prajapati</strong>
                        </h4>
                        <h6 className="mb-3">FullStack Developer</h6>
                        {/* icons */}
                        <div>
                          <button type="button" className="btn btn-floating text-white mx-1">
                            <NavLink to="https://www.facebook.com/profile.php?id=100066912692926" className="me-4 text-reset">
                              <i className="fab fa-facebook-f" />
                            </NavLink>
                          </button>
                          <button type="button" className="btn btn-floating text-white mx-1">
                            <NavLink to="https://www.instagram.com/i_am_prince067/" className="me-4 text-reset">
                              <i className="fab fa-instagram" />
                            </NavLink>
                          </button>
                          <button type="button" className="btn btn-floating text-white mx-1">
                            <NavLink to="https://www.linkedin.com/in/prince-prajapati-18243b1a0/" className="me-4 text-reset">
                              <i className="fab fa-linkedin" />
                            </NavLink>
                          </button>
                          <button type="button" className="btn btn-floating text-white mx-1">
                            <NavLink to="https://github.com/prince8948" className="me-4 text-reset">
                              <i className="fab fa-github" />
                            </NavLink>
                          </button>
                        </div>
                        {/* icons */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-10 mb-lg-0 hover-zoom">
                    <div className="card rounded-7 shadow-4-strong h-100">
                      <div
                        className="d-flex justify-content-center"
                        style={{ marginTop: "-75px" }}
                      >
                        {" "}
                        <img
                          src="/images/team-member-2.png"
                          className="rounded-circle shadow-4-strong"
                          alt=""
                          style={{ width: 150, height: 150 }}
                          aria-controls="#picker-editor"
                        />{" "}
                      </div>
                      <div className="card-body">
                        <h4 className="card-tittle fw-bold mb-3">
                          <strong>Mohit Mishra</strong>
                        </h4>
                        <h6 className="mb-3">Mern Stack Developer</h6>
                        {/* icons */}
                        <div>
                          <button type="button" className="btn btn-floating text-white mx-1">
                            <NavLink to="https://www.facebook.com/profile.php?id=100007619438980" className="me-4 text-reset">
                              <i className="fab fa-facebook-f" />
                            </NavLink>
                          </button>
                          <button type="button" className="btn btn-floating text-white mx-1">
                            <NavLink to="https://www.instagram.com/mohit_mishra_1504/" className="me-4 text-reset">
                              <i className="fab fa-instagram" />
                            </NavLink>
                          </button>
                          <button type="button" className="btn btn-floating text-white mx-1">
                            <NavLink to="https://www.linkedin.com/in/mohit-mishra-a3a314173/" className="me-4 text-reset">
                              <i className="fab fa-linkedin" />
                            </NavLink>
                          </button>
                          <button type="button" className="btn btn-floating text-white mx-1">
                            <NavLink to="https://github.com/mohitgithub1504" className="me-4 text-reset">
                              <i className="fab fa-github" />
                            </NavLink>
                          </button>
                        </div>
                        {/* icons */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-10 mb-lg-0 hover-zoom">
                    <div className="card rounded-7 shadow-4-strong h-100">
                      <div
                        className="d-flex justify-content-center"
                        style={{ marginTop: "-75px" }}
                      >
                        {" "}
                        <img
                          src="/images/team-member-3.png"
                          className="rounded-circle shadow-4-strong"
                          alt=""
                          style={{ width: 150, height: 150 }}
                          aria-controls="#picker-editor"
                        />{" "}
                      </div>
                      <div className="card-body">
                        <h4 className="card-tittle fw-bold mb-3">
                          <strong>Rishabh Agnihotri</strong>
                        </h4>
                        <h6 className="mb-3">Frontend Developer</h6>
                        {/* icons */}
                        <div>
                          <button type="button" className="btn btn-floating text-white mx-1">
                            <NavLink to="" className="me-4 text-reset">
                              <i className="fab fa-facebook-f" />
                            </NavLink>
                          </button>
                          <button type="button" className="btn btn-floating text-white mx-1">
                            <NavLink to="" className="me-4 text-reset">
                              <i className="fab fa-instagram" />
                            </NavLink>
                          </button>
                          <button type="button" className="btn btn-floating text-white mx-1">
                            <NavLink to="" className="me-4 text-reset">
                              <i className="fab fa-linkedin" />
                            </NavLink>
                          </button>
                          <button type="button" className="btn btn-floating text-white mx-1">
                            <NavLink to="" className="me-4 text-reset">
                              <i className="fab fa-github" />
                            </NavLink>
                          </button>
                        </div>
                        {/* icons */}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </section>
            {/**/}
          </div>
        </div>
      </>
      {/* Team Members */}

    </div >
  )
}

export default About