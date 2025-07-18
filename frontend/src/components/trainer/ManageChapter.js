import { useFormik } from "formik";
import React, { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import app_config from "../../config";
import { NavLink, useParams } from "react-router-dom";

const ManageChapter = () => {
  const { chaptername } = useParams();

  const itemPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [masterList, setMasterList] = useState([]);
  const [chapterList, setChapterList] = useState([]);

  const fetchUserData = useCallback(async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/chapter/getall`);

    const data = await res.json();

    if (chaptername) {
      setChapterList(
        data.filter(
          (chapter) => chapter.title.toLowerCase() === chaptername.toLowerCase()
        )
      );
    } else {
      setChapterList(data);
    }
    setMasterList(data);
  }, [chaptername]);

  const deleteChapter = async (id) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/chapter/delete/` + id,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();

    if (data) {
      Swal.fire({
        title: "Глава успешно удалена",
        icon: "success",
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
      fetchUserData();
    } else {
      Swal.fire({
        title: "Ошибка при удалении главы",
        icon: "error",
        timer: 2000,
      });
    }
  };

  const searchChapterByName = (e) => {
    const val = e.target.value;
    setChapterList(
      masterList.filter((chapter) =>
        chapter.title.toLowerCase().includes(val.toLowerCase())
      )
    );
    setCurrentPage(1);
  };

  const displayChapters = () => {
    return (
      <div className="manage-chapters-container">
        {/* Современный хедер с поиском и кнопкой добавления */}
        <div className="chapters-header">
          <div className="container">
            <div className="header-content">
              <div className="search-section">
                <div className="search-wrapper">
                  <i className="fas fa-search search-icon" />
                  <input
                    type="search"
                    id="search"
                    name="search"
                    className="search-input"
                    placeholder="Поиск глав..."
                    onChange={searchChapterByName}
                  />
                </div>
              </div>
              <div className="action-section">
                <button
                  type="button"
                  className="add-chapter-btn"
                  data-mdb-toggle="modal"
                  data-mdb-target="#staticBackdrop1"
                >
                  <i className="fas fa-plus" />
                  <span>Добавить главу</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Модальное окно для создания главы */}
        <div
          className="modal fade"
          id="staticBackdrop1"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content modern-modal">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel1">
                  <i className="fas fa-book-open me-2" />
                  Создать новую главу
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-mdb-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form
                  className="chapter-form"
                  action="#!"
                  onSubmit={managechapterForm.handleSubmit}
                >
                  <div className="form-group">
                    <label htmlFor="title" className="form-label">
                      <i className="fas fa-heading me-2" />
                      Название главы
                    </label>
                    <input
                      type="text"
                      id="title"
                      className={`form-control modern-input ${
                        managechapterForm.touched.title &&
                        managechapterForm.errors.title
                          ? "error-input"
                          : ""
                      }`}
                      placeholder="Введите название главы"
                      value={managechapterForm.values.title}
                      onChange={managechapterForm.handleChange}
                      onBlur={managechapterForm.handleBlur}
                    />
                    {managechapterForm.touched.title &&
                      managechapterForm.errors.title && (
                        <div className="error-message">
                          <i className="fas fa-exclamation-triangle" />
                          {managechapterForm.errors.title}
                        </div>
                      )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="category" className="form-label">
                      <i className="fas fa-tags me-2" />
                      Категория
                    </label>
                    <select
                      id="category"
                      className={`form-control modern-input ${
                        managechapterForm.touched.category &&
                        managechapterForm.errors.category
                          ? "error-input"
                          : ""
                      }`}
                      value={managechapterForm.values.category}
                      onChange={managechapterForm.handleChange}
                      onBlur={managechapterForm.handleBlur}
                    >
                      <option value="">Выберите категорию</option>
                      {app_config.courseCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {managechapterForm.touched.category &&
                      managechapterForm.errors.category && (
                        <div className="error-message">
                          <i className="fas fa-exclamation-triangle" />
                          {managechapterForm.errors.category}
                        </div>
                      )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="description" className="form-label">
                      <i className="fas fa-align-left me-2" />
                      Описание главы
                    </label>
                    <textarea
                      className={`form-control modern-textarea ${
                        managechapterForm.touched.description &&
                        managechapterForm.errors.description
                          ? "error-input"
                          : ""
                      }`}
                      id="description"
                      rows={4}
                      placeholder="Опишите содержание главы..."
                      value={managechapterForm.values.description}
                      onChange={managechapterForm.handleChange}
                      onBlur={managechapterForm.handleBlur}
                    />
                    {managechapterForm.touched.description &&
                      managechapterForm.errors.description && (
                        <div className="error-message">
                          <i className="fas fa-exclamation-triangle" />
                          {managechapterForm.errors.description}
                        </div>
                      )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <i className="fas fa-image me-2" />
                      Изображение главы <span className="text-danger">*</span>
                    </label>
                    <div
                      className={`file-upload-wrapper ${
                        (!selImage && managechapterForm.submitCount > 0) ||
                        imageError
                          ? "error-state"
                          : ""
                      }`}
                    >
                      <label htmlFor="chapter-img" className="file-upload-btn">
                        <i className="fas fa-cloud-upload-alt" />
                        <span>Выбрать изображение</span>
                      </label>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        id="chapter-img"
                        hidden
                        onChange={uploadFile}
                      />
                      <div className="file-info">
                        {selImage ? (
                          <span className="file-selected">
                            <i className="fas fa-check-circle" />
                            {selImage.name}
                          </span>
                        ) : (
                          <span className="file-placeholder">
                            Изображение не выбрано
                          </span>
                        )}
                      </div>
                    </div>
                    {(imageError ||
                      (managechapterForm.touched.image &&
                        managechapterForm.errors.image) ||
                      (!selImage && managechapterForm.submitCount > 0)) && (
                      <div className="error-message">
                        <i className="fas fa-exclamation-triangle" />
                        {imageError ||
                          managechapterForm.errors.image ||
                          "Изображение обязательно для загрузки"}
                      </div>
                    )}
                  </div>

                  <div className="form-actions">
                    <button
                      className="btn btn-secondary me-3"
                      type="button"
                      data-mdb-dismiss="modal"
                    >
                      Отмена
                    </button>
                    <button
                      className={`btn btn-primary submit-btn ${
                        !selImage ? "disabled" : ""
                      }`}
                      type="submit"
                      disabled={!selImage}
                    >
                      <i className="fas fa-save me-2" />
                      Создать главу
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Современная таблица глав */}
        <div className="chapters-table-container">
          <div className="table-responsive">
            <table className="chapters-table">
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Иконка</th>
                  <th>Категория</th>
                  <th>Описание</th>
                  <th>Дата создания</th>
                  <th>Дата обновления</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {chapterList
                  .slice(
                    itemPerPage * (currentPage - 1),
                    itemPerPage * (currentPage - 1) + itemPerPage
                  )
                  .map((chapter, idx) => (
                    <tr key={chapter._id} className="chapter-row">
                      <td className="chapter-title">
                        <strong>{chapter.title}</strong>
                      </td>
                      <td className="chapter-icon">
                        <div className="icon-container">
                          <div
                            className="icon-wrapper"
                            onClick={() =>
                              document
                                .getElementById(`chapter-img-${chapter._id}`)
                                .click()
                            }
                            title="Изменить иконку"
                          >
                            <img
                              src={
                                process.env.REACT_APP_API_URL +
                                "/" +
                                chapter.icon
                              }
                              className="chapter-image"
                              alt="chapter icon"
                            />
                            <div className="icon-overlay">
                              <i className="fas fa-camera" />
                            </div>
                          </div>
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            id={`chapter-img-${chapter._id}`}
                            style={{ display: "none" }}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) =>
                              handleChapterIconChange(e, chapter)
                            }
                          />
                          <small className="icon-hint">
                            Нажмите для изменения
                          </small>
                        </div>
                      </td>
                      <td className="chapter-category">
                        <span className="category-badge">
                          {chapter.category}
                        </span>
                      </td>
                      <td className="chapter-description">
                        <div className="description-text">
                          {chapter.description}
                        </div>
                      </td>
                      <td className="chapter-date">
                        {new Date(chapter.created_at).toLocaleDateString()}
                      </td>
                      <td className="chapter-date">
                        {new Date(chapter.updated_at).toLocaleDateString()}
                      </td>
                      <td className="chapter-actions">
                        <div className="action-buttons">
                          <NavLink
                            to={"/trainer/designchapter/" + chapter._id}
                            className="action-btn edit-btn"
                            title="Редактировать главу"
                          >
                            <i className="fas fa-edit" />
                          </NavLink>
                          <button
                            className="action-btn delete-btn"
                            onClick={(e) => deleteChapter(chapter._id)}
                            title="Удалить главу"
                          >
                            <i className="fas fa-trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Пагинация */}
        {chapterList.length > 0 && (
          <div className="pagination-container">
            <nav className="pagination-nav">
              <ul className="pagination">
                {Math.ceil(chapterList.length / itemPerPage) > 1 &&
                  currentPage > 1 && (
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        <i className="fas fa-chevron-left" />
                        Предыдущая
                      </button>
                    </li>
                  )}

                {Array(Math.ceil(chapterList.length / itemPerPage))
                  .fill(1)
                  .map((item, index) => (
                    <li
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                      key={index}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}

                {Math.ceil(chapterList.length / itemPerPage) > 1 &&
                  currentPage < Math.ceil(chapterList.length / itemPerPage) && (
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Следующая
                        <i className="fas fa-chevron-right" />
                      </button>
                    </li>
                  )}
              </ul>
            </nav>
          </div>
        )}

        {/* Пустое состояние */}
        {chapterList.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <i className="fas fa-book-open" />
            </div>
            <h3>Главы не найдены</h3>
            <p>Создайте первую главу, чтобы начать работу</p>
            <button
              className="btn btn-primary"
              data-mdb-toggle="modal"
              data-mdb-target="#staticBackdrop1"
            >
              <i className="fas fa-plus me-2" />
              Создать главу
            </button>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const [selImage, setSelImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [pendingSubmit, setPendingSubmit] = useState(false);

  const [currentTrainer] = useState(
    JSON.parse(sessionStorage.getItem("trainer"))
  );

  const managechapterForm = useFormik({
    initialValues: {
      trainer: currentTrainer._id,
      title: "",
      description: "",
      category: app_config.courseCategories[0],
      icon: "",
      created_at: new Date(),
      updated_at: new Date(),
    },

    validate: (values) => {
      const errors = {};

      // Валидация названия
      if (!values.title.trim()) {
        errors.title = "Название главы обязательно для заполнения";
      } else if (values.title.trim().length < 3) {
        errors.title = "Название должно содержать минимум 3 символа";
      } else if (values.title.trim().length > 100) {
        errors.title = "Название не должно превышать 100 символов";
      }

      // Валидация описания
      if (!values.description.trim()) {
        errors.description = "Описание главы обязательно для заполнения";
      } else if (values.description.trim().length < 10) {
        errors.description = "Описание должно содержать минимум 10 символов";
      } else if (values.description.trim().length > 500) {
        errors.description = "Описание не должно превышать 500 символов";
      }

      // Валидация категории
      if (!values.category) {
        errors.category = "Выберите категорию";
      }

      // Валидация изображения - обязательное поле
      if (!selImage) {
        errors.image = "Изображение обязательно для загрузки";
      } else if (imageError) {
        errors.image = imageError;
      }

      return errors;
    },

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // Дополнительная проверка изображения при отправке
      if (!selImage) {
        setImageError("Пожалуйста, выберите изображение для главы.");
        setPendingSubmit(true);
        setSubmitting(false);

        // Показываем модальное окно с ошибкой
        Swal.fire({
          icon: "error",
          title: "Ошибка!",
          text: "Изображение обязательно для создания главы",
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
        return;
      }

      setImageError("");
      setPendingSubmit(false);
      values.icon = selImage.name;

      const res = await fetch("http://localhost:5000/chapter/add", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        fetchUserData();
        Swal.fire({
          icon: "success",
          title: "Глава успешно создана",
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
        resetForm();
        setSelImage(null);
        setTimeout(() => {
          const modal = window.document.getElementById("staticBackdrop1");
          if (modal) {
            if (window.mdb && window.mdb.Modal) {
              const modalInstance = window.mdb.Modal.getInstance(modal);
              if (modalInstance) modalInstance.hide();
            } else if (window.bootstrap && window.bootstrap.Modal) {
              const modalInstance = window.bootstrap.Modal.getInstance(modal);
              if (modalInstance) modalInstance.hide();
            } else {
              modal.classList.remove("show");
              modal.style.display = "none";
              document.body.classList.remove("modal-open");
              const backdrops =
                document.getElementsByClassName("modal-backdrop");
              while (backdrops[0])
                backdrops[0].parentNode.removeChild(backdrops[0]);
            }
          }
        }, 300);
      } else {
        Swal.fire({
          icon: "error",
          title: "Ошибка!",
          text: "Что-то пошло не так!",
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
    },
  });

  React.useEffect(() => {
    if (pendingSubmit && selImage) {
      setTimeout(() => {
        managechapterForm.handleSubmit();
      }, 0);
    }
  }, [selImage, pendingSubmit, managechapterForm]);

  const uploadFile = (e) => {
    const file = e.target.files[0];

    // Очищаем предыдущие ошибки
    setImageError("");

    if (!file) {
      setImageError("Пожалуйста, выберите файл");
      return;
    }

    // Проверка типа файла
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setImageError("Поддерживаются только файлы: JPG, JPEG, PNG, WEBP");
      return;
    }

    // Проверка размера файла (максимум 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB в байтах
    if (file.size > maxSize) {
      setImageError("Размер файла не должен превышать 5MB");
      return;
    }

    // Проверка минимального размера файла (минимум 10KB)
    const minSize = 10 * 1024; // 10KB в байтах
    if (file.size < minSize) {
      setImageError("Размер файла слишком маленький. Минимум 10KB");
      return;
    }

    // Проверка имени файла
    const fileName = file.name.toLowerCase();
    if (fileName.includes(" ") || fileName.includes("_")) {
      setImageError("Имя файла не должно содержать пробелы или подчеркивания");
      return;
    }

    // Проверка расширения файла
    const fileExtension = fileName.split(".").pop();
    const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
    if (!allowedExtensions.includes(fileExtension)) {
      setImageError("Неподдерживаемое расширение файла");
      return;
    }

    // Дополнительная проверка через создание изображения
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      // Проверка размеров изображения
      if (img.width < 100 || img.height < 100) {
        setImageError("Минимальный размер изображения: 100x100 пикселей");
        return;
      }

      if (img.width > 2000 || img.height > 2000) {
        setImageError("Максимальный размер изображения: 2000x2000 пикселей");
        return;
      }

      // Проверка соотношения сторон (не слишком узкое или широкое)
      const aspectRatio = img.width / img.height;
      if (aspectRatio < 0.5 || aspectRatio > 2) {
        setImageError("Соотношение сторон должно быть между 1:2 и 2:1");
        return;
      }

      // Если все проверки пройдены, загружаем файл
      setSelImage(file);
      const fd = new FormData();
      fd.append("myfile", file);

      fetch(`${process.env.REACT_APP_API_URL}/util/uploadfile`, {
        method: "POST",
        body: fd,
      })
        .then((res) => {
          if (res.status === 200) {
            // Успешная загрузка
            console.log("Файл успешно загружен");
          } else {
            setImageError("Ошибка при загрузке файла на сервер");
          }
        })
        .catch((error) => {
          setImageError("Ошибка сети при загрузке файла");
          console.error("Upload error:", error);
        });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      setImageError("Невозможно прочитать файл как изображение");
    };

    img.src = url;
  };

  const handleChapterIconChange = async (e, chapter) => {
    const file = e.target.files[0];
    if (!file) return;

    // Валидация файла
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Ошибка!",
        text: "Поддерживаются только файлы: JPG, JPEG, PNG, WEBP",
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
      return;
    }

    // Проверка размера файла (максимум 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      Swal.fire({
        icon: "error",
        title: "Ошибка!",
        text: "Размер файла не должен превышать 5MB",
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
      return;
    }

    // Проверка имени файла
    const fileName = file.name.toLowerCase();
    if (fileName.includes(" ") || fileName.includes("_")) {
      Swal.fire({
        icon: "error",
        title: "Ошибка!",
        text: "Имя файла не должно содержать пробелы или подчеркивания",
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
      return;
    }

    // Проверка изображения через создание объекта Image
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      // Проверка размеров изображения
      if (img.width < 100 || img.height < 100) {
        Swal.fire({
          icon: "error",
          title: "Ошибка!",
          text: "Минимальный размер изображения: 100x100 пикселей",
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
        return;
      }

      if (img.width > 2000 || img.height > 2000) {
        Swal.fire({
          icon: "error",
          title: "Ошибка!",
          text: "Максимальный размер изображения: 2000x2000 пикселей",
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
        return;
      }

      // Проверка соотношения сторон
      const aspectRatio = img.width / img.height;
      if (aspectRatio < 0.5 || aspectRatio > 2) {
        Swal.fire({
          icon: "error",
          title: "Ошибка!",
          text: "Соотношение сторон должно быть между 1:2 и 2:1",
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
        return;
      }

      // Если все проверки пройдены, загружаем файл
      uploadChapterIcon(file, chapter);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      Swal.fire({
        icon: "error",
        title: "Ошибка!",
        text: "Невозможно прочитать файл как изображение",
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
    };

    img.src = url;
  };

  const uploadChapterIcon = async (file, chapter) => {
    const fd = new FormData();
    fd.append("myfile", file);

    try {
      const uploadRes = await fetch(
        `${process.env.REACT_APP_API_URL}/util/uploadfile`,
        {
          method: "POST",
          body: fd,
        }
      );

      if (uploadRes.status === 200) {
        const updateRes = await fetch(
          `${process.env.REACT_APP_API_URL}/chapter/update/${chapter._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...chapter,
              icon: file.name,
              updated_at: new Date(),
            }),
          }
        );

        if (updateRes.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Иконка обновлена!",
            timer: 1200,
            showConfirmButton: false,
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
          fetchUserData();
        } else {
          Swal.fire({
            icon: "error",
            title: "Ошибка при обновлении главы",
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
      } else {
        Swal.fire({
          icon: "error",
          title: "Ошибка загрузки файла",
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
      console.error("Upload error:", error);
      Swal.fire({
        icon: "error",
        title: "Ошибка сети",
        text: "Проверьте подключение к интернету",
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
  };

  return (
    <>
      {/* Минималистичный хедер без фона */}
      <div className="simple-header">
        <div className="container">
          <div className="header-text">
            <h1 className="header-title">
              <i className="fas fa-book-open me-3" />
              Управление главами
            </h1>
            <p className="header-subtitle">
              Создавайте, редактируйте и управляйте главами ваших курсов
            </p>
          </div>
        </div>
      </div>

      <section className="main-content">
        <div className="container py-5">{displayChapters()}</div>
      </section>

      {/* Современные стили */}
      <style>{`
        .simple-header {
          background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
          padding: 60px 0 40px;
          border-bottom: 1px solid #e9ecef;
        }

        .header-text {
          text-align: center;
        }

        .header-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: white;
        }

        .header-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0;
        }

        .main-content {
          background: #f8f9fa;
          min-height: calc(100vh - 200px);
        }

        .manage-chapters-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .chapters-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem 0;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .search-section {
          flex: 1;
        }

        .search-wrapper {
          position: relative;
          max-width: 400px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #6c757d;
          z-index: 2;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          border: none;
          border-radius: 50px;
          background: white;
          font-size: 1rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }

        .action-section {
          display: flex;
          gap: 1rem;
        }

        .add-chapter-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50px;
          color: white;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .add-chapter-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
          color: white;
        }

        .modern-modal .modal-content {
          border: none;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        }

        .modern-modal .modal-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 3px 3px 0 0;
          border: none;
        }

        .chapter-form {
          padding: 1rem 0;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          font-weight: 600;
          color: #495057;
          margin-bottom: 0.5rem;
        }

        .modern-input,
        .modern-textarea {
          border: 2px solid #e9ecef;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .modern-input:focus,
        .modern-textarea:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
          outline: none;
        }

        .error-input {
          border-color: #dc3545 !important;
          box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
        }

        .error-input:focus {
          border-color: #dc3545 !important;
          box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
        }

        .file-upload-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          padding: 1rem;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .file-upload-wrapper.error-state {
          border-color: #dc3545;
          background-color: rgba(220, 53, 69, 0.05);
          box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
        }

        .file-upload-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .file-upload-btn:hover {
          background: #5a6fd8;
          transform: translateY(-2px);
        }

        .file-info {
          flex: 1;
        }

        .file-selected {
          color: #28a745;
          font-weight: 600;
        }

        .file-placeholder {
          color: #6c757d;
          font-style: italic;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #dc3545;
          font-weight: 600;
          margin-top: 0.5rem;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid #e9ecef;
        }

        .submit-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 8px;
          padding: 0.75rem 2rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .submit-btn.disabled {
          background: #6c757d !important;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .submit-btn.disabled:hover {
          transform: none;
          box-shadow: none;
        }

        .chapters-table-container {
          padding: 2rem;
        }

        .chapters-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 8px;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .chapters-table thead {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .chapters-table th {
          padding: 1.5rem 1rem;
          font-weight: 600;
          text-align: left;
          border: none;
        }

        .chapters-table tbody tr {
          transition: all 0.3s ease;
          border-bottom: 3px solid #d1d5db;
          background: #f8fafc;
        }

        .chapters-table tbody tr:hover {
          background: #e2e8f0;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-bottom: 3px solid #667eea;
        }

        .chapters-table tbody tr:nth-child(even) {
          background: #f1f5f9;
        }

        .chapters-table tbody tr:nth-child(even):hover {
          background: #cbd5e1;
        }

        .chapters-table td {
          padding: 1.5rem 1rem;
          vertical-align: middle;
          border: none;
          border-right: 2px solid #d1d5db;
        }

        .chapters-table td:last-child {
          border-right: none;
        }

        .chapter-title {
          font-weight: 600;
          color: #2c3e50;
        }

        .icon-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .icon-wrapper {
          position: relative;
          cursor: pointer;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .icon-wrapper:hover {
          transform: scale(1.05);
        }

        .chapter-image {
          width: 80px;
          height: 60px;
          object-fit: cover;
          border-radius: 8px;
          display: block;
        }

        .icon-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .icon-wrapper:hover .icon-overlay {
          opacity: 1;
        }

        .icon-hint {
          color: #6c757d;
          font-size: 0.8rem;
          text-align: center;
        }

        .category-badge {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .description-text {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #6c757d;
        }

        .chapter-date {
          color: #6c757d;
          font-size: 0.9rem;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .edit-btn {
          background: #28a745;
          color: white;
        }

        .edit-btn:hover {
          background: #218838;
          transform: translateY(-2px);
          color: white;
        }

        .delete-btn {
          background: #dc3545;
          color: white;
        }

        .delete-btn:hover {
          background: #c82333;
          transform: translateY(-2px);
        }

        .pagination-container {
          display: flex;
          justify-content: center;
          padding: 2rem;
          background: white;
          border-top: 1px solid #e9ecef;
        }

        .pagination-nav {
          display: flex;
          align-items: center;
        }

        .pagination {
          display: flex;
          gap: 0.5rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .page-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          background: white;
          color: #495057;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .page-link:hover {
          border-color: #667eea;
          color: #667eea;
          transform: translateY(-2px);
        }

        .page-item.active .page-link {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: #667eea;
          color: white;
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: #6c757d;
        }

        .empty-icon {
          font-size: 4rem;
          color: #dee2e6;
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          color: #495057;
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 1rem;
          }

          .search-wrapper {
            max-width: 100%;
          }

          .chapters-table-container {
            padding: 1rem;
          }

          .chapters-table {
            font-size: 0.9rem;
          }

          .chapters-table th,
          .chapters-table td {
            padding: 1rem 0.5rem;
          }

          .description-text {
            max-width: 150px;
          }

          .action-buttons {
            flex-direction: column;
            gap: 0.25rem;
          }

          .action-btn {
            width: 35px;
            height: 35px;
          }
        }
      `}</style>
    </>
  );
};

export default ManageChapter;
