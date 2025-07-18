import React, { useRef, useState, useEffect } from "react";
import app_config from "../../config";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useTrainerContext } from "../../context/TrainerContext";

const TrainerProfile = () => {
  const [selImage, setSelImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
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

  useEffect(() => {
    const fetchTrainer = async () => {
      if (currentTrainer?._id) {
        try {
          const res = await fetch(
            `${app_config.apiUrl}/trainer/${currentTrainer._id}`
          );
          if (res.ok) {
            const freshTrainer = await res.json();

            // Обновляем локальное состояние
            setCurrentTrainer(freshTrainer);

            // Обновляем sessionStorage
            sessionStorage.setItem("trainer", JSON.stringify(freshTrainer));

            // Обновляем контекст
            updateUser(freshTrainer);

            // Отправляем событие для обновления других компонентов
            window.dispatchEvent(new Event("trainerUpdated"));
          } else {
            console.error("Failed to fetch trainer data:", res.status);
          }
        } catch (error) {
          console.error("Error fetching trainer data:", error);
        }
      }
    };
    fetchTrainer();
    // eslint-disable-next-line
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

  const trainersignupSchema = Yup.object().shape({
    name: Yup.string().required("Имя обязательно"),
    email: Yup.string().email("Неверный email").required("Email обязателен"),
    mobile_no: Yup.string().required("Номер телефона обязателен"),
    skills: Yup.string().required("Навыки обязательны"),
    certifications: Yup.string().required("Сертификаты обязательны"),
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
      try {
        if (!currentTrainer?._id) {
          Swal.fire({
            icon: "error",
            title: "Ошибка!",
            text: "Данные тренера не найдены. Пожалуйста, войдите в систему заново.",
            showConfirmButton: false,
            timer: 2000,
          });
          return;
        }

        const res = await fetch(
          `${app_config.apiUrl}/trainer/update/${currentTrainer._id}`,
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

          // Обновляем данные в контексте
          updateUser(data);

          // Обновляем локальное состояние
          setCurrentTrainer(data);

          // Обновляем sessionStorage
          sessionStorage.setItem("trainer", JSON.stringify(data));

          // Отправляем событие для обновления других компонентов
          window.dispatchEvent(new Event("trainerUpdated"));

          Swal.fire({
            icon: "success",
            title: "Отлично!",
            text: "Профиль успешно обновлен",
            showConfirmButton: false,
            timer: 1500,
            background: "rgba(255, 255, 255, 0.95)",
            backdrop: "rgba(0, 0, 0, 0.4)",
            customClass: {
              popup: "modern-swal-popup swal2-success",
              title: "modern-swal-title",
              content: "modern-swal-content",
            },
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        } else {
          const errorData = await res.json();
          Swal.fire({
            icon: "error",
            title: "Ошибка!",
            text: errorData.message || "Не удалось обновить профиль",
            showConfirmButton: false,
            timer: 1500,
            background: "rgba(255, 255, 255, 0.95)",
            backdrop: "rgba(0, 0, 0, 0.4)",
            customClass: {
              popup: "modern-swal-popup swal2-error",
              title: "modern-swal-title",
              content: "modern-swal-content",
            },
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
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
          background: "rgba(255, 255, 255, 0.95)",
          backdrop: "rgba(0, 0, 0, 0.4)",
          customClass: {
            popup: "modern-swal-popup swal2-error",
            title: "modern-swal-title",
            content: "modern-swal-content",
          },
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema: trainersignupSchema,
  });

  useEffect(() => {
    // Если есть актуальные данные тренера, заполняем форму
    if (currentTrainer) {
      trainerProfileForm.setValues({
        name: currentTrainer.name || "",
        email: currentTrainer.email || "",
        mobile_no: currentTrainer.mobile_no || "",
        skills: currentTrainer.skills || "",
        certifications: currentTrainer.certifications || "",
      });
    }
    // eslint-disable-next-line
  }, [currentTrainer]);

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

    if (!currentTrainer?._id) {
      Swal.fire({
        icon: "error",
        title: "Ошибка!",
        text: "Данные тренера не найдены. Пожалуйста, войдите в систему заново.",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    const fd = new FormData();
    fd.append("myfile", selImage);

    try {
      // Симуляция прогресса загрузки
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Загружаем файл
      const res = await fetch(`${app_config.apiUrl}/util/uploadfile`, {
        method: "POST",
        body: fd,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (res.status === 200) {
        const data = await res.json();

        // Обновляем профиль тренера с новым изображением
        const updateRes = await fetch(
          `${app_config.apiUrl}/trainer/update/${currentTrainer._id}`,
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

          updateUser(updatedTrainer);

          setCurrentTrainer(updatedTrainer);

          sessionStorage.setItem("trainer", JSON.stringify(updatedTrainer));

          window.dispatchEvent(new Event("trainerUpdated"));

          setImage("");
          setSelImage(null);
          setUploadProgress(0);

          Swal.fire({
            icon: "success",
            title: "Успешно!",
            text: "Фотография профиля успешно загружена и обновлена",
            showConfirmButton: false,
            timer: 2000,
            background: "rgba(255, 255, 255, 0.95)",
            backdrop: "rgba(0, 0, 0, 0.4)",
            customClass: {
              popup: "modern-swal-popup swal2-success",
              title: "modern-swal-title",
              content: "modern-swal-content",
            },
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        } else {
          const errorData = await updateRes.json();
          throw new Error(errorData.message || "Failed to update profile");
        }
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to upload file");
      }
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire({
        icon: "error",
        title: "Ошибка!",
        text:
          error.message ||
          "Не удалось загрузить изображение. Попробуйте еще раз.",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div
      className="trainer-profile-container"
      style={{
        minHeight: "auto",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem 0",
      }}
    >
      <div className="container">
        {/* Заголовок */}
        <div className="text-center mb-5">
          <h1 className="display-4 text-white fw-bold mb-3">Профиль тренера</h1>
          <p className="text-white-50 fs-5">
            Управляйте своими данными и настройками
          </p>
        </div>

        <div className="row g-4">
          {/* Левая колонка - Информация профиля */}
          <div className="col-lg-4">
            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "20px",
                background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                overflow: "hidden",
              }}
            >
              <div className="card-body p-4">
                {/* Аватар */}
                <div className="text-center mb-4">
                  <div className="position-relative d-inline-block">
                    <div
                      className="avatar-container"
                      onClick={handleImageClick}
                      style={{
                        width: "180px",
                        height: "180px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        cursor: "pointer",
                        border: "4px solid #fff",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                        transition: "all 0.3s ease",
                        position: "relative",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.05)";
                        e.target.style.boxShadow =
                          "0 15px 40px rgba(0,0,0,0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.boxShadow =
                          "0 10px 30px rgba(0,0,0,0.2)";
                      }}
                    >
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Аватар"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : currentTrainer?.avatar &&
                        currentTrainer.avatar !== "undefined" &&
                        currentTrainer.avatar !== "null" ? (
                        <img
                          src={`${app_config.apiUrl}/${currentTrainer.avatar}`}
                          alt="Аватар"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            e.target.src =
                              "https://bootdey.com/img/Content/avatar/avatar1.png";
                          }}
                        />
                      ) : (
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar1.png"
                          alt="Аватар"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      )}

                      {/* Оверлей с иконкой камеры */}
                      <div
                        className="camera-overlay"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "rgba(0,0,0,0.5)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                        }}
                        onMouseEnter={(e) => (e.target.style.opacity = 1)}
                        onMouseLeave={(e) => (e.target.style.opacity = 0)}
                      >
                        <i className="fas fa-camera fa-2x text-white" />
                      </div>
                    </div>

                    <input
                      type="file"
                      ref={inputRef}
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                      accept="image/*"
                    />
                  </div>

                  {/* Кнопка загрузки */}
                  <button
                    className="btn btn-primary btn-lg mt-3 px-4"
                    onClick={uploadFile}
                    disabled={isUploading}
                    style={{
                      background: "linear-gradient(45deg, #667eea, #764ba2)",
                      border: "none",
                      borderRadius: "50px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      boxShadow: "0 5px 15px rgba(102, 126, 234, 0.4)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 8px 25px rgba(102, 126, 234, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 5px 15px rgba(102, 126, 234, 0.4)";
                    }}
                  >
                    {isUploading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        />
                        Загрузка...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-upload me-2" />
                        Загрузить фото
                      </>
                    )}
                  </button>

                  {/* Прогресс-бар загрузки */}
                  {isUploading && (
                    <div className="mt-3">
                      <div
                        className="progress"
                        style={{ height: "8px", borderRadius: "10px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${uploadProgress}%`,
                            background:
                              "linear-gradient(45deg, #667eea, #764ba2)",
                            borderRadius: "10px",
                            transition: "width 0.3s ease",
                          }}
                        />
                      </div>
                      <small className="text-muted">{uploadProgress}%</small>
                    </div>
                  )}
                </div>

                {/* Информация профиля */}
                <div className="profile-info">
                  <div
                    className="info-item mb-3 p-3"
                    style={{
                      background:
                        "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                      borderRadius: "15px",
                      border: "1px solid rgba(0,0,0,0.05)",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <div
                        className="icon-wrapper me-3"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(45deg, #667eea, #764ba2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <i className="fas fa-user text-white" />
                      </div>
                      <div>
                        <small className="text-muted d-block">Имя</small>
                        <strong>{currentTrainer?.name || "Не указано"}</strong>
                      </div>
                    </div>
                  </div>

                  <div
                    className="info-item mb-3 p-3"
                    style={{
                      background:
                        "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                      borderRadius: "15px",
                      border: "1px solid rgba(0,0,0,0.05)",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <div
                        className="icon-wrapper me-3"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(45deg, #667eea, #764ba2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <i className="fas fa-envelope text-white" />
                      </div>
                      <div>
                        <small className="text-muted d-block">Email</small>
                        <strong>{currentTrainer?.email || "Не указано"}</strong>
                      </div>
                    </div>
                  </div>

                  <div
                    className="info-item mb-3 p-3"
                    style={{
                      background:
                        "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                      borderRadius: "15px",
                      border: "1px solid rgba(0,0,0,0.05)",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <div
                        className="icon-wrapper me-3"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(45deg, #667eea, #764ba2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <i className="fas fa-phone text-white" />
                      </div>
                      <div>
                        <small className="text-muted d-block">Телефон</small>
                        <strong>
                          {currentTrainer?.mobile_no || "Не указано"}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div
                    className="info-item mb-3 p-3"
                    style={{
                      background:
                        "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                      borderRadius: "15px",
                      border: "1px solid rgba(0,0,0,0.05)",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <div
                        className="icon-wrapper me-3"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(45deg, #667eea, #764ba2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <i className="fas fa-cogs text-white" />
                      </div>
                      <div>
                        <small className="text-muted d-block">Навыки</small>
                        <strong>
                          {currentTrainer?.skills || "Не указано"}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div
                    className="info-item mb-3 p-3"
                    style={{
                      background:
                        "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                      borderRadius: "15px",
                      border: "1px solid rgba(0,0,0,0.05)",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <div
                        className="icon-wrapper me-3"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(45deg, #667eea, #764ba2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <i className="fas fa-award text-white" />
                      </div>
                      <div>
                        <small className="text-muted d-block">
                          Сертификаты
                        </small>
                        <strong>
                          {currentTrainer?.certifications || "Не указано"}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка - Форма редактирования */}
          <div className="col-lg-8">
            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "20px",
                background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                overflow: "hidden",
              }}
            >
              <div
                className="card-header border-0 p-4"
                style={{
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  color: "white",
                }}
              >
                <h3 className="mb-0 fw-bold">
                  <i className="fas fa-edit me-2" />
                  Редактировать профиль
                </h3>
                <p className="mb-0 mt-2 opacity-75">
                  Обновите свои данные и настройки
                </p>
              </div>

              <div className="card-body p-4">
                <form onSubmit={trainerProfileForm.handleSubmit}>
                  <div className="row g-4">
                    {/* Имя */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label fw-bold mb-2">
                          <i className="fas fa-user me-2 text-primary" />
                          Имя
                        </label>
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={{
                              background:
                                "linear-gradient(45deg, #667eea, #764ba2)",
                              border: "none",
                              color: "white",
                            }}
                          >
                            <i className="fas fa-user" />
                          </span>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className={`form-control ${
                              trainerProfileForm.errors.name &&
                              trainerProfileForm.touched.name
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Введите ваше имя"
                            value={trainerProfileForm.values.name}
                            onChange={trainerProfileForm.handleChange}
                            style={{
                              border: "1px solid #e9ecef",
                              borderRadius: "0 10px 10px 0",
                              padding: "12px 15px",
                            }}
                          />
                        </div>
                        {trainerProfileForm.errors.name &&
                          trainerProfileForm.touched.name && (
                            <div className="invalid-feedback d-block">
                              {trainerProfileForm.errors.name}
                            </div>
                          )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label fw-bold mb-2">
                          <i className="fas fa-envelope me-2 text-primary" />
                          Email
                        </label>
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={{
                              background:
                                "linear-gradient(45deg, #667eea, #764ba2)",
                              border: "none",
                              color: "white",
                            }}
                          >
                            <i className="fas fa-envelope" />
                          </span>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className={`form-control ${
                              trainerProfileForm.errors.email &&
                              trainerProfileForm.touched.email
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Введите ваш email"
                            value={trainerProfileForm.values.email}
                            onChange={trainerProfileForm.handleChange}
                            style={{
                              border: "1px solid #e9ecef",
                              borderRadius: "0 10px 10px 0",
                              padding: "12px 15px",
                            }}
                          />
                        </div>
                        {trainerProfileForm.errors.email &&
                          trainerProfileForm.touched.email && (
                            <div className="invalid-feedback d-block">
                              {trainerProfileForm.errors.email}
                            </div>
                          )}
                      </div>
                    </div>

                    {/* Телефон */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label fw-bold mb-2">
                          <i className="fas fa-phone me-2 text-primary" />
                          Номер телефона
                        </label>
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={{
                              background:
                                "linear-gradient(45deg, #667eea, #764ba2)",
                              border: "none",
                              color: "white",
                            }}
                          >
                            <i className="fas fa-phone" />
                          </span>
                          <input
                            type="text"
                            id="mobile_no"
                            name="mobile_no"
                            className={`form-control ${
                              trainerProfileForm.errors.mobile_no &&
                              trainerProfileForm.touched.mobile_no
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Введите номер телефона"
                            value={trainerProfileForm.values.mobile_no}
                            onChange={trainerProfileForm.handleChange}
                            style={{
                              border: "1px solid #e9ecef",
                              borderRadius: "0 10px 10px 0",
                              padding: "12px 15px",
                            }}
                          />
                        </div>
                        {trainerProfileForm.errors.mobile_no &&
                          trainerProfileForm.touched.mobile_no && (
                            <div className="invalid-feedback d-block">
                              {trainerProfileForm.errors.mobile_no}
                            </div>
                          )}
                      </div>
                    </div>

                    {/* Навыки */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label fw-bold mb-2">
                          <i className="fas fa-cogs me-2 text-primary" />
                          Навыки
                        </label>
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={{
                              background:
                                "linear-gradient(45deg, #667eea, #764ba2)",
                              border: "none",
                              color: "white",
                            }}
                          >
                            <i className="fas fa-cogs" />
                          </span>
                          <input
                            type="text"
                            id="skills"
                            name="skills"
                            className={`form-control ${
                              trainerProfileForm.errors.skills &&
                              trainerProfileForm.touched.skills
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Введите ваши навыки"
                            value={trainerProfileForm.values.skills}
                            onChange={trainerProfileForm.handleChange}
                            style={{
                              border: "1px solid #e9ecef",
                              borderRadius: "0 10px 10px 0",
                              padding: "12px 15px",
                            }}
                          />
                        </div>
                        {trainerProfileForm.errors.skills &&
                          trainerProfileForm.touched.skills && (
                            <div className="invalid-feedback d-block">
                              {trainerProfileForm.errors.skills}
                            </div>
                          )}
                      </div>
                    </div>

                    {/* Сертификаты */}
                    <div className="col-12">
                      <div className="form-group">
                        <label className="form-label fw-bold mb-2">
                          <i className="fas fa-award me-2 text-primary" />
                          Сертификаты
                        </label>
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={{
                              background:
                                "linear-gradient(45deg, #667eea, #764ba2)",
                              border: "none",
                              color: "white",
                            }}
                          >
                            <i className="fas fa-award" />
                          </span>
                          <input
                            type="text"
                            id="certifications"
                            name="certifications"
                            className={`form-control ${
                              trainerProfileForm.errors.certifications &&
                              trainerProfileForm.touched.certifications
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Введите ваши сертификаты"
                            value={trainerProfileForm.values.certifications}
                            onChange={trainerProfileForm.handleChange}
                            style={{
                              border: "1px solid #e9ecef",
                              borderRadius: "0 10px 10px 0",
                              padding: "12px 15px",
                            }}
                          />
                        </div>
                        {trainerProfileForm.errors.certifications &&
                          trainerProfileForm.touched.certifications && (
                            <div className="invalid-feedback d-block">
                              {trainerProfileForm.errors.certifications}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  {/* Кнопка отправки */}
                  <div className="text-center mt-5">
                    <button
                      className="btn btn-primary btn-lg px-5 py-3"
                      type="submit"
                      disabled={trainerProfileForm.isSubmitting}
                      style={{
                        background: "linear-gradient(45deg, #667eea, #764ba2)",
                        border: "none",
                        borderRadius: "50px",
                        fontWeight: "600",
                        fontSize: "1.1rem",
                        transition: "all 0.3s ease",
                        boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
                        minWidth: "200px",
                      }}
                      onMouseEnter={(e) => {
                        if (!trainerProfileForm.isSubmitting) {
                          e.target.style.transform = "translateY(-3px)";
                          e.target.style.boxShadow =
                            "0 12px 35px rgba(102, 126, 234, 0.6)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!trainerProfileForm.isSubmitting) {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow =
                            "0 8px 25px rgba(102, 126, 234, 0.4)";
                        }
                      }}
                    >
                      {trainerProfileForm.isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          />
                          Обновление...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save me-2" />
                          Сохранить изменения
                        </>
                      )}
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
