import React, { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import "./UserProfile.css";
import app_config from "../../config";
import { motion } from "framer-motion";

const UserProfile = () => {
  const [selImage, setSelImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { updateUser } = useUserContext();

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

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
      setImage(file);
      setSelImage(file);
    }
  };

  const usersignupSchema = Yup.object().shape({
    name: Yup.string().required("Имя обязательно"),
    email: Yup.string()
      .email("Неверный формат email")
      .required("Email обязателен"),
    mobile_no: Yup.string().required("Номер телефона обязателен"),
  });

  const userProfileForm = useFormik({
    initialValues: {
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      mobile_no: currentUser?.mobile_no || "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await fetch(
          `${app_config.apiUrl}/user/update/${currentUser._id}`,
          {
            method: "PUT",
            body: JSON.stringify(values),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 200) {
          const data = await res.json();

          updateUser(data);
          setCurrentUser(data);
          sessionStorage.setItem("user", JSON.stringify(data));
          window.dispatchEvent(new Event("userUpdated"));

          Swal.fire({
            icon: "success",
            title: "Отлично!",
            text: "Профиль успешно обновлен",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          const errorData = await res.json();
          Swal.fire({
            icon: "error",
            title: "Ошибка!",
            text: errorData.message || "Не удалось обновить профиль",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error("Update error:", error);
        Swal.fire({
          icon: "error",
          title: "Ошибка!",
          text: "Произошла ошибка при обновлении профиля",
          showConfirmButton: false,
          timer: 1500,
        });
      } finally {
        setSubmitting(false);
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
      const res = await fetch(`${app_config.apiUrl}/util/uploadfile`, {
        method: "POST",
        body: fd,
      });

      if (res.status === 200) {
        const data = await res.json();

        const updateRes = await fetch(
          `${app_config.apiUrl}/user/update/${currentUser._id}`,
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

          updateUser(updatedUser);
          setCurrentUser(updatedUser);
          sessionStorage.setItem("user", JSON.stringify(updatedUser));
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
    <div
      className="user-profile-container"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
        padding: "2rem 0",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="container-xl px-5 mb-8 mt-5">
        <motion.div
          className="row d-flex justify-content-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="col-lg-4 mx-2" style={{ width: "36.5%" }}>
            <motion.div
              className="card glass-card"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <motion.div
                    className="bg-image profile-picture-container hover-overlay ripple"
                    data-mdb-ripple-color="light"
                    onClick={handleImageClick}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Профиль"
                        className="img-fluid rounded-circle p-1 bg-primary"
                        style={{
                          width: "180px",
                          height: "180px",
                          backgroundSize: "cover",
                          border: "4px solid rgba(255, 255, 255, 0.3)",
                          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    ) : currentUser?.avatar &&
                      currentUser.avatar !== "undefined" &&
                      currentUser.avatar !== "null" ? (
                      <img
                        src={`${app_config.apiUrl}/${currentUser.avatar}`}
                        alt="Профиль"
                        className="img-fluid rounded-circle p-1 bg-primary"
                        style={{
                          width: "180px",
                          height: "180px",
                          backgroundSize: "cover",
                          border: "4px solid rgba(255, 255, 255, 0.3)",
                          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                        }}
                        onError={(e) => {
                          e.target.src =
                            "https://www.bootdey.com/img/Content/avatar/avatar6.png";
                        }}
                      />
                    ) : (
                      <img
                        src="https://www.bootdey.com/img/Content/avatar/avatar6.png"
                        alt="Профиль"
                        className="img-fluid rounded-circle p-1 bg-primary"
                        style={{
                          width: "180px",
                          height: "180px",
                          backgroundSize: "cover",
                          border: "4px solid rgba(255, 255, 255, 0.3)",
                          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
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
                  </motion.div>
                  <motion.button
                    className="btn btn-primary my-4 modern-btn"
                    onClick={uploadFile}
                    disabled={isUploading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isUploading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Загрузка...
                      </>
                    ) : (
                      "Загрузить фото"
                    )}
                  </motion.button>
                </div>

                <hr className="my-3" />
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Имя</h6>
                    <span className="text-secondary">{currentUser.name}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Email</h6>
                    <span className="text-secondary">{currentUser.email}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Телефон</h6>
                    <span className="text-secondary">
                      {currentUser.mobile_no}
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          <div className="col-xl-7 mx-2">
            <motion.div
              className="card h-100 mb-4 glass-card"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="card-header text-center fw-bold text-uppercase mb-5"
                style={{
                  fontSize: "30px",
                  letterSpacing: "2px",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  border: "none",
                  color: "#333",
                  fontWeight: "700",
                }}
              >
                Обновить профиль
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
                      className="form-control form-control-lg modern-input"
                      placeholder="Имя"
                      value={userProfileForm.values.name}
                      onChange={userProfileForm.handleChange}
                    />
                    {userProfileForm.errors.name && (
                      <span className="text-danger error-message">
                        {userProfileForm.errors.name}
                      </span>
                    )}
                  </div>

                  <div className="form-group has-icon mb-4">
                    <i className="fas fa-envelope fa-lg form-control-iconS" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="off"
                      className="form-control form-control-lg modern-input"
                      placeholder="Email"
                      value={userProfileForm.values.email}
                      onChange={userProfileForm.handleChange}
                    />
                    {userProfileForm.errors.email && (
                      <span className="text-danger error-message">
                        {userProfileForm.errors.email}
                      </span>
                    )}
                  </div>

                  <div className="form-group has-icon mb-5">
                    <i className="fas fa-mobile-screen-button fa-lg form-control-iconS" />
                    <input
                      type="text"
                      id="mobile_no"
                      name="mobile_no"
                      className="form-control form-control-lg modern-input"
                      placeholder="Номер телефона"
                      value={userProfileForm.values.mobile_no}
                      onChange={userProfileForm.handleChange}
                    />
                    {userProfileForm.errors.mobile_no && (
                      <span className="text-danger error-message">
                        {userProfileForm.errors.mobile_no}
                      </span>
                    )}
                  </div>

                  <div className="pt-1 pb-1">
                    <motion.button
                      className="btn btn-primary btn-block mb-2 modern-btn"
                      type="submit"
                      disabled={userProfileForm.isSubmitting}
                      style={{ borderRadius: "10px", marginLeft: "0px" }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {userProfileForm.isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Обновление...
                        </>
                      ) : (
                        <>
                          Обновить &nbsp;
                          <i className="fas fa-arrow-right-to-bracket" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
