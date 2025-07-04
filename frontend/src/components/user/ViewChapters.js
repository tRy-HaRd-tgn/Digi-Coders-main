import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import app_config from "../../config";

const BrowseChapters = () => {

  const { chaptername } = useParams();

  const [chapterList, setChapterList] = useState([]);
  const [masterList, setMasterList] = useState([]);
  const [selCategory, setSelCategory] = useState([]);
  const [selTrainer, setSelTrainer] = useState([]);

  const maxElements = 3;

  const [currentPage, setCurrentPage] = useState(1);

  const trainerList = [
    "Prince Prajapati",
    "Mohit Mishra",
    "Rishabh Agnihotri"
  ];

  const categoryList = ["HTML", "JavaScript", "Python"];

  const sortChaptersAtoZ = () => {
    const sortedArray = [...chapterList].sort((a, b) => a.title.localeCompare(b.title));
    console.log(sortedArray);
    setChapterList(sortedArray);
  };
  
  const sortChaptersZtoA = () => {
    const sortedArray = [...chapterList].sort((a, b) => b.title.localeCompare(a.title));
    console.log(sortedArray);
    setChapterList(sortedArray);
  };

  const fetchUserData = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/chapter/getall`);
    console.log(res.status);
    const data = await res.json();
    console.log(data);
    if (chaptername) {
      setChapterList(data.filter((chapter) => chapter.title.toLowerCase() === chaptername.toLowerCase()));
    } else {
      setChapterList(data);
    }
    setMasterList(data);
  };

  const displayChapters = () => {
    return chapterList
      .slice(
        maxElements * (currentPage - 1),
        maxElements * (currentPage - 1) + maxElements
        // currentPage * maxElements,
        // currentPage * maxElements + maxElements
      )
      .map((chapter) => (
        <div className="card shadow-4-strong border rounded-7 my-5">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                <div
                  class="bg-image hover-overlay ripple shadow-4-strong rounded-7"
                  data-mdb-ripple-color="light" style={{ width: "320px", height: "175px", backgroundSize: "cover", backgroundColor: "#e0e0e0" }}
                >
                  <img
                    src={process.env.REACT_APP_API_URL + "/" + chapter.icon}
                    className="img-fluid"
                    alt=""
                  />
                  <a href="#!">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                    />
                  </a>
                </div>
              </div>
              <div className="content card-tittle col-md-9 col-lg-9 col-xl-9">
                <h4 className="card-tittle my-2 mx-5">
                  <strong>{chapter.title}</strong>
                </h4>
                <h5 className="mb-3 mx-5 text-uppercase text-danger">
                  <strong>{chapter.category}</strong>
                </h5>
                <p className=" mb-3 mx-5 text-truncate">
                  {chapter.description}
                </p>
                <div className="d-flex justify-content-end mx-5">
                  <NavLink
                    className="btn btn-primary"
                    to={"/user/chapterdetails/" + chapter._id}
                  >
                    Continue &nbsp;
                    <i className="fas fa-arrow-right-to-bracket" />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      ));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const searchChapterByName = (e) => {
    const val = e.target.value;
    setChapterList(
      masterList.filter((chapter) => (chapter.title.toLowerCase().includes(val.toLowerCase())))
    )
  }
  const searchChapterByTrainer = (e) => {
    const val = e.target.value;
    setChapterList(
      masterList.filter((chapter) => (chapter.trainer.name.toLowerCase().includes(val.toLowerCase())))
    )
  }
  const searchChapterByCategory = (e) => {
    const val = e.target.value;
    setChapterList(
      masterList.filter((chapter) => (chapter.category.toLowerCase().includes(val.toLowerCase())))
    )
  }

  return (
    <div>
      {/*Page Header*/}
      <header className=''>
        {/* Background image */}
        <div
          id="intro"
          className="bg-image"
          style={{
            backgroundImage: "url(/images/background-img3.webp)",
            height: 230,
            backgroundSize: "cover",
            backgroundPosition: "50% 65%",
            position: "relative"
          }}
        >
          <div
            className="mask text-white"
            style={{ backgroundColor: "rgba(35, 37, 45, 0.6)" }}
          >
            <div className="container d-flex align-items-center justify-content-center text-center h-100">
              <div className='page-heading'>
                <h1 className="fw-bold mb-4">Digi Coders</h1>
                {/* <p className='paragraph'>
                  "DigiCoders is a platform for students to learn and explore new
                  technologies. We provide a wide range of courses for students to
                  choose from. We have courses for beginner students."
                </p> */}
                <div className="input-group d-flex align-items-center justify-content-center">
                  <div className="form-group has-icon">
                    <i className="fas fa-magnifying-glass fa-lg form-control-icon" />
                    <input
                      type="search"
                      id="search"
                      name="search"
                      className="form-control form-control-lg"
                      placeholder="Search"
                      onChange={searchChapterByName}
                      style={{ backgroundColor: "#f4f4f4", paddingRight: "10px", width: "800px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Background image */}
      </header>
      {/*Page Header*/}


      <section className="" style={{ backgroundColor: "rgb(174, 223, 243)" }}>
        <div className="container py-1 px-5">
          <div className="my-4">
            <div className="card-body text-white">
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-6 col-lg-4 col-xl-4 border-sm-end-none border-end">
                  <div className="d-flex flex-row justify-content-center align-items-center mb-1">

                    {/* <select onChange={searchChapterByCategory}>
                      {
                        categoryList.map((category) => (
                          <option value={category}>{category}</option>
                        ))
                      }
                    </select> */}

                    <div class="select">
                      <select class="mySelectArrow" onChange={searchChapterByCategory}>
                        <option value="">By Category</option>
                        {
                          categoryList.map((category) => (
                            <option value={category}>{category}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4 col-xl-4 border-sm-end-none border-end">
                  <div className="d-flex flex-row justify-content-center align-items-center mb-1">

                    {/* <div className="dropdown mx-2">
                      <select onChange={searchChapterByName} className="select form-control-lg" style={{ border: "3px solid #29c1fe" }}>
                        {
                          trainerList.map((trainer) => (
                            <option value={trainer}>{trainer}</option>
                          ))
                        }
                      </select>
                    </div> */}

                    {/* <select className="select" onChange={searchChapterByName}>
                      {
                        trainerList.map((trainer) => (
                          <option value={trainer}>{trainer}</option>
                        ))
                      }
                    </select> */}

                    <div class="select">
                      <select class="mySelectArrow" onChange={searchChapterByName}>
                        <option value="">By Name</option>
                        {
                          trainerList.map((trainer) => (
                            <option value={trainer}>{trainer}</option>
                          ))
                        }
                      </select>
                    </div>

                  </div>
                </div>



                <div className="col-md-6 col-lg-4 col-xl-4">
                  <div className="d-flex flex-row justify-content-center align-items-center mb-1">
                    {/* <div className="dropdown mx-2">
                      <select className="select form-control-lg" style={{ border: "3px solid #29c1fe" }}>
                        <option value="" >A to Z</option>
                      </select>

                    </div> */}

                    {/* <select className="select">
                      <option value=" ">A to Z</option>
                    </select> */}

                    <div class="select">
                      <select class="mySelectArrow" onChange={e => {
                        if (e.target.value === "A to Z") {
                          sortChaptersAtoZ();
                        } else if (e.target.value === "Z to A") {
                          sortChaptersZtoA();
                        }
                      }}>
                        <option value="">By Sort</option>
                        <option value="A to Z">A To Z</option>
                        <option value="Z to A">Z to A</option>
                      </select>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>



      <section>
        <div className="container">{displayChapters()}</div>
      </section>

      <div className="container my-4" style={{ backgroundColor: "#fff" }}>
        {/*Section: Content*/}
        <section className="d-md-flex justify-content-center">
          <nav aria-label="...">
            <ul className="pagination">
              <li className="page-item">
                <a
                  className="page-link border"
                  type="button"
                  onClick={(e) => setCurrentPage(currentPage - 1)}
                >
                  <i className="fas fa-angles-left" /> Previous
                </a>
              </li>
              {Array(Math.ceil(chapterList.length / maxElements))
                .fill(1)
                .map((item, index) => (
                  <li
                    className={`page-item ${currentPage === index + 1 ? "active" : ""
                      }`}
                    aria-current="page"
                  >
                    <a
                      className="page-link border mx-2"
                      type="button"
                      onClick={(e) => setCurrentPage(index + 1)}
                    >
                      {index + 1} <span className="visually-hidden">(current)</span>
                    </a>
                  </li>
                ))}
              {Math.ceil(chapterList.length / maxElements) - currentPage >
                0 && (
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
        {/*Section: Content*/}
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

    </div >
  );
};

export default BrowseChapters;