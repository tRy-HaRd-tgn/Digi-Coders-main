import React from 'react'
import { NavLink } from 'react-router-dom'

export const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer className="text-center text-lg-start text-white" style={{ backgroundColor: "#000" }}>
        {/* Section: Social media */}
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          {/* Left */}
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          {/* Left */}
          {/* Right */}
          <div>
            <button type="button" className="btn btn-floating text-white mx-1">
              <a href="#" className="me-4 text-reset">
                <i className="fab fa-facebook-f" />
              </a>
            </button>
            <button type="button" className="btn btn-floating text-white mx-1">
              <a href="#" className="me-4 text-reset">
                <i className="fab fa-twitter" />
              </a>
            </button>
            <button type="button" className="btn btn-floating text-white mx-1">
              <a href="#" className="me-4 text-reset">
                <i className="fab fa-google" />
              </a>
            </button>
            <button type="button" className="btn btn-floating text-white mx-1">
              <a href="#" className="me-4 text-reset">
                <i className="fab fa-instagram" />
              </a>
            </button>
            <button type="button" className="btn btn-floating text-white mx-1">
              <a href="#" className="me-4 text-reset">
                <i className="fab fa-linkedin" />
              </a>
            </button>
            <button type="button" className="btn btn-floating text-white mx-1">
              <a href="#" className="me-4 text-reset">
                <i className="fab fa-github" />
              </a>
            </button>

          </div>
          {/* Right */}
        </section>
        {/* Section: Social media */}
        {/* Section: Links  */}
        <section className="">
          <div className="container text-center text-md-start mt-5">
            {/* Grid row */}
            <div className="row mt-3">
              {/* Grid column */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* Content */}
                <a className="navbar-brand me-2" href="#">
                  <img
                    src="/logo/logo-white.png"
                    height={40}
                    alt="Digi Coders Logo"
                    loading="lazy"
                    style={{ marginBottom: "25px" }}
                  />
                </a>
                <p className='text-justify'>
                  Digi Coders is a block-based coding program for kids, where
                  they can learn the basics of coding while having fun. 
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">Courses</h6>
                <p>
                  <NavLink to="/user/viewchapters" className="text-reset custom-link-hover">
                    HTML
                  </NavLink>
                </p>
                <p>
                  <NavLink to="/user/viewchapters" className="text-reset custom-link-hover">
                    JavaScript
                  </NavLink>
                </p>
                <p>
                  <NavLink to="/user/viewchapters" className="text-reset custom-link-hover">
                    Python
                  </NavLink>
                </p>
                <p>
                  <NavLink to="/main/course" className="text-reset custom-link-hover">
                    Upcoming Courses
                  </NavLink>
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <NavLink to="/main/home" className="text-reset custom-link-hover">
                    Home
                  </NavLink>
                </p>
                <p>
                  <NavLink to="/main/course" className="text-reset custom-link-hover">
                    Courses
                  </NavLink>
                </p>
                <p>
                  <NavLink to="/main/about" className="text-reset custom-link-hover">
                    About
                  </NavLink>
                </p>
                <p>
                  <NavLink to="/main/contact" className="text-reset custom-link-hover">
                    Contact
                  </NavLink>
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="footer-icon fas fa-home me-3" />Hazrat Ganj, Lucknow 226001, UP
                </p>
                <p>
                  <i className="footer-icon fas fa-envelope me-3" />digicoders12@gmail.com
                </p>
                <p>
                  <i className="footer-icon fas fa-phone me-3" />+91 9260964544
                </p>
                <p>
                  <i className="footer-icon fas fa-print me-3" />+91 8948911871
                </p>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
          </div>
        </section>
        {/* Section: Links  */}
        {/* Copyright */}
        <div
          className="text-center p-4"
          style={{ backgroundColor: "#1b1b1b" }}
        >
          © 2023 Copyright :&nbsp;
          <NavLink className="text-reset fw-bold custom-link-hover" to="#">
            DigiCoders.com
          </NavLink>
        </div>
        {/* Copyright */}
      </footer>
      {/* Footer */}
    </>

  )
}
