import React, { useState } from 'react'
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom'
import app_config from '../../config';

const Home = () => {


  const [selectedEmoji, setSelectedEmoji] = useState('');

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const feedbackForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      emoji: "",
      message: "",
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      values.emoji = selectedEmoji;
      console.log(values);


      const res = await fetch(`${process.env.REACT_APP_API_URL}/contact/add`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(res.status);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: "Your feedback is successfully submitted",
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        resetForm();
        setSelectedEmoji('');
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    },

  });

  return (

    <div>

      {/* Header */}
      <>
        <header>
          {/* Background image */}
          <div
            className="p-5 mb-10 text-center bg-image"
            style={{
              backgroundImage: 'url("/images/banner.gif")',
              height: 600,
              backgroundSize: "cover",
              backgroundPosition: "50% 40%",
              backgroundColor: "rgba(0, 0, 0, 0)"
            }}
          >
          </div>
          {/* Background image */}
        </header>
      </>
      {/* Header */}

      {/* Benefits */}
      <>
        <div className="container mb-8">
          {/* Section */}
          <section>
            <div className='heading'>
              <h2 className="mt-5 mb-3 text-center display-3">
                <span>Benefits of Choosing Us</span>
              </h2>
            </div>
            <div className='sub-heading'>
              <h4 className="mb-8 text-center">
                <span>Empower your skills with us</span>
              </h4>
            </div>
            {/* Grid row */}
            <div className="row">
              {/* Grid column - 1 */}
              <div className="col-md-6 col-xl-3">
                <div className="card rounded-7 shadow-4-strong text-center text-white" style={{ backgroundColor: '#29c1fe' }}>
                  <div className="card-body">
                    <p className="mt-4 pt-2">
                      <i className="fas fa-chalkboard-user fa-4x" />
                    </p>
                    <h5 className="font-weight-normal text-white my-4 py-2">
                      Interactive Learning
                    </h5>
                    <p className="mb-4">
                      Hands-on approach to teaching kids coding concepts and encourages them to
                      think critically and problem-solve.
                    </p>
                  </div>
                </div>
              </div>
              {/* Grid column -1 */}
              {/* Grid column - 2 */}
              <div className="col-md-6 col-xl-3 mb-4">
                <div className="card rounded-7 shadow-4-strong text-center text-white" style={{ backgroundColor: '#000' }}>
                  <div className="card-body">
                    <p className="mt-4 pt-2">
                      <i className="fas fa-briefcase fa-4x" />
                    </p>
                    <h5 className="font-weight-normal text-white my-4 py-2">
                      Personalized Curriculum
                    </h5>
                    <p className="mb-4">
                      Tailored learning program for children based on their individual learning
                      styles, interests, and abilities.
                    </p>
                  </div>
                </div>
              </div>
              {/* Grid column - 2 */}
              {/* Grid column - 3 */}
              <div className="col-md-6 col-xl-3">
                <div className="card rounded-7 shadow-4-strong text-center text-white" style={{ backgroundColor: '#29c1fe' }}>
                  <div className="card-body">
                    <p className="mt-4 pt-2">
                      <i className="fas fa-gamepad fa-4x" />
                    </p>
                    <h5 className="font-weight-normal text-white my-4 py-2">
                      Game-Based Learning
                    </h5>
                    <p className="mb-4">
                      Game-based learning is an educational approach that uses games to teach
                      new concepts and skills.
                    </p>
                  </div>
                </div>
              </div>
              {/* Grid column - 3 */}
              {/* Grid column - 4 */}
              <div className="col-md-6 col-xl-3 mb-4">
                <div className="card rounded-7 shadow-4-strong text-center text-white" style={{ backgroundColor: '#000' }}>
                  <div className="card-body">
                    <p className="mt-4 pt-2">
                      <i className="fas fa-award fa-4x" />
                    </p>
                    <h5 className="font-weight-normal text-white my-4 py-2">
                      Certificate of Completion
                    </h5>
                    <p className="mb-4">
                      Awarded to kids for their successfully completion of interactive learning course or program.
                    </p>
                  </div>
                </div>
              </div>
              {/* Grid column - 4 */}
            </div>
            {/* Grid row */}
          </section>
          {/* Section */}
        </div>
      </>
      {/* Benefits */}

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
                            <p className="mb-6">
                              <span>At Digi Coders, we believe that every child has the potential
                                to become a creator, innovator, and problem-solver. That's why
                                we've created a fun and engaging platform for young coders to
                                learn, create and explore the world of coding. Our program is
                                designed to empower kids to unleash their creativity, build
                                their own projects, and develop essential coding skills that
                                will set them up for success in the future.</span>
                            </p>
                          </div>
                          <NavLink
                            className="btn btn-primary py-3 px-5 mb-5 mb-md-3 me-md-2"
                            to="/main/signup"
                            role="button"
                            aria-controls="#picker-editor"
                          >
                            Get Started
                          </NavLink>{" "}
                          <NavLink
                            className="btn btn-primary py-3 px-5 mb-5 mb-md-3 me-md-2"
                            to="/main/about"
                            role="button"
                            aria-controls="#picker-editor"
                          >
                            Learn more
                          </NavLink>
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

      {/* Feedback Form */}
      <div id="feedback-form-wrapper">
        <div id="floating-icon">
          <button
            type="button"
            className="btn btn-sm rounded-4"
            data-mdb-toggle="modal"
            data-mdb-target="#exampleModal"
            style={{ zIndex: 2 }}
          >
            Feedback
          </button>
        </div>
        <div id="feedback-form-modal">
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content" style={{ backgroundColor: '#f4f4f4' }}>
                <div className="d-md-flex justify-content-md-end mt-2 me-2">
                  <button
                    type="button"
                    className="btn-close"
                    data-mdb-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <form className="feedback-form mx-1 mx-md-4 text-black" onSubmit={feedbackForm.handleSubmit}>
                    <div className="d-flex flex-row align-items-center mb-5">
                      <div className="flex-fill mb-0">
                        <div className='mb-5'>
                          <h3>
                            How helpful was this?
                          </h3>
                        </div>
                        <div className='form-group has-icon mb-4'>
                          <i className="fas fa-user fa-lg form-control-icon" />
                          <input
                            type="text"
                            id="name"
                            name='name'
                            className="form-control form-control-lg"
                            placeholder="Enter Full Name"
                            value={feedbackForm.values.name}
                            onChange={feedbackForm.handleChange}
                          />
                        </div>
                        <div className='form-group has-icon mb-4'>
                          <i className="fas fa-envelope fa-lg form-control-icon" />
                          <input
                            type="email"
                            id="email"
                            name='email'
                            className="form-control form-control-lg"
                            placeholder="Enter Email Address"
                            value={feedbackForm.values.email}
                            onChange={feedbackForm.handleChange}
                          />
                        </div>
                        <div className="d-flex flex-row justify-content-center mb-4">
                          <div className="item">
                            <label for="0">
                              <input
                                className="radio"
                                type="radio"
                                name="emoji"
                                id="0"
                                value="🤬"
                                checked={selectedEmoji === '🤬'}
                                onChange={() => handleEmojiSelect('🤬')}
                              />
                              <span>🤬</span>
                            </label>
                          </div>
                          <div className="item">
                            <label for="1">
                              <input
                                className="radio"
                                type="radio"
                                name="emoji"
                                id="1"
                                value="🙁"
                                checked={selectedEmoji === '🙁'}
                                onChange={() => handleEmojiSelect('🙁')}
                              />
                              <span>🙁</span>
                            </label>
                          </div>
                          <div className="item">
                            <label for="2">
                              <input
                                className="radio"
                                type="radio"
                                name="emoji"
                                id="2"
                                value="😶"
                                checked={selectedEmoji === '😶'}
                                onChange={() => handleEmojiSelect('😶')}
                              />
                              <span>😶</span>
                            </label>
                          </div>
                          <div className="item">
                            <label for="3">
                              <input
                                className="radio"
                                type="radio"
                                name="emoji"
                                id="3"
                                value="😁"
                                checked={selectedEmoji === '😁'}
                                onChange={() => handleEmojiSelect('😁')}
                              />
                              <span>😁</span>
                            </label>
                          </div>
                          <div className="item">
                            <label for="4">
                              <input
                                className="radio"
                                type="radio"
                                name="emoji"
                                id="4"
                                value="😍"
                                checked={selectedEmoji === '😍'}
                                onChange={() => handleEmojiSelect('😍')}
                              />
                              <span>😍</span>
                            </label>
                          </div>
                        </div>
                        <div className='form-group has-icon mb-5'>
                          <i className="fas fa-pencil-alt fa-lg form-control-icon" />
                          {/* Text area fields */}
                          <textarea class="form-control form-control-lg" id="textarea" rows="4"
                            placeholder='Enter message....'
                            name='message'
                            value={feedbackForm.values.message}
                            onChange={feedbackForm.handleChange}
                          ></textarea>
                        </div>
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                          style={{ borderRadius: "10px", marginLeft: '0px' }}
                        >
                          Send Your Feedback &nbsp;
                          <i className="far fa-paper-plane" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Feedback Form */}

      {/* Our Course*/}
      <div className='mb-10'>
        <div data-draggable="true">
          {/**/}
          {/**/}
          <section draggable="false" className="container" data-v-271253ee="">
            <section>
              <div className='heading'>
                <h2 className="mb-3 text-center display-3">
                  <span>Our Popular Courses</span>
                </h2>
              </div>
              <div className='sub-heading'>
                <h4 className="mb-8 text-center">
                  <span>Discover a world of coding with our courses</span>
                </h4>
              </div>
              <div className="row text-center gx-lg-5 mb-6">
                {/* First column */}
                <div className="col-lg-4 col-md-12 mb-lg-0 hover-zoom">
                  <div className="card">
                    <div
                      class="mt-n3 bg-image hover-overlay ripple mx-3 shadow-4-strong rounded-6"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        src="/images/course-html.jpg"
                        className="img-fluid"
                      />
                      <NavLink to="/user/viewchapters">
                        <div
                          className="mask"
                          style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                        />
                      </NavLink>
                    </div>
                    <div className="card-body">
                      <h4 className="card-tittle my-3" style={{ backgroundColor: "#f1f1f1", fontSize: "32px", letterSpacing: "1px" }}>
                        <strong>HTML</strong>
                      </h4>
                      <h5 className="mb-3">
                        <strong>26 Classes</strong>
                      </h5>
                      <h6 className="mb-3">
                        Duration : <strong>2 Weeks</strong>
                      </h6>
                      {/* Divider here */}
                      <hr class="hr hr-blurry" />

                      <p className="card-text">
                        An ideal course to help kids quickly grasp the basics of html programming and start writing code using blocks.
                      </p>
                      <NavLink to="/user/viewchapters" className="btn btn-primary my-3">
                        Learn More
                      </NavLink>
                    </div>
                  </div>
                </div>
                {/* First column */}
                {/* Second column */}
                <div className="col-lg-4 col-md-12 mb-lg-0 hover-zoom">
                  <div className="card">
                    <div
                      class="mt-n3 bg-image hover-overlay ripple mx-3 shadow-4-strong rounded-6"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        src="/images/course-js.jpg"
                        className="img-fluid"
                      />
                      <NavLink to="/user/viewchapters">
                        <div
                          className="mask"
                          style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                        />
                      </NavLink>
                    </div>
                    <div className="card-body">
                      <h4 className="card-tittle my-3" style={{ backgroundColor: "#f1f1f1", fontSize: "32px", letterSpacing: "1px" }}>
                        <strong>JavaScript</strong>
                      </h4>
                      <h5 className="mb-3">
                        <strong>26 Classes</strong>
                      </h5>
                      <h6 className="mb-3">
                        Duration : <strong>2 Weeks</strong>
                      </h6>
                      {/* Divider here */}
                      <hr class="hr hr-blurry" />

                      <p className="card-text">
                        An ideal course to help kids quickly grasp the basics of javascript programming and start writing code using blocks.
                      </p>

                      <NavLink to="/user/viewchapters" className="btn btn-primary my-3">
                        Learn More
                      </NavLink>
                    </div>
                  </div>
                </div>
                {/* Second column */}
                {/* Third column */}
                <div className="col-lg-4 col-md-12 mb-lg-0 hover-zoom">
                  <div className="card">
                    <div
                      class="mt-n3 bg-image hover-overlay ripple mx-3 shadow-4-strong rounded-6"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        src="/images/course-python.jpg"
                        className="img-fluid"
                      />
                      <NavLink to="/user/viewchapters">
                        <div
                          className="mask"
                          style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                        />
                      </NavLink>
                    </div>
                    <div className="card-body">
                      <h4 className="card-tittle my-3" style={{ backgroundColor: "#f1f1f1", fontSize: "32px", letterSpacing: "1px" }}>
                        <strong>Python</strong>
                      </h4>
                      <h5 className="mb-3">
                        <strong>26 Classes</strong>
                      </h5>
                      <h6 className="mb-3">
                        Duration : <strong>2 Weeks</strong>
                      </h6>
                      {/* Divider here */}
                      <hr class="hr hr-blurry" />

                      <p className="card-text">
                        An ideal course to help kids quickly grasp the basics of python programming and start writing code using blocks.
                      </p>

                      <NavLink to="/user/viewchapters" className="btn btn-primary my-3">
                        Learn More
                      </NavLink>
                    </div>
                  </div>
                </div>
                {/* Third column */}
              </div>
            </section>
          </section>
          {/**/}
        </div>
      </div>
      {/* Our Course*/}

      {/* Start your coding journey*/}
      <>
        <div className='mb-10'>
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
                <section className="overflow-hidden">
                  {" "}
                  {/* Background image */}
                  <div
                    className="px-4 py-5 px-md-5 text-center bg-image"
                    style={{
                      backgroundImage: 'url("/images/background-img1.jpg")',
                      height: 450,
                      backgroundSize: "cover",
                      backgroundPosition: "50% 50%",
                      backgroundAttachment: "fixed",
                      position: "relative"
                    }}
                    aria-controls="#picker-editor"
                  >
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(35, 37, 45, 0.6)" }}
                    >
                      <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                          <div className="col-lg-10">
                            <div className="content pb-5">
                              <h1 className="mt-5 mb-6 display-3">
                                {" "}
                                <span>Start your coding journey today and make your dreams a reality!</span> <br />{" "}
                                {/* <span className="">and</span> <br />{" "}
                                <span className="">make your dreams a reality!&nbsp;</span>{" "} */}
                              </h1>{" "}
                              <NavLink
                                className="btn btn-primary py-3 px-5 mb-5 mb-md-3 me-md-2"
                                to="/main/signup"
                                role="button"
                                aria-controls="#picker-editor"
                              >
                                Get Started
                              </NavLink>{" "}
                              <NavLink
                                className="btn btn-primary py-3 px-5 mb-5 mb-md-3 me-md-2"
                                to="/main/about"
                                role="button"
                                aria-controls="#picker-editor"
                              >
                                Learn more
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className=""
                    style={{
                      height: 30,
                      marginTop: "-30px",
                      transform: "scale(2)",
                      transformOrigin: "top center",
                      color: "#fff"
                    }}
                  >
                  </div>{" "}
                  {/* Background image */}
                </section>
              </section>
              {/**/}
            </div>
          </div>
        </div>
      </>
      {/* Start your coding journey*/}

      {/* Why Coding Is Important */}
      <div className='mb-10'>
        <div data-draggable="true">
          {/**/}
          {/**/}
          <section
            draggable="false"
            className="container"
            data-v-271253ee=""
          >
            <section>
              <div className='heading'>
                <h2 className="mb-3 text-center display-3">
                  <span>Why Kids Should Learn to Code</span>
                </h2>
              </div>
              <div className='sub-heading'>
                <h4 className="mb-8 text-center">
                  <span>Coding : the language of the future</span>
                </h4>
              </div>

              {/* row - 1 */}
              <div className="row gx-lg-5 mb-5 align-items-center">
                <div className="col-md-6 mb-4 mb-md-0">
                  {" "}
                  <img
                    src="/images/img4.jpg"
                    className="w-100 shadow-4-strong rounded-7 mb-4"
                    alt=""
                    aria-controls="#picker-editor"
                  />{" "}
                </div>
                <div className="content text-center col-md-6 mb-4 mb-md-0">
                  <h4 className="fw-bold mb-3">
                    <strong>Prepares Them for the Future</strong>
                  </h4>
                  <p className="align-items-justify mb-4">
                    In today's digital age, coding is becoming an essential skill
                    for many jobs. By learning to code at a young age, kids are
                    better prepared for the future and have a competitive edge in
                    the job market.
                  </p>
                </div>
              </div>
              {/* row - 1 */}

              {/* row - 2 */}
              <div className="row gx-lg-5 mb-5 flex-lg-row-reverse align-items-center">
                <div className="col-md-6 mb-4 mb-md-0">
                  {" "}
                  <img
                    src="/images/img7.jpg"
                    className="w-100 shadow-4-strong rounded-7 mb-4"
                    alt=""
                    aria-controls="#picker-editor"
                  />{" "}
                </div>
                <div className="content text-center col-md-6 mb-4 mb-md-0">
                  <h4 className="fw-bold mb-3">
                    <strong>Enhances Logical Thinking</strong>
                  </h4>
                  <p className="align-items-justify mb-4">
                    Coding helps kids to develop logical thinking skills. They learn
                    to organize their thoughts and break down complex problems into
                    simpler components. This skill is useful not only in coding but
                    also in other areas of life.
                  </p>{" "}
                </div>
              </div>
              {/* row - 2 */}

              {/* row - 3 */}
              <div className="row gx-lg-5 mb-5 align-items-center">
                <div className="col-md-6 mb-4 mb-md-0">
                  {" "}
                  <img
                    src="/images/img3.jpg"
                    className="w-100 shadow-4-strong rounded-7 mb-4"
                    alt=""
                    aria-controls="#picker-editor"
                  />{" "}
                </div>
                <div className="content text-center col-md-6 mb-4 mb-md-0">
                  <h4 className="fw-bold mb-3">
                    <strong>Develops Problem-Solving Skills</strong>
                  </h4>
                  <p className="align-items-justify mb-4">
                    Learning to code helps kids to develop problem-solving skills,
                    as they have to break down a problem into smaller components
                    and then find a way to solve them using code. This skill is
                    useful in various aspects of life.
                  </p>{" "}
                </div>
              </div>
              {/* row - 3 */}
            </section>
          </section>
          {/**/}
        </div>
      </div>
      {/* Why Coding Is Important */}

      <>
        <div className='mb-10'>
          <div className="" data-draggable="true"
            style={{
              backgroundImage: 'url("/images/background-img2.jpeg")',
              backgroundAttachment: "fixed",
              position: "relative",
              height: 750,
              backgroundSize: "cover",
              backgroundPosition: "50% 50%"
            }}
            aria-controls="#picker-editor"
          >
            <div
              className="mask"
              style={{ backgroundColor: "rgba(35, 37, 45, 0.6)" }}
            >
              {/**/}
              {/**/}
              <section draggable="false" className="container pt-5" data-v-271253ee="" >

                {/* Section: Testimonials */}
                <section>
                  <div className='main-heading'>
                    <h2 className="mb-3 text-center display-3">
                      <span>Testimonials</span>
                    </h2>
                  </div>
                  <div className='sub-heading'>
                    <h4 className="mb-8 text-center">
                      <span>What Client Says</span>
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="row text-center gx-lg-5">
                      {/* First column */}
                      <div className="col-lg-4 mb-5 mb-lg-0 hover-zoom">
                        <div>
                          <div
                            className="rounded-7 p-4 shadow-3"
                            style={{ backgroundColor: "hsl(218, 62.2%, 95%)" }}
                          >
                            <h6 className="text-muted fw-bold mt-4 mb-2">Parent</h6>
                            <div className="name">
                              <p className="h5 fw-bold mb-1">Gauri Parulkar</p>
                            </div>
                            <ul className="list-unstyled d-flex justify-content-center text-warning mb-2">
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="far fa-star fa-sm" />
                              </li>
                            </ul>

                            {/* Divider here */}
                            <hr class="hr hr-blurry"></hr>

                            <i className="fa-solid fa-quote-left fa-sm" style={{ color: '#29c1fe' }}></i>
                            <p className="pb-4 mb-4">
                              I'm so glad we found this website for our child. It's been amazing
                              to watch their coding skills grow and develop, and they have so much
                              fun with the interactive challenges. <br /> Highly recommend!
                            </p>
                          </div>
                          <img
                            src="/images/review1.jpg"
                            className="w-100 rounded-circle mt-n5 shadow-5-strong"
                            style={{ maxWidth: 100 }}
                            alt="Avatar"
                          />
                        </div>
                      </div>
                      {/* First column */}
                      {/* Second column */}
                      <div className="col-lg-4 mb-5 mb-lg-0 hover-zoom">
                        <div>
                          <div
                            className="rounded-7 p-4 shadow-3"
                            style={{ backgroundColor: "hsl(218, 62.2%, 95%)" }}
                          >
                            <h6 className="text-muted fw-bold mt-4 mb-2">Student</h6>
                            <div className="name">
                              <p className="h5 mb-1 fw-bold">Akash Vukoti</p>
                            </div>
                            <ul className="list-unstyled d-flex justify-content-center text-warning mb-2">
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="far fa-star fa-sm" />
                              </li>
                            </ul>

                            {/* Divider here */}
                            <hr class="hr hr-blurry"></hr>

                            <i className="fa-solid fa-quote-left fa-sm" style={{ color: '#29c1fe' }}></i>
                            <p className="pb-4 mb-4">
                              I was intimidated by coding at first, but this website made it so
                              much easier and fun! The interactive challenges and games helped
                              me to understand coding concepts better, and I feel more confident
                              in my abilities now.
                            </p>
                          </div>
                          <img
                            src="/images/review2.jpg"
                            className="w-100 rounded-circle mt-n5 shadow-5-strong"
                            style={{ maxWidth: 100 }}
                            alt="Avatar"
                          />
                        </div>
                      </div>
                      {/* Second column */}
                      {/* Third column */}
                      <div className="col-lg-4 mb-5 mb-lg-0 hover-zoom">
                        <div>
                          <div
                            className="rounded-7 p-4 shadow-3"
                            style={{ backgroundColor: "hsl(218, 62.2%, 95%)" }}
                          >
                            <h6 className="text-muted fw-bold mt-4 mb-2">Parent</h6>
                            <div className="name">
                              <p className="h5 mb-1 fw-bold">Abhijeet Gawande</p>
                            </div>
                            <ul className="list-unstyled d-flex justify-content-center text-warning mb-2">
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm" />
                              </li>
                              <li>
                                <i className="far fa-star fa-sm" />
                              </li>
                            </ul>

                            {/* Divider here */}
                            <hr class="hr hr-blurry"></hr>

                            <i className="fa-solid fa-quote-left fa-sm" style={{ color: '#29c1fe' }}></i>
                            <p className="pb-4 mb-4">
                              As a parent, I love seeing my child engaged and excited about
                              learning, and this website has done just that. They love the
                              game-based approach to coding and I'm amazed at how much they've
                              learned in such a short time.
                            </p>
                          </div>
                          <img
                            src="/images/review3.jpg"
                            className="w-100 rounded-circle mt-n5 shadow-5-strong"
                            style={{ maxWidth: 100 }}
                            alt="Avatar"
                          />
                        </div>
                      </div>

                      {/* Third column */}
                    </div>
                  </div>
                </section>
              </section>
              {/**/}
            </div>
          </div>
        </div>
      </>
      {/* Testimonials */}


      {/* FAQ */}
      <>
        <div className="container mb-8">
          {/*Section: Content*/}
          <section>
            <div className='heading'>
              <h2 className="mb-3 text-center display-3">
                <span>FAQ</span>
              </h2>
            </div>
            <div className='sub-heading'>
              <h4 className="mb-8 text-center">
                <span>Frequently Asked Questions</span>
              </h4>
            </div>
            <div className="accordion" id="basicAccordion">
              <div className="accordion-item rounded-7 shadow-4-strong">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button rounded-7 collapsed"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#basicAccordionCollapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    Why should kids learn to code?
                  </button>
                </h2>
                <div
                  id="basicAccordionCollapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-mdb-parent="#basicAccordion"
                  style={{}}
                >
                  <div className="accordion-body">
                    Kids should learn to code because it helps develop problem-solving skills,
                    enhances creativity, boosts logical thinking, and prepares them for a
                    tech-driven future. Additionally, coding teaches persistence, collaboration,
                    and attention to detail, and opens up career opportunities in a wide range of
                    fields.
                  </div>
                </div>
              </div>
              <div className="accordion-item rounded-7 shadow-4-strong">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button rounded-7 collapsed"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#basicAccordionCollapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    My child is a beginner, is previous coding experience required?
                  </button>
                </h2>
                <div
                  id="basicAccordionCollapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-mdb-parent="#basicAccordion"
                  style={{}}
                >
                  <div className="accordion-body">
                    No, previous coding experience is not required for our courses. We welcome
                    children of all skill levels, including beginners. Our courses are designed
                    to start with the basics and gradually increase in difficulty to ensure that
                    every child can learn and progress at their own pace.
                  </div>
                </div>
              </div>
              <div className="accordion-item rounded-7 shadow-4-strong">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button rounded-7 collapsed"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#basicAccordionCollapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    What is the recommended age for my child to start coding?
                  </button>
                </h2>
                <div
                  id="basicAccordionCollapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-mdb-parent="#basicAccordion"
                  style={{}}
                >
                  <div className="accordion-body">
                    The recommended age for a child to start coding varies, but generally,
                    children as young as 5 or 6 can start with basic block-based programming.
                    As they progress, they can move on to more advanced languages and projects.
                    However, it's never too late to start learning how to code, and people of all
                    ages can benefit from the skills and knowledge it provides.
                  </div>
                </div>
              </div>
              <div className="accordion-item rounded-7 shadow-4-strong">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button rounded-7 collapsed"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#basicAccordionCollapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    What courses does Digi Coders offer?
                  </button>
                </h2>
                <div
                  id="basicAccordionCollapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-mdb-parent="#basicAccordion"
                  style={{}}
                >
                  <div className="accordion-body">
                    Digi Coders offers block-based coding courses for kids. Some of the courses
                    they offer include Python programming, Web Development, App Development,
                    Game Development, A.I. and IOT. These courses are designed to make coding fun
                    and interactive for kids while teaching them important coding concepts and skills.
                  </div>
                </div>
              </div>
              <div className="accordion-item rounded-7 shadow-4-strong">
                <h2 className="accordion-header" id="headingFive">
                  <button
                    className="accordion-button rounded-7 collapsed"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#basicAccordionCollapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    Is the coding course schedule flexible?
                  </button>
                </h2>
                <div
                  id="basicAccordionCollapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-mdb-parent="#basicAccordion"
                  style={{}}
                >
                  <div className="accordion-body">
                    Yes! You can work the classes around your child’s schedule by selecting any time
                    and any day that works for you.
                  </div>
                </div>
              </div>
              <div className="accordion-item rounded-7 shadow-4-strong">
                <h2 className="accordion-header" id="headingSix">
                  <button
                    className="accordion-button rounded-7 collapsed"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#basicAccordionCollapseSix"
                    aria-expanded="false"
                    aria-controls="collapseSix"
                  >
                    What kind of device does my child need to start learning to code?
                  </button>
                </h2>
                <div
                  id="basicAccordionCollapseSix"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingSix"
                  data-mdb-parent="#basicAccordion"
                  style={{}}
                >
                  <div className="accordion-body">
                    All that is needed to learn coding with Digi Coders is a laptop/computer with a
                    webcam and a stable internet connection.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
      {/* FAQ */}

    </div >

  )
}

export default Home