import { useState } from 'react';
import Swal from 'sweetalert2';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { motion } from "framer-motion";

const ResetPassword = () => {
  const [passVisible, setPassVisible] = useState(false);
  const [email, setEmail] = useState('');

  const [otp, setOTP] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  const generateOTP = () => {
    let tempOtp = parseInt(Math.random().toFixed(4).substr(`-${4}`));
    setOTP(tempOtp);
    return tempOtp;
  };

  const passwordForm = {
    otp: '',
    password: '',
    confirm: ''
  };


  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);


  const sendOTP = () => {
    fetch(`${process.env.REACT_APP_API_URL}/util/sendmail`, {
      method: 'POST',
      body: JSON.stringify({
        to: email,
        subject: 'Password Reset',
        text: 'This is your OTP for password reset ' + generateOTP()
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log(res.status);
      console.log(otp);
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Successful!!',
          text: 'OTP Sent Successfully'
        });
      }
      return res.json();
    });
  };

  const verifyUser = () => {
    fetch(`${process.env.REACT_APP_API_URL}/user/getbyemail` + email)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (!data) {
          console.log('not found!!');
          Swal.fire({
            icon: 'error',
            title: 'Email not registered!!'
          });
        } else {
          setCurrentUser(data);
          setShowReset(true);
          sendOTP();
        }
      });
  };

  const verifyOTP = (formdata) => {
    console.log(formdata.otp, otp);
    if (otp == formdata.otp) {
      console.log('otp matched');
      resetPassword(formdata);
    } else {
      console.log('otp not matched');
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Enter Correct OTP'
      });
    }
  };
  const resetPassword = ({ password }) => {
    console.log(password);
    fetch(`${process.env.REACT_APP_API_URL}/user/update` + currentUser._id, {
      method: 'PUT',
      body: JSON.stringify({ password: password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        console.log('reset');
        if (res.status === 200)
          Swal.fire({
            icon: 'success',
            title: 'Password Reset Successfully!!'
          }).then(() => {
            navigate('/main/login');
          });
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      //   .matches(
      //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      //     'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      //   )
      .required('Password is Required'),
    confirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password Confirmation is Required')
  });

  const showResetForm = () => {
    if (showReset) {
      return (
        <>
          {/* <div className="card" sx={{ width: 451 }} align="center">
            <div className="card-body" align="center">
              <Formik initialValues={passwordForm} onSubmit={verifyOTP} validationSchema={validationSchema}>
                {({ values, handleSubmit, handleChange, errors }) => (
                  <form onSubmit={handleSubmit}>
                    <input
                      className="w-100"
                      placeholder="Enter OTP recieved in Email"
                      label="Enter OTP"
                      variant="outlined"
                      id="otp"
                      value={values.otp}
                      onChange={handleChange}
                    />

                    <input
                      className="w-100 mt-3"
                      placeholder="Enter New Password"
                      type="password"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                    {errors.password && <div className="text-danger">{errors.password}</div>}

                    <button
                      style={{ border: "none", backgroundColor: "transparent" }}
                      onClick={handleShow}>
                      {show ? <i class="far fa-eye" /> : <i class="far fa-eye-slash" />} </button>

                    <input
                      className="w-100 mt-3"
                      placeholder="Confirm Password"
                      id="confirm"
                      type={show ? "text" : "password"}
                      value={values.confirm}
                      onChange={handleChange}
                    />

                    {errors.confirm && <div className="text-danger">{errors.confirm}</div>}

                    <button className="btn btn-primary mt-5" type="submit" fullWidth>
                      Submit
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </div> */}

          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0.5, x: -300 }}
            transition={{ type: "spring" }}
            // className="vid-manage-bg"
          // style={{
          //   backgroundImage: `url('/images/bg-animation-img2.jpg`
          // }}
          >
            <section className="reset-form">
              <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                  <div className="col-lg-12 col-xl-11">
                    <div className="card text-black my-5" style={{ borderRadius: 25 }}>
                      <div className="card-body">
                        {/* Grid row */}
                        <div className="row d-flex justify-content-center align-items-center">
                          {/* Grid column */}
                          <div className="col-md-5 reset-img">
                            <img
                              src="/images/forgot2.png"
                              className="image"
                              alt=""
                              style={{
                                height: 400,
                                marginTop: "5%",
                                marginLeft: "5%",
                              }}
                            />
                          </div>
                          {/* Grid column */}
                          {/* Grid column */}
                          <div className="col-lg-6">
                            <div className="">
                              <div className="mb-4">
                                <h3 className="mx-5">
                                  Reset Password ?
                                </h3>
                              </div>

                              <Formik initialValues={passwordForm} onSubmit={verifyOTP} validationSchema={validationSchema}>
                                {({ values, handleSubmit, handleChange, errors }) => (
                                  <form
                                    className="mx-md-5 text-black"
                                    onSubmit={handleSubmit}
                                  >
                                    <div className="d-flex flex-row align-items-center mb-4">
                                      {/* <i className="fas fa-lock fa-lg me-3 fa-fw" /> */}
                                      <div className="flex-fill mb-0">
                                        <input
                                          type="text"
                                          id="otp"
                                          name="otp"
                                          autoComplete="off"
                                          maxLength="4"
                                          className="form-control form-control-lg"
                                          placeholder="Enter OTP recieved in Email"
                                          value={values.otp}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>

                                    {/* <div id="otp" class="inputs d-flex flex-row justify-content-center mb-4" value={values.otp} onChange={handleChange}>
                                    <input class="m-2 text-center form-control rounded" type="text" id="first" maxlength="1" />
                                    <input class="m-2 text-center form-control rounded" type="text" id="second" maxlength="1" />
                                    <input class="m-2 text-center form-control rounded" type="text" id="third" maxlength="1" />
                                    <input class="m-2 text-center form-control rounded" type="text" id="fourth" maxlength="1" />
                                    
                                  </div> */}

                                    <div className="form-group has-icon mb-4">
                                      <i className="fas fa-key fa-lg form-control-icon" />
                                      <div class="d-grid d-md-flex justify-content-md-end">
                                        <span
                                          className='form-control-eye'
                                          onClick={handleShow}
                                        >
                                          {show ? <i class="far fa-eye" style={{color: "#c5c5c5"}} /> : <i class="far fa-eye-slash" style={{color: "#c5c5c5"}} />}
                                        </span>
                                      </div>
                                      <input
                                        type={show ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        autoComplete="off"
                                        className="form-control form-control-lg"
                                        placeholder="New Password"
                                        value={values.password}
                                        onChange={handleChange}
                                      />
                                      {errors.password && <div className="text-danger">{errors.password}</div>}
                                    </div>

                                    <div className="form-group has-icon mb-4">
                                      <i className="fas fa-key fa-lg form-control-icon" />
                                      <div class="d-grid  d-md-flex justify-content-md-end">
                                        <span
                                          className='form-control-eye'
                                          onClick={handleShowPassword}
                                        >
                                          {showPassword ? <i class="far fa-eye" style={{color: "#c5c5c5"}} /> : <i class="far fa-eye-slash" style={{color: "#c5c5c5"}} />}
                                        </span>
                                      </div>
                                      <input
                                        type={showPassword ? "text" : "password"}
                                        id="confirm"
                                        name="confirm"
                                        autoComplete="off"
                                        className="form-control form-control-lg"
                                        placeholder="Confirm New Password"
                                        value={values.confirm}
                                        onChange={handleChange}
                                      />
                                      {errors.confirm && <div className="text-danger">{errors.confirm}</div>}
                                    </div>

                                    {/* <div className="d-flex flex-row align-items-center mb-4">
                                <div className="input-group input-group-lg flex-fill mb-0">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-lg">
                                      <i className="fas fa-envelope fa-lg fa-fw" />
                                    </span>
                                  </div>
                                  <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="off"
                                    className="form-control form-control-lg"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                  
                                </div>
                              </div> */}

                                    <div className="pt-1">
                                      <button
                                        className="btn btn-primary btn-block"
                                        type="submit"
                                        style={{ borderRadius: "10px", marginLeft: "0%" }}
                                      >
                                        Change &nbsp;
                                        <i className="fas fa-arrow-right-to-bracket" />
                                      </button>
                                    </div>
                                  </form>
                                )}
                              </Formik>
                            </div>
                          </div>
                          {/* Grid column */}
                        </div>
                        {/* Grid row */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        </>
      );
    }
  };

  return (
    <>
      {/* <div className="reset-card" align="center">
        <div className="card mt-5" sx={{ width: 451 }} align="center">
          <div className="card-body" align="center">
            <input 
            className="w-100 mt-3" 
            placeholder="Enter Your Email" 
            label="Email" 
            variant="outlined" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            />
            <button 
            color="success" 
            variant="contained" 
            className="mt-5" 
            type="submit" 
            fullWidth 
            onClick={verifyUser}
            >
              Submit
            </button>
          </div>
        </div>
        {showResetForm()}
      </div> */}


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

        <div className="reset-card">
          <section className="reset-form">
            <div className="container">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-lg-12 col-xl-11">
                  <div className="card text-black my-5" style={{ borderRadius: 25 }}>
                    <div className="card-body">
                      {/* Grid row */}
                      <div className="row d-flex justify-content-center align-items-center">

                        {/* Grid column */}
                        <div className="col-lg-6">
                          <div className="">
                            <div className="mb-4">
                              <h3 className="mx-5">
                                Forgot Your Password ?
                              </h3>
                            </div>
                            <div className='mb-4'>
                              <p className='mx-5'>
                                To reset your password, enter the registered email address and
                                we will send you the OTP on your email to reset your password.
                              </p>
                            </div>
                            <div
                              className="mx-md-5 text-black"
                            // onSubmit={StudentLogin.handleSubmit}
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
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                                {/* <span className="text-danger">
                        {StudentLogin.errors.email}
                      </span> */}
                              </div>

                              {/* <div className="d-flex flex-row align-items-center mb-4">
                                <div className="input-group input-group-lg flex-fill mb-0">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-lg">
                                      <i className="fas fa-envelope fa-lg fa-fw" />
                                    </span>
                                  </div>
                                  <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="off"
                                    className="form-control form-control-lg"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                  
                                </div>
                              </div> */}

                              <div className="pt-1">
                                <button
                                  className="btn btn-primary btn-block"
                                  type="submit"
                                  onClick={verifyUser}
                                  style={{ borderRadius: "10px", marginLeft: "0%" }}
                                >
                                  Send &nbsp;
                                  <i className="fas fa-arrow-right-to-bracket" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Grid column */}

                        {/* Grid column */}
                        <div className="col-md-5 reset-img">
                          <img
                            src="/images/forgot.webp"
                            className="image"
                            alt=""
                            style={{
                              height: 400,
                              marginTop: "5%",
                              marginLeft: "8%",
                            }}
                          />
                        </div>
                        {/* Grid column */}
                      </div>
                      {/* Grid row */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {showResetForm()}
        </div>

      </motion.div >
    </>
  );
};

export default ResetPassword;
