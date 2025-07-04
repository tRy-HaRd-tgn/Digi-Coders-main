import { useFormik } from 'formik';
import React from 'react';
import Swal from 'sweetalert2';
import app_config from '../../config';

const Contact = () => {

    const contactForm = useFormik({
        initialValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
        onSubmit: async (values, { setSubmitting }) => {
            console.log(values);


            const res = await fetch(`${process.env.REACT_APP_API_URL}/contact/add`, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(res.status);
            setSubmitting(false);
            if (res.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Thank You!",
                    text: "Your message is successfully submitted",
                    showConfirmButton: false,
                    timer: 1500
                });
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
        <>
            {/*Page Header*/}
            <header>
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
                                <h1 className="fw-bold mb-3">Contact Us</h1>
                                <p className='paragraph'>
                                    "We'd love to hear from you! Drop us a line and let's start
                                    a conversation about how we can help you and your child learn
                                    to code."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Background image */}
            </header>
            {/*Page Header*/}

            {/*Contact Us*/}
            <section className="h-100 form my-5">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-7 shadow-4-strong">
                                <div className="row g-0">
                                    <div className="col-lg-6"
                                        style={{
                                            backgroundImage: 'url("/images/background-img6.jpg")',
                                            height: 668,
                                            backgroundSize: "cover",
                                            backgroundPosition: "90% 50%",
                                            position: "relative"
                                        }}>
                                        <div
                                            className="mask"
                                            style={{ backgroundColor: "rgba(92, 97, 115, 0.6)" }}
                                        >
                                            <div className="form px-3 py-4 p-md-5 mx-md-4">
                                                <h2 className="my-5 text-center">Get In Touch</h2>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="form-icon fas fa-map-marker-alt me-3 mb-4 fa-2x" />
                                                    <div className="flex-fill">
                                                        <p>
                                                            Hazaratganj, Lucknow, Uttar Pradesh, India.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="form-icon fas fa-phone me-3 mb-4 fa-2x" />
                                                    <div className="flex-fill">
                                                        <p>
                                                            +91 9260964544
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-8">
                                                    <i className="form-icon fas fa-envelope me-3 mb-4 fa-2x" />
                                                    <div className="flex-fill">
                                                        <p>
                                                            digicoders12@gmail.com
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Divider here */}
                                                <hr className="hr mb-4"></hr>
                                                <div className='text-center'>
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
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="card-body p-md-5 mx-md-4">
                                            <div className="text-center mb-5">
                                                <h3 className="my-5">
                                                    <i className="fas fa-envelope pr-2 mr-1" />&nbsp;
                                                    Write to us
                                                </h3>
                                            </div>
                                            <form className="mx-1 mx-md-4 text-black" onSubmit={contactForm.handleSubmit}>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw" />
                                                    <div className="flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            name='name'
                                                            className="form-control"
                                                            placeholder="Enter Full Name"
                                                            value={contactForm.values.name}
                                                            onChange={contactForm.handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                                    <div className="flex-fill mb-0">
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            name='email'
                                                            className="form-control"
                                                            placeholder="Enter Email Address"
                                                            value={contactForm.values.email}
                                                            onChange={contactForm.handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-tag fa-lg me-3 fa-fw"></i>
                                                    <div className="flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            id="subject"
                                                            name='subject'
                                                            className="form-control"
                                                            placeholder="Enter Subject"
                                                            value={contactForm.values.subject}
                                                            onChange={contactForm.handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                {/* Text area fields */}
                                                <div className="d-flex flex-row align-items-center mb-5">
                                                    <i class="fas fa-pencil-alt fa-lg me-3 mb-8 fa-fw"></i>
                                                    <div className="flex-fill mb-0">
                                                        <textarea class="form-control" id="textarea" rows="4"
                                                            placeholder='Enter message....'
                                                            name='message'
                                                            value={contactForm.values.message}
                                                            onChange={contactForm.handleChange}
                                                        ></textarea>
                                                    </div>
                                                </div>
                                                <div className="pt-1 mx-4 mb-3 pb-1 ">
                                                    <button
                                                        className="btn btn-primary btn-block mb-3"
                                                        type="submit"
                                                        style={{ borderRadius: "10px" }}
                                                    >
                                                        Send &nbsp;
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
            {/*Contact Us*/}
        </>
    )
}

export default Contact
