import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { motion } from "framer-motion";
import { NavLink, useNavigate } from 'react-router-dom';
import app_config from '../../config';
import jwt_decode from "jwt-decode";
import { useUserContext } from '../../context/UserContext';

const StudentSignup = () => {

    const navigate = useNavigate();

    const [selImage, setSelImage] = useState(null);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);

    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState('');

    const { loggedIn, setLoggedIn } = useUserContext();


    const StudentsignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Please Enter your password')
        // .matches(
        //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        // ),

    });

    const studentsignupForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            avatar: '',
            mobile_no: '',
            createdAt: '',
        },
        onSubmit: async (values, { setSubmitting }) => {
            values.avatar = selImage.name;
            console.log(values);

            const res = await fetch(`${process.env.REACT_APP_API_URL}/user/add`, {
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
                navigate('/main/studentlogin');
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
        },
        validationSchema: StudentsignupSchema,

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


    const handleSignOut = (event) => {
        setUser({});
        document.getElementById("signInDiv").hidden = false;
    };

    const saveGoogleUser = async (googleObj) => {
        setAvatar(googleObj.picture);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/add`, {
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

        console.log(response.status);

        if (response.status === 200) {
            const data = await response.json();
            sessionStorage.setItem("user", JSON.stringify(data));
            setLoggedIn(true);
            navigate("/");
        }
    };

    const handleCallbackResponse = async (response) => {
        // console.log("Encoded jwt id token:" + response.credential);
        var userObject = jwt_decode(response.credential);
        // console.log(userObject);
        setUser(userObject);
        // setAvatar(userObject.picture);
        //after signin the button of "signin with google" hides
        document.getElementById("signInDiv").hidden = true;
        sessionStorage.setItem("user", JSON.stringify(userObject));

        navigate('/main/course');

        // const res = await fetch(url + "/user/checkemail/" + userObject.email);
        // if (res.status === 200) {
        //   const data = await res.json();
        //   sessionStorage.setItem("user", JSON.stringify(data));
        //   setLoggedIn(true);
        //   navigate("/");
        // } else {
        //   saveGoogleUser(userObject);
        // }
    };

    useEffect(() => {
        /*global google*/
        google.accounts.id.initialize({
            client_id:
                "941149713723-22urp8pss6cdudmhnf9007ak61t6t68j.apps.googleusercontent.com",
            callback: handleCallbackResponse, //token visible
        });
        google.accounts.id.renderButton(document.getElementById("signInDiv"), {
            theme: "outline",
            size: "large",
        });
        google.accounts.id.prompt(); //enable prompt
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
                                        <NavLink to="/main/studentlogin" className="btn btn-primary">
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
                                        Student Signup
                                    </h3>
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
                                        <span className='text-danger'>{studentsignupForm.errors.name}</span>
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
                                        <span className='text-danger' >{studentsignupForm.errors.email}</span>
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
                                            value={studentsignupForm.values.password}
                                            onChange={studentsignupForm.handleChange}
                                        />
                                        <span className='text-danger'>{studentsignupForm.errors.password}</span>
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
                                        {/* <span className='text-danger'>{studentsignupForm.errors.name}</span> */}
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

                                    <div className="pt-1 pb-1">
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
                                            <div style={{ width: "100%" }} role="button" id="signInDiv">
                                                <i
                                                    className="fab fa-google"
                                                    style={{ marginLeft: "6px" }}
                                                ></i>
                                            </div>
                                            {Object.keys(user).length !== 0 && (
                                                <button onClick={(e) => handleSignOut(e)}>Signout</button>
                                            )}
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*Student Signup Form*/}
        </motion.div>
    )
}

export default StudentSignup