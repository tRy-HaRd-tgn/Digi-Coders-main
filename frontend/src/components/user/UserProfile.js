import React, { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import "./UserProfile.css";

const UserProfile = () => {
  const [selImage, setSelImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { updateUser } = useUserContext();

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  console.log("currentUser from sessionStorage:", currentUser);
  console.log("currentUser.avatar:", currentUser?.avatar);

  useEffect(() => {
    const handleUserUpdate = () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      setCurrentUser(user);
    };

    window.addEventListener("userUpdated", handleUserUpdate);
    return () => window.removeEventListener("userUpdated", handleUserUpdate);
  }, []);

  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      setImage(file);
      setSelImage(file);
    }
  };

  const usersignupSchema = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    email: Yup.string().email("Invalid email").required("Email is Required"),
    phone: Yup.string().required("Phone Number is Required"),
  });

  const userProfileForm = useFormik({
    initialValues: {
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      mobile_no: currentUser?.mobile_no || "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/user/update/${currentUser._id}`,
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.status);
      setSubmitting(false);
      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        updateUser(data);
        setCurrentUser(data);
        Swal.fire({
          icon: "success",
          title: "Well Done!!",
          text: "Profile Updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "OOPS!",
          text: "Profile Not Updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    validationSchema: usersignupSchema,
  });

  const uploadFile = async () => {
    if (!selImage) {
      Swal.fire({
        icon: "warning",
        title: "Внимание!",
        text: "Пожалуйста, выберите изображение для загрузки",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    setIsUploading(true);
    const fd = new FormData();
    fd.append("myfile", selImage);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/util/uploadfile`,
        {
          method: "POST",
          body: fd,
        }
      );

      if (res.status === 200) {
        const data = await res.json();
        console.log("file uploaded successfully", data);
        console.log("currentUser before update:", currentUser);

        const updateRes = await fetch(
          `${process.env.REACT_APP_API_URL}/user/update/${currentUser._id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              name: currentUser.name,
              email: currentUser.email,
              mobile_no: currentUser.mobile_no,
              avatar: data.filename,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (updateRes.status === 200) {
          const updatedUser = await updateRes.json();
          console.log("updatedUser from server:", updatedUser);
          updateUser(updatedUser);
          setCurrentUser(updatedUser);
          setImage("");
          setSelImage(null);

          Swal.fire({
            icon: "success",
            title: "Отлично!",
            text: "Фотография профиля успешно загружена",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          throw new Error("Failed to update profile");
        }
      } else {
        throw new Error("Failed to upload file");
      }
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire({
        icon: "error",
        title: "Ошибка!",
        text: "Не удалось загрузить изображение. Попробуйте еще раз.",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="user-profile-container">
      <div className="container-xl px-5 mb-8 mt-5">
        <div className="row d-flex justify-content-center ">
          <div className="col-lg-4 mx-2" style={{ width: "36.5%" }}>
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <div
                    className="bg-image profile-picture-container hover-overlay ripple"
                    data-mdb-ripple-color="light"
                    onClick={handleImageClick}
                  >
                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Admin"
                        className="img-fluid rounded-circle p-1 bg-primary"
                        style={{
                          width: "180px",
                          height: "180px",
                          backgroundSize: "cover",
                        }}
                      />
                    ) : currentUser?.avatar &&
                      currentUser.avatar !== "undefined" &&
                      currentUser.avatar !== "null" ? (
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${currentUser.avatar}`}
                        alt="Admin"
                        className="img-fluid rounded-circle p-1 bg-primary"
                        style={{
                          width: "180px",
                          height: "180px",
                          backgroundSize: "cover",
                        }}
                        onError={(e) => {
                          console.log(
                            "Image load error for:",
                            currentUser.avatar
                          );
                          e.target.src =
                            "https://www.bootdey.com/img/Content/avatar/avatar6.png";
                        }}
                      />
                    ) : (
                      <img
                        src="https://www.bootdey.com/img/Content/avatar/avatar6.png"
                        alt="Admin"
                        className="img-fluid rounded-circle p-1 bg-primary"
                        style={{
                          width: "180px",
                          height: "180px",
                          backgroundSize: "cover",
                        }}
                      />
                    )}

                    <input
                      type="file"
                      ref={inputRef}
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                    <div className="camera-icon">
                      <i className="fas fa-camera fa-lg" />
                    </div>

                    <div
                      className="mask"
                      style={{
                        borderRadius: "50%",
                        backgroundColor: "rgb(0 0 0 / 30%)",
                      }}
                    />
                  </div>
                  <button className="btn btn-primary my-4" onClick={uploadFile}>
                    Upload Image
                  </button>
                </div>

                <hr className="my-3" />
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Name</h6>
                    <span className="text-secondary">{currentUser.name}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Email</h6>
                    <span className="text-secondary">{currentUser.email}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Mobile No.</h6>
                    <span className="text-secondary">
                      {currentUser.mobile_no}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-xl-7 mx-2">
            <div className="card h-100 mb-4">
              <div
                className="card-header text-center fw-bold text-uppercase mb-5"
                style={{
                  fontSize: "30px",
                  letterSpacing: "2px",
                  backgroundColor: "#f1f1f1",
                }}
              >
                Update Your Profile
              </div>
              <div className="card-body">
                <form
                  className="mx-md-5 text-black"
                  onSubmit={userProfileForm.handleSubmit}
                >
                  <div className="form-group has-icon mb-4">
                    <i className="fas fa-user fa-lg form-control-iconS" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control form-control-lg"
                      placeholder="Name"
                      value={userProfileForm.values.name}
                      onChange={userProfileForm.handleChange}
                    />
                    <span className="text-danger">
                      {userProfileForm.errors.name}
                    </span>
                  </div>

                  <div className="form-group has-icon mb-4">
                    <i className="fas fa-envelope fa-lg form-control-iconS" />
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
                    <span className="text-danger">
                      {userProfileForm.errors.email}
                    </span>
                  </div>

                  <div className="form-group has-icon mb-5">
                    <i className="fas fa-mobile-screen-button fa-lg form-control-iconS" />
                    <input
                      type="text"
                      id="mobile_no"
                      name="mobile_no"
                      className="form-control form-control-lg"
                      placeholder="Mobile Number"
                      value={userProfileForm.values.mobile_no}
                      onChange={userProfileForm.handleChange}
                    />
                    <span className="text-danger">
                      {userProfileForm.errors.mobile_no}
                    </span>
                  </div>

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

      <div
        className="text-center text-white p-4"
        style={{
          backgroundColor: "#1b1b1b",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
        }}
      >
        © 2023 Copyright :&nbsp;
        <NavLink className="text-reset fw-bold custom-link-hover" to="#">
          DigiCoders.com
        </NavLink>
      </div>
    </div>
  );
};

export default UserProfile;
