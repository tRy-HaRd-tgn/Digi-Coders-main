import React, { useRef, useState } from 'react'
import app_config from '../../config';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';

const UserProfile = () => {


    const [selImage, setSelImage] = useState(null);

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

    const inputRef = useRef(null);
    const [image, setImage] = useState('');

    const handleImageClick = () => {
        inputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        setImage(event.target.files[0]);
    };

    const usersignupSchema = Yup.object().shape({
        name: Yup.string().required('Name is Required'),
        email: Yup.string().email('Invalid email').required('Email is Required'),
        phone: Yup.string().required('Phone Number is Required'),
    });

    const userProfileForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            mobile_no: '',
        },
        onSubmit: async (values, { setSubmitting }) => {
            console.log(values);
            const res = await fetch(`${process.env.REACT_APP_API_URL}/user/update` + currentUser._id, {
                method: "PUT",
                body: JSON.stringify(values), // this is used to convert js data in json formate
                headers: {
                    "Content-Type": "application/json", // this used to inform the data in send in the form of json
                },
            });
            console.log(res.status);
            setSubmitting(false);
            if (res.status === 200) {
                const data = await res.json();
                console.log(data);
                sessionStorage.setItem("user", JSON.stringify(data));
                setCurrentUser(values);
                Swal.fire({
                    icon: "success",
                    title: "Well Done!!",
                    text: "Profile Updated successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "OOPS!",
                    text: "Profile Not Updated",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },
        validationSchema: usersignupSchema,
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
        <div>
            <div className="container-xl px-5 mb-8 mt-5">
                <div className="row d-flex justify-content-center ">
                    <div className="col-lg-4 mx-2" style={{ width: "36.5%" }}>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <div
                                        class="bg-image profile-picture-container hover-overlay ripple"
                                        data-mdb-ripple-color="light"
                                        onClick={handleImageClick}
                                    >
                                        {image ? (
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt="Admin"
                                                className="img-fluid rounded-circle p-1 bg-primary"
                                                style={{ width: "180px", height: "180px", backgroundSize: "cover", }}
                                            />
                                        ) : (
                                            <img
                                                src="https://www.bootdey.com/img/Content/avatar/avatar6.png"
                                                alt="Admin"
                                                className="img-fluid rounded-circle p-1 bg-primary"
                                                style={{ width: "180px", height: "180px", backgroundSize: "cover" }}
                                            />
                                        )}
                                        {/* <img
                                            src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                            alt="Admin"
                                            className="rounded-circle p-1 bg-primary"
                                            style={{ width: "180px", backgroundSize: "cover" }}
                                        /> */}
                                        <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: "none" }} />
                                        <div className="camera-icon">
                                            <i className="fas fa-camera fa-lg" />
                                        </div>

                                        <div
                                            className="mask"
                                            style={{ borderRadius: "50%", backgroundColor: "rgb(0 0 0 / 30%)" }}
                                        />


                                    </div>
                                    <button className="btn btn-primary my-4">Upload Image</button>
                                    {/* <div className="mt-3">
                                        <h4>{currentUser.name}</h4>
                                        <p className="text-secondary">Full Stack Developer</p>
                                    </div> */}
                                </div>

                                <hr className="my-3" />
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">
                                            Name
                                        </h6>
                                        <span className="text-secondary">{currentUser.name}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">
                                            Email
                                        </h6>
                                        <span className="text-secondary">{currentUser.email}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">
                                            Mobile No.
                                        </h6>
                                        <span className="text-secondary">+91 {currentUser.mobile_no}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-7 mx-2">
                        {/* Account details card*/}
                        <div className="card h-100 mb-4">
                            <div className="card-header text-center fw-bold text-uppercase mb-5" style={{ fontSize: "30px", letterSpacing: "2px", backgroundColor: "#f1f1f1" }}>
                                Update Your Profile
                            </div>
                            <div className="card-body">
                                <form
                                    className="mx-md-5 text-black"
                                    onSubmit={userProfileForm.handleSubmit}
                                >
                                    <div className="form-group has-icon mb-4">
                                        <i className="fas fa-user fa-lg form-control-icon" />
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control form-control-lg"
                                            placeholder="Name"
                                            value={userProfileForm.values.name}
                                            onChange={userProfileForm.handleChange}
                                        />
                                        <span className='text-danger'>{userProfileForm.errors.name}</span>
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
                                            value={userProfileForm.values.email}
                                            onChange={userProfileForm.handleChange}
                                        />
                                        <span className='text-danger' >{userProfileForm.errors.email}</span>
                                    </div>

                                    <div className="form-group has-icon mb-5">
                                        <i className="fas fa-mobile-screen-button fa-lg form-control-icon" />
                                        <input
                                            type="text"
                                            id="mobile_no"
                                            name="mobile_no"
                                            className="form-control form-control-lg"
                                            placeholder="Mobile Number"
                                            value={userProfileForm.values.mobile_no}
                                            onChange={userProfileForm.handleChange}
                                        />
                                        <span className='text-danger'>{userProfileForm.errors.name}</span>
                                    </div>

                                    {/* <div className='d-flex flex-row align-items-center mx-1 mb-4'>
                                        <label htmlFor="chapter-img" className="btn btn-primary">
                                            {' '}
                                            <i class="fas fa-upload"></i> Upload Image
                                        </label>
                                        <span className='text-warning mx-3'>
                                            {selImage ? selImage.name : 'No Image Selected'}
                                        </span>
                                        <input type="file" id="chapter-img" hidden onChange={uploadFile} />
                                    </div> */}

                                    <div className="pt-1 pb-1 ">
                                        <button
                                            className="btn btn-primary btn-block mb-2"
                                            type="submit"
                                            style={{ borderRadius: "10px", marginLeft: "0px" }}
                                        >
                                            Update &nbsp;
                                            <i className="fas fa-arrow-right-to-bracket" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div
                className="text-center text-white p-4"
                style={{ backgroundColor: "#1b1b1b" }}
            >
                © 2023 Copyright :&nbsp;
                <NavLink className="text-reset fw-bold custom-link-hover" to="#">
                    DigiCoders.com
                </NavLink>
            </div>
            {/* Copyright */}

        </div>
    )
}

export default UserProfile