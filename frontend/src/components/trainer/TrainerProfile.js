import React, { useRef, useState, useEffect } from "react";
import app_config from "../../config";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useTrainerContext } from "../../context/TrainerContext";

const TrainerProfile = () => {
  const [selImage, setSelImage] = useState(null);
  const { updateUser } = useTrainerContext();

  const [currentTrainer, setCurrentTrainer] = useState(
    JSON.parse(sessionStorage.getItem("trainer"))
  );

  // Обновляем тренера при изменении в sessionStorage
  useEffect(() => {
    const handleTrainerUpdate = () => {
      const trainer = JSON.parse(sessionStorage.getItem("trainer"));
      setCurrentTrainer(trainer);
    };

    window.addEventListener("trainerUpdated", handleTrainerUpdate);
    return () =>
      window.removeEventListener("trainerUpdated", handleTrainerUpdate);
  }, []);

  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(event.target.files[0]);
  };

  const trainersignupSchema = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    email: Yup.string().email("Invalid email").required("Email is Required"),
    mobile_no: Yup.string().required("Mobile Number is Required"),
    skills: Yup.string().required("Skills is Required"),
    certifications: Yup.string().required("Certificate is Required"),
  });

  const trainerProfileForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile_no: "",
      skills: "",
      certifications: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/trainer/update/` + currentTrainer._id,
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.status);
      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        updateUser(data); // Обновляем тренера в контексте
        setCurrentTrainer(data);
        Swal.fire({
          icon: "success",
          title: "Well Done!!",
          text: "Profile Updated Successfully",
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
    validationSchema: trainersignupSchema,
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

        // Обновляем профиль тренера с новым изображением
        const updateRes = await fetch(
          `${process.env.REACT_APP_API_URL}/trainer/update/${currentTrainer._id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              name: currentTrainer.name,
              email: currentTrainer.email,
              mobile_no: currentTrainer.mobile_no,
              skills: currentTrainer.skills,
              certifications: currentTrainer.certifications,
              avatar: data.filename,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (updateRes.status === 200) {
          const updatedTrainer = await updateRes.json();
          console.log("updatedTrainer from server:", updatedTrainer);
          updateUser(updatedTrainer); // Обновляем тренера в контексте
          setCurrentTrainer(updatedTrainer);
          setImage(""); // Очищаем состояние image
          setSelImage(null); // Очищаем выбранное изображение

          Swal.fire({
            icon: "success",
            title: "Успешно!",
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
    }
  };

  return (
    <div>
      <div className="container-xl px-5 my-5">
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
                    ) : currentTrainer?.avatar &&
                      currentTrainer.avatar !== "undefined" &&
                      currentTrainer.avatar !== "null" ? (
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${currentTrainer.avatar}`}
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
                            currentTrainer.avatar
                          );
                          e.target.src =
                            "https://bootdey.com/img/Content/avatar/avatar1.png";
                        }}
                      />
                    ) : (
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
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
                  <button className="btn btn-primary mt-3" onClick={uploadFile}>
                    Upload Image
                  </button>
                </div>
                <hr className="my-3" />
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Name</h6>
                    <span className="text-secondary">
                      {currentTrainer.name}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Email</h6>
                    <span className="text-secondary">
                      {currentTrainer.email}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Mobile No.</h6>
                    <span className="text-secondary">
                      +91 {currentTrainer.mobile_no}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Skills</h6>
                    <span className="text-secondary">
                      {currentTrainer.skills}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Certificates</h6>
                    <span className="text-secondary">
                      {currentTrainer.certifications}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-xl-7 mx-2">
            <div className="card h-100 mb-4">
              <div
                className="card-header text-center fw-bold text-uppercase mb-4"
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
                  onSubmit={trainerProfileForm.handleSubmit}
                >
                  <div className="form-group has-icon mb-4">
                    <i className="fas fa-user fa-lg form-control-icon" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control form-control-lg"
                      placeholder="Name"
                      value={trainerProfileForm.values.name}
                      onChange={trainerProfileForm.handleChange}
                    />
                    <span className="text-danger">
                      {trainerProfileForm.errors.name}
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
                      value={trainerProfileForm.values.email}
                      onChange={trainerProfileForm.handleChange}
                    />
                    <span className="text-danger">
                      {trainerProfileForm.errors.email}
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
                      value={trainerProfileForm.values.mobile_no}
                      onChange={trainerProfileForm.handleChange}
                    />
                    <span className="text-danger">
                      {trainerProfileForm.errors.mobile_no}
                    </span>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-5">
                    <div className="form-group has-icon me-2">
                      <i className="fas fa-gear fa-lg form-control-icon" />
                      <input
                        type="text"
                        id="skills"
                        autoComplete="off"
                        className="form-control form-control-lg"
                        Placeholder="Skills"
                        value={trainerProfileForm.values.skills}
                        onChange={trainerProfileForm.handleChange}
                      />
                      <span className="text-danger">
                        {trainerProfileForm.errors.skills}
                      </span>
                    </div>
                    <div className="form-group has-icon ms-2">
                      <i className="fas fa-award fa-lg form-control-icon" />
                      <input
                        type="text"
                        id="certifications"
                        autoComplete="off"
                        className="form-control form-control-lg"
                        placeholder="Certificate"
                        value={trainerProfileForm.values.certifications}
                        onChange={trainerProfileForm.handleChange}
                      />
                      <span className="text-danger">
                        {trainerProfileForm.errors.certifications}
                      </span>
                    </div>
                  </div>

                  <div className="pt-1 pb-1 ">
                    <button
                      className="btn btn-primary btn-block"
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
    </div>
  );
};

export default TrainerProfile;
