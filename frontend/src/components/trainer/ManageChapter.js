import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import app_config from "../../config";
import { NavLink, useParams } from "react-router-dom";

const ManageChapter = () => {
  const { chaptername } = useParams();

  const itemPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [masterList, setMasterList] = useState([]);
  const [chapterList, setChapterList] = useState([]);

  const fetchUserData = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/chapter/getall`);
    console.log(res.status);
    const data = await res.json();
    console.log(data);
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
  };

  const deleteChapter = async (id) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/chapter/delete/` + id,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    console.log(data);
    if (data) {
      Swal.fire({
        title: "Chapter Deleted Successfully",
        icon: "success",
        timer: 2000,
      });
      fetchUserData();
    } else {
      Swal.fire({
        title: "Chapter Deletion Failed",
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
      <div>
        <section className="" style={{ backgroundColor: "#aedff3" }}>
          <div className="container">
            <div className="">
              <div className="card-body text-white">
                <div className="row align-items-center py-4">
                  <div className="col-md-6 px-5">
                    <div className="input-group">
                      <div className="form-group has-icon">
                        <i className="fas fa-magnifying-glass fa-lg form-control-icon" />
                        <input
                          type="search"
                          id="search"
                          name="search"
                          className="form-control form-control-lg"
                          placeholder="Search"
                          onChange={searchChapterByName}
                          style={{ paddingRight: "10px", width: "350px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 px-5">
                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-primary btn-rounded"
                        data-mdb-toggle="modal"
                        data-mdb-target="#staticBackdrop1"
                      >
                        <i className="fas fa-plus me-2" />
                        Add New Chapters
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div
          className="modal fade"
          id="staticBackdrop1"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel1">
                  Create New Chapter
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-mdb-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body p-4">
                <form
                  className="text-center"
                  action="#!"
                  onSubmit={managechapterForm.handleSubmit}
                >
                  {/* Name */}
                  <input
                    type="text"
                    id="title"
                    className="form-control mb-4"
                    placeholder="Title"
                    value={managechapterForm.values.title}
                    onChange={managechapterForm.handleChange}
                  />
                  <select
                    type="text"
                    id="category"
                    className="form-control mb-4"
                    placeholder="Category"
                    value={managechapterForm.values.category}
                    onChange={managechapterForm.handleChange}
                  >
                    {app_config.courseCategories.map((category) => (
                      <option value={category}>{category}</option>
                    ))}
                  </select>

                  <div className="form-group">
                    <textarea
                      className="form-control rounded-0 mb-4"
                      id="description"
                      rows={3}
                      placeholder="Description.."
                      defaultValue={""}
                      value={managechapterForm.values.description}
                      onChange={managechapterForm.handleChange}
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mx-1 mb-4">
                    <label htmlFor="chapter-img" className="btn btn-primary">
                      {" "}
                      <i class="fas fa-upload"></i> Upload Image
                    </label>
                    <span className="text-warning mx-3">
                      {selImage ? selImage.name : "No Image Selected"}
                    </span>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      id="chapter-img"
                      hidden
                      onChange={uploadFile}
                    />
                  </div>
                  {imageError && (
                    <div
                      className="text-danger mb-2"
                      style={{ fontWeight: 500 }}
                    >
                      {imageError}
                    </div>
                  )}

                  <button
                    className="btn btn-primary btn-block mt-5"
                    type="submit"
                    style={{ marginLeft: "0px" }}
                  >
                    SUBMIT
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <table
          id="dtBasicExample"
          class="table table-striped table-bordered table-sm table-info border-light text-center"
          cellspacing="0"
          width="100%"
        >
          <thead className="table-dark border-light text-center">
            <tr>
              <th class="th-sm">Title</th>
              <th class="th-sm">Icon</th>
              <th class="th-sm">Category</th>
              <th class="th-sm">Description</th>
              <th class="th-sm">Created_at</th>
              <th class="th-sm">Updated_at</th>
              <th class="th-sm" colSpan={2}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {chapterList
              .slice(
                itemPerPage * (currentPage - 1),
                itemPerPage * (currentPage - 1) + itemPerPage
              )
              .map((chapter, idx) => (
                <tr key={chapter._id}>
                  <td className="align-middle">{chapter.title}</td>
                  <td className="align-middle">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        className="bg-image hover-overlay ripple shadow-4-strong rounded-7 mx-2 my-2"
                        data-mdb-ripple-color="light"
                        style={{
                          display: "inline-block",
                          backgroundColor: "#e0e0e0",
                          cursor: "pointer",
                          position: "relative",
                        }}
                        onClick={() =>
                          document
                            .getElementById(`chapter-img-${chapter._id}`)
                            .click()
                        }
                        title="Изменить иконку"
                      >
                        <img
                          src={
                            process.env.REACT_APP_API_URL + "/" + chapter.icon
                          }
                          className="img-fluid"
                          style={{
                            objectFit: "contain",
                            width: "auto",
                            height: "auto",
                            maxWidth: "200px",
                            maxHeight: "150px",
                            borderRadius: "16px",
                            display: "block",
                          }}
                          alt="chapter icon"
                        />
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          id={`chapter-img-${chapter._id}`}
                          style={{ display: "none" }}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handleChapterIconChange(e, chapter)}
                        />
                      </div>
                      <span
                        style={{
                          marginTop: 8,
                          color: "#176b8a",
                          fontWeight: 500,
                          fontSize: 13,
                          maxWidth: 120,
                          whiteSpace: "normal",
                          lineHeight: 1.2,
                          textAlign: "center",
                        }}
                      >
                        Для изменения нажмите на фото
                      </span>
                    </div>
                  </td>
                  <td className="align-middle">{chapter.category}</td>
                  <td className="align-middle">{chapter.description}</td>
                  <td className="align-middle">
                    {new Date(chapter.created_at).toLocaleDateString()}
                  </td>
                  <td className="align-middle">
                    {new Date(chapter.updated_at).toLocaleDateString()}
                  </td>
                  <td className="align-middle">
                    <NavLink to={"/trainer/designchapter/" + chapter._id}>
                      <i
                        className="fas fa-pen-to-square fa-lg mx-2"
                        style={{ color: "#000fff" }}
                      />
                    </NavLink>
                  </td>
                  <td className="align-middle">
                    <button
                      className=""
                      onClick={(e) => deleteChapter(chapter._id)}
                      style={{ border: "none", background: "none" }}
                    >
                      <i
                        className="fas fa-trash-can fa-lg mx-2"
                        style={{ color: "#ff0000" }}
                      />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="container" style={{ backgroundColor: "#fff" }}>
          {/*Section: Content*/}
          <section className="d-md-flex justify-content-end">
            <nav aria-label="...">
              <ul className="pagination mt-3">
                {/* Кнопка Previous */}
                {Math.ceil(chapterList.length / itemPerPage) > 1 &&
                  currentPage > 1 && (
                    <li className="page-item me-2">
                      <a
                        className="page-link border"
                        type="button"
                        onClick={(e) => setCurrentPage(currentPage - 1)}
                      >
                        <i className="fas fa-angles-left" /> Previous
                      </a>
                    </li>
                  )}
                {/* Номера страниц */}
                {Array(Math.ceil(chapterList.length / itemPerPage))
                  .fill(1)
                  .map((item, index) => (
                    <li
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : " "
                      }`}
                      aria-current="page"
                      key={index}
                    >
                      <a
                        className="page-link border me-2"
                        type="button"
                        onClick={(e) => setCurrentPage(index + 1)}
                      >
                        {index + 1}{" "}
                        <span className="visually-hidden">(current)</span>
                      </a>
                    </li>
                  ))}
                {/* Кнопка Next */}
                {Math.ceil(chapterList.length / itemPerPage) > 1 &&
                  currentPage < Math.ceil(chapterList.length / itemPerPage) && (
                    <li className="page-item">
                      <a
                        className="page-link border"
                        type="button"
                        onClick={(e) => setCurrentPage(currentPage + 1)}
                      >
                        Next <i className="fas fa-angles-right" />
                      </a>
                    </li>
                  )}
              </ul>
            </nav>
          </section>
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const [selImage, setSelImage] = useState(null);
  const [imageError, setImageError] = useState("");

  const [currentTrainer, setCurrentTrainer] = useState(
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

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (!selImage) {
        setImageError("Пожалуйста, выберите изображение для главы.");
        setSubmitting(false);
        return;
      }
      setImageError("");
      values.icon = selImage.name;
      console.log(values);

      const res = await fetch("http://localhost:5000/chapter/add", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res.status);

      if (res.status === 200) {
        fetchUserData();
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        resetForm();
        setSelImage(null);
        // Закрыть модалку программно
        setTimeout(() => {
          const modal = window.document.getElementById("staticBackdrop1");
          if (modal) {
            // Для MDB/Bootstrap 5
            if (window.mdb && window.mdb.Modal) {
              const modalInstance = window.mdb.Modal.getInstance(modal);
              if (modalInstance) modalInstance.hide();
            } else if (window.bootstrap && window.bootstrap.Modal) {
              const modalInstance = window.bootstrap.Modal.getInstance(modal);
              if (modalInstance) modalInstance.hide();
            } else {
              // Fallback: вручную убираем классы
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
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    },
  });

  const uploadFile = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    setSelImage(file);
    fd.append("myfile", file);
    fetch(`${process.env.REACT_APP_API_URL}/util/uploadfile`, {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        console.log("file uploaded");
      }
    });
  };

  // Добавить функцию для смены иконки главы
  const handleChapterIconChange = async (e, chapter) => {
    const file = e.target.files[0];
    if (!file) return;
    // Загрузка файла
    const fd = new FormData();
    fd.append("myfile", file);
    const uploadRes = await fetch(
      `${process.env.REACT_APP_API_URL}/util/uploadfile`,
      {
        method: "POST",
        body: fd,
      }
    );
    if (uploadRes.status === 200) {
      // Обновление главы с новым именем файла
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
        });
        fetchUserData();
      } else {
        Swal.fire({
          icon: "error",
          title: "Ошибка при обновлении главы",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Ошибка загрузки файла",
      });
    }
  };

  return (
    <>
      <div
        className="about-section"
        style={{
          backgroundImage: "url(/images/background-img3.webp)",
          position: "relative",
        }}
      >
        {/* Блюр-оверлей */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            filter: "blur(4px)",
            backgroundImage: "inherit",
            backgroundSize: "cover",
            backgroundPosition: "50% 65%",
          }}
        />
        {/* Затемнение overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(30, 40, 60, 0.7)", // было 0.55, стало 0.7
            zIndex: 2,
          }}
        />
        <div
          className="about-content"
          style={{ position: "relative", zIndex: 3 }}
        >
          <h1 className="about-title">MANAGE CHAPTERS</h1>
        </div>
      </div>

      <section>
        <div className="container py-5">{displayChapters()}</div>
      </section>
    </>
  );
};

export default ManageChapter;
