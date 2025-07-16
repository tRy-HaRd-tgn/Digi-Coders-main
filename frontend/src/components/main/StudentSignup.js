import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import app_config from "../../config";
import jwt_decode from "jwt-decode";
import { useUserContext } from "../../context/UserContext";
import {
  initializeGoogleSignIn,
  renderGoogleButton,
  promptGoogleSignIn,
} from "../../utils/googleAuth";

const StudentSignup = () => {
  const navigate = useNavigate();

  const [selImage, setSelImage] = useState(null);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState("");

  const { loggedIn, setLoggedIn } = useUserContext();

  const StudentsignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Please Enter your password"),
    mobile_no: Yup.string().required("Required"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    // ),
  });

  const studentsignupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      avatar: "",
      mobile_no: "",
      createdAt: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        values.avatar = selImage ? selImage.name : "";
        values.createdAt = new Date();

        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

        const res = await fetch(`${apiUrl}/user/add`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Congratulations",
            text: "Your account has been successfully created",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/main/studentlogin");
        } else {
          const errorData = await res.json();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorData.message || "Something went wrong!",
          });
        }
      } catch (error) {
        console.error("Registration error:", error);
        Swal.fire({
          icon: "error",
          title: "Ошибка",
          text: "Произошла ошибка при регистрации. Попробуйте еще раз.",
        });
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema: StudentsignupSchema,
  });

  const uploadFile = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    setSelImage(file);
    fd.append("myfile", file);
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
    fetch(`${apiUrl}/util/uploadfile`, {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
      }
    });
  };

  const handleSignOut = (event) => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  };

  const saveGoogleUser = async (googleObj) => {
    setAvatar(googleObj.picture);
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const response = await fetch(`${apiUrl}/user/add`, {
      method: "POST",
      body: JSON.stringify({
        username: googleObj.name,
        email: googleObj.email,
        avatar: googleObj.picture,
        createdAt: new Date(),
        type: "google",
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      const data = await response.json();
      sessionStorage.setItem("user", JSON.stringify(data));
      setLoggedIn(true);
      navigate("/");
    }
  };

  const handleCallbackResponse = async (response) => {
    try {
      if (!response || !response.credential) {
        throw new Error("Invalid response from Google Sign-In");
      }

      var userObject = jwt_decode(response.credential);

      setUser(userObject);

      const signInDiv = document.getElementById("signInDiv");
      if (signInDiv) {
        signInDiv.hidden = true;
      }
      sessionStorage.setItem("user", JSON.stringify(userObject));

      navigate("/main/course");
    } catch (error) {
      console.error("Error handling Google Sign-In response:", error);
      Swal.fire({
        icon: "error",
        title: "Ошибка входа",
        text: "Не удалось войти через Google. Попробуйте другой способ.",
      });
    }
  };

  useEffect(() => {
    const clientId =
      "941149713723-22urp8pss6cdudmhnf9007ak61t6t68j.apps.googleusercontent.com";

    // Инициализируем Google Sign-In
    if (initializeGoogleSignIn(clientId, handleCallbackResponse)) {
      // Рендерим кнопку
      if (renderGoogleButton("signInDiv")) {
        
      } else {
      
       
      }
    } else {
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0.5, x: -300 }}
      transition={{ type: "spring" }}
      className="vid-manage-bg"
      // style={{
      //     backgroundImage: `url('/images/bg-animation-img2.jpg`
      // }}
    >
      {/*Student Signup Form*/}
      <section className="form">
        <div className="">
          <div className="row g-0">
            <div className="col-lg-6 curve">
              <div className="pt-5" style={{ marginLeft: "285px" }}>
                <h2 className="my-1">One of us ?</h2>
              </div>

              <div className="py-2" style={{ marginLeft: "100px" }}>
                <div className="d-flex flex-row align-items-center">
                  <div className="flex-fill text-center mb-2 mx-5">
                    <p>
                      Access your account by signing in and continue where you
                      left off.
                    </p>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <div className="flex-fill text-center mb-2">
                    <NavLink
                      to="/main/studentlogin"
                      className="btn btn-primary"
                    >
                      Sign In
                    </NavLink>
                  </div>
                </div>
                <img
                  src="/images/register.svg"
                  className="image"
                  alt=""
                  style={{
                    height: 400,
                    marginTop: "10%",
                    marginLeft: "12%",
                  }}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-5">
                <div className="text-center mb-5">
                  <h3 className="my-2">Student Signup</h3>
                </div>
                <form
                  className="mx-md-5 text-black"
                  onSubmit={studentsignupForm.handleSubmit}
                >
                  <div className="form-group has-icon mb-4">
                    <i className="fas fa-user fa-lg form-control-icon" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control form-control-lg"
                      placeholder="Name"
                      value={studentsignupForm.values.name}
                      onChange={studentsignupForm.handleChange}
                    />
                    <span className="text-danger">
                      {studentsignupForm.errors.name}
                    </span>
                  </div>

                  <div className="form-group has-icon mb-4">
                    <i className="fas fa-envelope fa-lg form-control-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="off"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      value={studentsignupForm.values.email}
                      onChange={studentsignupForm.handleChange}
                    />
                    <span className="text-danger">
                      {studentsignupForm.errors.email}
                    </span>
                  </div>

                  <div className="form-group has-icon mb-4">
                    <i className="fas fa-key fa-lg form-control-icon" />
                    <div className="d-grid d-md-flex justify-content-md-end">
                      <span className="form-control-eye" onClick={handleShow}>
                        {show ? (
                          <i
                            className="far fa-eye"
                            style={{ color: "#c5c5c5" }}
                          />
                        ) : (
                          <i
                            className="far fa-eye-slash"
                            style={{ color: "#c5c5c5" }}
                          />
                        )}
                      </span>
                    </div>
                    <input
                      type={show ? "text" : "password"}
                      id="password"
                      name="password"
                      autoComplete="off"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={studentsignupForm.values.password}
                      onChange={studentsignupForm.handleChange}
                    />
                    <span className="text-danger">
                      {studentsignupForm.errors.password}
                    </span>
                  </div>
                  <div className="form-group has-icon mb-4">
                    <i className="fas fa-mobile-screen-button fa-lg form-control-icon" />
                    <input
                      type="text"
                      id="mobile_no"
                      name="mobile_no"
                      className="form-control form-control-lg"
                      placeholder="Mobile Number"
                      value={studentsignupForm.values.mobile_no}
                      onChange={studentsignupForm.handleChange}
                    />
                    <span className="text-danger">
                      {studentsignupForm.errors.mobile_no}
                    </span>
                  </div>

                  <div className="d-flex flex-row align-items-center mx-1 mb-4">
                    <label htmlFor="avatar-img" className="btn btn-primary">
                      {" "}
                      <i className="fas fa-upload"></i> Upload Image
                    </label>
                    <span className="text-warning mx-3">
                      {selImage ? selImage.name : "No Image Selected"}
                    </span>
                    <input
                      type="file"
                      id="avatar-img"
                      hidden
                      onChange={uploadFile}
                    />
                  </div>

                  <div className="pt-1 pb-1">
                    <button
                      className="btn btn-primary btn-block mb-5"
                      type="submit"
                      disabled={studentsignupForm.isSubmitting}
                      style={{ borderRadius: "10px", marginLeft: "0px" }}
                    >
                      {studentsignupForm.isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Регистрация...
                        </>
                      ) : (
                        <>
                          Signup &nbsp;
                          <i className="fas fa-arrow-right-to-bracket" />
                        </>
                      )}
                    </button>

                    <div>{/* Социальные кнопки регистрации удалены */}</div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default StudentSignup;
