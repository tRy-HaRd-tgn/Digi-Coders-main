import { useFormik } from "formik";
import React from "react";
import Swal from "sweetalert2";
import "./Contact.css";

const Contact = () => {
  const contactForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

      const res = await fetch(`${apiUrl}/contact/add`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSubmitting(false);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Спасибо!",
          text: "Ваше сообщение успешно отправлено",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Упс...",
          text: "Что-то пошло не так!",
        });
      }
    },
  });
  return (
    <>
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
          <h1 className="about-title">СВЯЖИТЕСЬ С НАМИ</h1>
          <p className="about-description">
            "Мы будем рады услышать вас! Напишите нам, и давайте обсудим, как мы
            можем помочь вам и вашему ребенку изучать программирование."
          </p>
        </div>
      </div>

      <section className="h-100 form my-5">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-7 shadow-4-strong">
                <div className="row g-0">
                  <div
                    className="col-lg-6"
                    style={{
                      backgroundImage: 'url("/images/background-img6.jpg")',
                      height: 668,
                      backgroundSize: "cover",
                      backgroundPosition: "90% 50%",
                      position: "relative",
                    }}
                  >
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(92, 97, 115, 0.6)" }}
                    >
                      <div className="form px-3 py-4 p-md-5 mx-md-4">
                        <h2 className="my-5 text-center">Связаться с нами</h2>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="form-icon fas fa-map-marker-alt me-3 mb-4 fa-2x" />
                          <div className="flex-fill">
                            <p>Хазратгандж, Лакхнау, Уттар-Прадеш, Индия.</p>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="form-icon fas fa-phone me-3 mb-4 fa-2x" />
                          <div className="flex-fill">
                            <p>9260964544</p>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-8">
                          <i className="form-icon fas fa-envelope me-3 mb-4 fa-2x" />
                          <div className="flex-fill">
                            <p>digicoders12@gmail.com</p>
                          </div>
                        </div>

                        <hr className="hr mb-4"></hr>
                        <div className="text-center">
                          <button
                            type="button"
                            className="btn btn-floating text-white mx-1"
                          >
                            <a href="#" className="me-4 text-reset">
                              <i className="fab fa-facebook-f" />
                            </a>
                          </button>
                          <button
                            type="button"
                            className="btn btn-floating text-white mx-1"
                          >
                            <a href="#" className="me-4 text-reset">
                              <i className="fab fa-twitter" />
                            </a>
                          </button>
                          <button
                            type="button"
                            className="btn btn-floating text-white mx-1"
                          >
                            <a href="#" className="me-4 text-reset">
                              <i className="fab fa-google" />
                            </a>
                          </button>
                          <button
                            type="button"
                            className="btn btn-floating text-white mx-1"
                          >
                            <a href="#" className="me-4 text-reset">
                              <i className="fab fa-instagram" />
                            </a>
                          </button>
                          <button
                            type="button"
                            className="btn btn-floating text-white mx-1"
                          >
                            <a href="#" className="me-4 text-reset">
                              <i className="fab fa-linkedin" />
                            </a>
                          </button>
                          <button
                            type="button"
                            className="btn btn-floating text-white mx-1"
                          >
                            <a href="#" className="me-4 text-reset">
                              <i className="fab fa-github" />
                            </a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center mb-5">
                        <h3 className="my-4">
                          <i className="fas fa-envelope pr-2 mr-1" />
                          &nbsp; Напишите нам
                        </h3>
                      </div>
                      <form
                        className="mx-1 mx-md-4 text-black"
                        onSubmit={contactForm.handleSubmit}
                      >
                        <div className="form-group has-icon mb-4">
                          <i className="fas fa-user fa-lg form-control-iconB" />
                          <div className="flex-fill mb-0">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className="form-control form-control-lg"
                              placeholder="Введите полное имя"
                              value={contactForm.values.name}
                              onChange={contactForm.handleChange}
                            />
                          </div>
                        </div>
                        <div className="form-group has-icon mb-4">
                          <i className="fas fa-envelope fa-lg form-control-iconB" />
                          <div className="flex-fill mb-0">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className="form-control form-control-lg"
                              placeholder="Введите адрес электронной почты"
                              value={contactForm.values.email}
                              onChange={contactForm.handleChange}
                            />
                          </div>
                        </div>
                        <div className="form-group has-icon mb-4">
                          <i className="fas fa-tag fa-lg form-control-iconB" />
                          <div className="flex-fill mb-0">
                            <input
                              type="text"
                              id="subject"
                              name="subject"
                              className="form-control form-control-lg"
                              placeholder="Введите тему"
                              value={contactForm.values.subject}
                              onChange={contactForm.handleChange}
                            />
                          </div>
                        </div>

                        <div className="form-group has-icon mb-4">
                          <i className="fas fa-pencil-alt fa-lg form-control-icon" />
                          <div className="flex-fill mb-0">
                            <textarea
                              className="form-control form-control-lg"
                              id="textarea"
                              rows="4"
                              placeholder="Введите сообщение..."
                              name="message"
                              value={contactForm.values.message}
                              onChange={contactForm.handleChange}
                            ></textarea>
                          </div>
                        </div>
                        <div className="pt-1 pb-1">
                          <button
                            className="btn btn-primary btn-block"
                            type="submit"
                            style={{ borderRadius: "10px", marginLeft: "0px" }}
                          >
                            Отправить &nbsp;
                            <i className="far fa-paper-plane ml-2" />
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
