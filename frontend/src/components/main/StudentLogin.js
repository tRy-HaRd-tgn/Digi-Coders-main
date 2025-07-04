import React, { useState } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import app_config from "../../config";
import { useUserContext } from "../../context/UserContext";

const StudentLogin = () => {

  const navigate = useNavigate();
  const { setLoggedIn } = useUserContext();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const studentLogin = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string().required("Required"),
  });

  const StudentLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);

      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/authenticate`, {
        method: "POST",
        body: JSON.stringify(values), // this is used to convert js data in json formate
        headers: {
          "Content-Type": "application/json", // this used to inform the data in send in the form of json
        },
      });

      console.log(res.status);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Well Done!!",
          text: "login successfully",
          showConfirmButton: false,
          timer: 1500
        });

        const data = await res.json();
        sessionStorage.setItem("user", JSON.stringify(data));
        setLoggedIn(true);
        console.log(data);
        navigate('/main/course');

      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    },
    validationSchema: studentLogin,
  });


  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0.5, x: -300 }}
      transition={{ type: "spring" }}
      className="vid-manage-bg"
    // style={{
    //   backgroundImage: `url('/images/bg-animation-img2.jpg`
    // }}
    >
      {/*Student Login Form*/}
      <section className="form">
        <div className="">
          <div className="row g-0">
            <div className="col-lg-6 curve">
              <div className="pt-5" style={{ marginLeft: "285px", }}>
                <h2 className="my-1">New Here?</h2>
              </div>

              <div className="py-2" style={{ marginLeft: "100px" }}>
                <div className="d-flex flex-row align-items-center">
                  <div className="flex-fill text-center mb-2 mx-5">
                    <p>
                      Start your journey with us by signing up and accessing exclusive benefits.
                    </p>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <div className="flex-fill text-center mb-2">
                    <NavLink to="/main/studentsignup" className="btn btn-primary">
                      Sign Up
                    </NavLink>
                  </div>
                </div>
                <img
                  src="/images/login.svg"
                  className="image"
                  alt=""
                  style={{
                    height: 400,
                    marginTop: "10%",
                    marginLeft: "-5%",
                  }}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-5">
                <div className="text-center mb-5">
                  <h3 className="my-5 text-center">
                    Student Login
                  </h3>
                </div>
                <form
                  className="mx-md-5 text-black"
                  onSubmit={StudentLogin.handleSubmit}
                >
                  <div className="form-group has-icon mb-4">
                    <i className="fas fa-envelope fa-lg form-control-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="off"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      value={StudentLogin.values.email}
                      onChange={StudentLogin.handleChange}
                    />
                    <span className="text-danger">
                      {StudentLogin.errors.email}
                    </span>
                  </div>

                  <div className="form-group has-icon mb-4">
                    <i className="fas fa-key fa-lg form-control-icon" />
                    <div class="d-grid d-md-flex justify-content-md-end">
                      <span
                        className='form-control-eye'
                        onClick={handleShow}
                      >
                        {show ? <i className="far fa-eye" style={{color: "#c5c5c5"}} /> : <i class="far fa-eye-slash" style={{color: "#c5c5c5"}} />}
                      </span>
                    </div>
                    <input
                      type={show ? "text" : "password"}
                      id="password"
                      name="password"
                      autoComplete="off"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={StudentLogin.values.password}
                      onChange={StudentLogin.handleChange}
                    />
                    <span className="text-danger">
                      {StudentLogin.errors.password}
                    </span>
                  </div>
                  <div className="mb-4 text-center">
                    <NavLink
                      className="nav-link"
                      to="/main/resetpassword"
                    >
                      Forget password?
                    </NavLink>
                  </div>
                  <div className="pt-1 pb-1 ">
                    <button
                      className="btn btn-primary btn-block mb-5"
                      type="submit"
                      style={{ borderRadius: "10px",  marginLeft: "0px" }}
                    >
                      Login &nbsp;
                      <i className="fas fa-arrow-right-to-bracket" />
                    </button>

                    <div>
                      <div className="mb-4 text-center">
                        <h6>or sign in with :</h6>
                      </div>
                      <div className="text-center">
                        <button
                          type="button"
                          className="btn btn-primary btn-floating mx-1"
                        >
                          <i className="fab fa-facebook-f" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary btn-floating mx-1"
                        >
                          <i className="fab fa-google" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary btn-floating mx-1"
                        >
                          <i className="fab fa-twitter" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary btn-floating mx-1"
                        >
                          <i className="fab fa-github" />
                        </button>
                      </div>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Student Login Form*/}
    </motion.div>
  );
};

export default StudentLogin;
