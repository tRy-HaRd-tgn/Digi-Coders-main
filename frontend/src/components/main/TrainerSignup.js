import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { motion } from "framer-motion";
import { NavLink, useNavigate } from 'react-router-dom';
import app_config from '../../config';

const TrainerSignup = () => {

  const navigate = useNavigate();

  const [selImage, setSelImage] = useState(null);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const trainersignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Name is Required'),
    skills: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Skills is Required'),
    certifications: Yup.string()
      .min(5, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Certificate is Required'),
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup
      .string()
      .required('Please Enter your password'),
  });

  const trainersignupForm = useFormik({
    initialValues: {
      name: '',
      skills: '',
      certifications: '',
      email: '',
      mobile_no: '',
      password: '',
      avatar: '',
      createdAt: '',
    },

    // onSubmit: async (values, { setSubmitting }) => {
    //   values.icon = selImage.name;
    //   console.log(values);

    onSubmit: async (values, { setSubmitting }) => {
      values.avatar = selImage.name;
      console.log(values);


      const res = await fetch(`${process.env.REACT_APP_API_URL}/trainer/add`, {
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
          title: "Congratulations",
          text: "Your account has been successfully created",
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/main/trainerlogin');
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    },
    validationSchema: trainersignupSchema,


  });

  const uploadFile = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    setSelImage(file);
    fd.append('myfile', file);
    fetch(`${process.env.REACT_APP_API_URL}/util/uploadfile`, {
      method: 'POST',
      body: fd
    }).then((res) => {
      if (res.status === 200) {
        console.log('file uploaded');
      }
    });
  };



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
      {/*Trainer Signup Form*/}
      <section className="form"
      >
        <div className="">
          <div className="row g-0">
            <div className="col-lg-6 curve">
              <div className="pt-5" style={{ marginLeft: "285px", }}>
                <h2 className="my-1">One of us ?</h2>
              </div>

              <div className="py-2" style={{ marginLeft: "100px" }}>
                <div className="d-flex flex-row align-items-center">
                  <div className="flex-fill text-center mb-2 mx-5">
                    <p>
                      Access your account by signing in and continue where you left off.
                    </p>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <div className="flex-fill text-center mb-2">
                    <NavLink to="/main/trainerlogin" className="btn btn-primary">
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
                  <h3 className="my-2">
                    Trainer Signup
                  </h3>
                </div>
                <form
                  className="mx-md-5 text-black"
                  onSubmit={trainersignupForm.handleSubmit}
                >
                  <div className="form-group has-icon mb-4">
                    <i className="fas fa-user fa-lg form-control-icon" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control form-control-lg"
                      placeholder="Name"
                      value={trainersignupForm.values.name}
                      onChange={trainersignupForm.handleChange}
                    />
                    <span className='text-danger'>{trainersignupForm.errors.name}</span>
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
                      value={trainersignupForm.values.email}
                      onChange={trainersignupForm.handleChange}
                    />
                    <span className='text-danger' >{trainersignupForm.errors.email}</span>
                  </div>

                  <div className="form-group has-icon mb-4">
                    <i className="fas fa-key fa-lg form-control-icon" />
                    <div class="d-grid d-md-flex justify-content-md-end">
                      <span
                        className='form-control-eye'
                        onClick={handleShow}
                      >
                        {show ? <i class="far fa-eye" style={{ color: "#c5c5c5" }} /> : <i class="far fa-eye-slash" style={{ color: "#c5c5c5" }} />}
                      </span>
                    </div>
                    <input
                      type={show ? "text" : "password"}
                      id="password"
                      name="password"
                      autoComplete="off"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={trainersignupForm.values.password}
                      onChange={trainersignupForm.handleChange}
                    />
                    <span className='text-danger'>{trainersignupForm.errors.password}</span>
                  </div>
                  <div className="form-group has-icon mb-4">
                    <i className="fas fa-mobile-screen-button fa-lg form-control-icon" />
                    <input
                      type="text"
                      id="mobile_no"
                      name="mobile_no"
                      className="form-control form-control-lg"
                      placeholder="Mobile Number"
                      value={trainersignupForm.values.mobile_no}
                      onChange={trainersignupForm.handleChange}

                    />
                    {/* <span className='text-danger'>{studentsignupForm.errors.name}</span> */}
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-group has-icon me-2">
                      <i className="fas fa-gear fa-lg form-control-icon" />
                      <input
                        type="text"
                        id="skills"
                        autoComplete='off'
                        className="form-control form-control-lg"
                        Placeholder='Skills'
                        value={trainersignupForm.values.skills}
                        onChange={trainersignupForm.handleChange}
                      />
                      <span className='text-danger'>{trainersignupForm.errors.skills}</span>
                    </div>
                    <div className="form-group has-icon ms-2">
                      <i className="fas fa-award fa-lg form-control-icon" />
                      <input
                        type="text"
                        id="certifications"
                        autoComplete='off'
                        className="form-control form-control-lg"
                        placeholder='Certificate'
                        value={trainersignupForm.values.certifications}
                        onChange={trainersignupForm.handleChange}
                      />
                      <span className='text-danger'>{trainersignupForm.errors.certifications}</span>
                    </div>
                  </div>

                  <div className='d-flex flex-row align-items-center mx-1 mb-4'>
                    <label htmlFor="avatar-img" className="btn btn-primary">
                      {' '}
                      <i class="fas fa-upload"></i> Upload Image
                    </label>
                    <span className='text-warning mx-3'>
                      {selImage ? selImage.name : 'No Image Selected'}
                    </span>
                    <input type="file" id="avatar-img" hidden onChange={uploadFile} />
                  </div>

                  <div className="pt-1 pb-1 ">
                    <button
                      className="btn btn-primary btn-block mb-5"
                      type="submit"
                      style={{ borderRadius: "10px", marginLeft: "0px" }}
                    >
                      Signup &nbsp;
                      <i className="fas fa-arrow-right-to-bracket" />
                    </button>

                    <div>
                      <div className="mb-4 text-center">
                        <h6>or sign up with :</h6>
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
      {/*Trainer Signup Form*/}
    </motion.div>
  )
}

export default TrainerSignup