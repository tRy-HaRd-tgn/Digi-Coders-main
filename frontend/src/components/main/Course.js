import React from 'react'
import { NavLink } from 'react-router-dom'

const Course = () => {
    return (
        <div>
            <>
                {/*Page Header*/}
                <header className='mb-10'>
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
                            <div className="container d-flex align-items-center text-center h-100">
                                <div className='page-heading'>
                                    <h1 className="fw-bold mb-3">Our Courses</h1>
                                    <p className='paragraph'>
                                        "Give Your Child the Gift of Coding with Our Exciting and
                                        Engaging Courses! Our Curriculum is Designed to Help Kids
                                        Develop Strong Problem-Solving and Logical Reasoning Skills,
                                        While Building a Foundation for a Lifetime of Learning."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Background image */}
                </header>
                {/*Page Header*/}
            </>

            {/* Our Course*/}
            <div className='mb-8'>
                <div data-draggable="true">
                    {/**/}
                    {/**/}
                    <section draggable="false" className="container" data-v-271253ee="">
                        <section>
                            <div className="row text-center gx-lg-5 mb-6">
                                {/* First column */}
                                <div className="col-lg-4 col-md-12 mb-lg-0 hover-zoom">
                                    <div className="card">
                                        <div
                                            class="mt-n3 bg-image hover-overlay ripple mx-3 shadow-4-strong rounded-6"
                                            data-mdb-ripple-color="light"
                                        >
                                            <img
                                                src="/images/course-html.jpg"
                                                className="img-fluid"
                                            />
                                            <NavLink to="/user/viewchapters">
                                                <div
                                                    className="mask"
                                                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                                />
                                            </NavLink>
                                        </div>
                                        <div className="card-body">
                                            <h4 className="card-tittle my-3" style={{ backgroundColor: "#f1f1f1", fontSize: "32px", letterSpacing: "1px" }}>
                                                <strong>HTML</strong>
                                            </h4>
                                            <h5 className="mb-3">
                                                <strong>20 Classes</strong>
                                            </h5>
                                            <h6 className="mb-3">
                                                Duration : <strong>2 Months</strong>
                                            </h6>
                                            {/* Divider here */}
                                            <hr class="hr hr-blurry" />

                                            <p className="card-text">
                                                An ideal course to help kids quickly grasp the basics of html programming and start writing code using blocks.
                                            </p>
                                            <NavLink to="/user/viewchapters" className="btn btn-primary my-3">
                                                Learn More
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                                {/* First column */}
                                {/* Second column */}
                                <div className="col-lg-4 col-md-12 mb-lg-0 hover-zoom">
                                    <div className="card">
                                        <div
                                            class="mt-n3 bg-image hover-overlay ripple mx-3 shadow-4-strong rounded-6"
                                            data-mdb-ripple-color="light"
                                        >
                                            <img
                                                src="/images/course-js.jpg"
                                                className="img-fluid"
                                            />
                                            <NavLink to="/user/viewchapters">
                                                <div
                                                    className="mask"
                                                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                                />
                                            </NavLink>
                                        </div>
                                        <div className="card-body">
                                            <h4 className="card-tittle my-3" style={{ backgroundColor: "#f1f1f1", fontSize: "32px", letterSpacing: "1px" }}>
                                                <strong>JavaScript</strong>
                                            </h4>
                                            <h5 className="mb-3">
                                                <strong>30 Classes</strong>
                                            </h5>
                                            <h6 className="mb-3">
                                                Duration : <strong>3 Months</strong>
                                            </h6>
                                            {/* Divider here */}
                                            <hr class="hr hr-blurry" />

                                            <p className="card-text">
                                                An ideal course to help kids quickly grasp the basics of javascript programming and start writing code using blocks.
                                            </p>

                                            <NavLink to="/user/viewchapters" className="btn btn-primary my-3">
                                                Learn More
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                                {/* Second column */}
                                {/* Third column */}
                                <div className="col-lg-4 col-md-12 mb-lg-0 hover-zoom">
                                    <div className="card">
                                        <div
                                            class="mt-n3 bg-image hover-overlay ripple mx-3 shadow-4-strong rounded-6"
                                            data-mdb-ripple-color="light"
                                        >
                                            <img
                                                src="/images/course-python.jpg"
                                                className="img-fluid"
                                            />
                                            <NavLink to="/user/viewchapters">
                                                <div
                                                    className="mask"
                                                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                                />
                                            </NavLink>
                                        </div>
                                        <div className="card-body">
                                            <h4 className="card-tittle my-3" style={{ backgroundColor: "#f1f1f1", fontSize: "32px", letterSpacing: "1px" }}>
                                                <strong>Python</strong>
                                            </h4>
                                            <h5 className="mb-3">
                                                <strong>25 Classes</strong>
                                            </h5>
                                            <h6 className="mb-3">
                                                Duration : <strong>3 Months</strong>
                                            </h6>
                                            {/* Divider here */}
                                            <hr class="hr hr-blurry" />

                                            <p className="card-text">
                                                An ideal course to help kids quickly grasp the basics of python programming and start writing code using blocks.
                                            </p>

                                            <NavLink to="/user/viewchapters" className="btn btn-primary my-3">
                                                Learn More
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                                {/* Third column */}
                            </div>
                        </section>
                    </section>
                    {/**/}
                </div>
            </div>
            {/* Our Course*/}

            {/* Our Upcoming Course*/}
            <div className='mb-8'>
                <div data-draggable="true">
                    {/**/}
                    {/**/}
                    <section draggable="false" className="container" data-v-271253ee="">
                        <section>
                            <div className='heading'>
                                <h2 className="mb-3 text-center display-3">
                                    <span>Our Upcoming Courses</span>
                                </h2>
                            </div>
                            <div className='sub-heading'>
                                <h4 className="mb-8 text-center">
                                    <span>Discover a world of coding with our courses</span>
                                </h4>
                            </div>
                            <div className="row text-center gx-lg-5 mb-6">
                                {/* First column */}
                                <div className="col-lg-4 col-md-12 mb-lg-0 hover-zoom">
                                    <div className="card">
                                        <div
                                            class="mt-n3 bg-image hover-overlay ripple mx-3 shadow-4-strong rounded-6"
                                            data-mdb-ripple-color="light"
                                        >
                                            <img
                                                src="/images/course-upcomming1.jpg"
                                                className="img-fluid"
                                            />
                                            <NavLink to="#">
                                                <div
                                                    className="mask"
                                                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                                />
                                            </NavLink>
                                        </div>
                                        <div className="card-body">
                                            <h4 className="card-tittle my-3" style={{ backgroundColor: "#f1f1f1", fontSize: "30px", letterSpacing: "1px" }}>
                                                <strong>Game Development</strong>
                                            </h4>
                                            <h5 className="mb-3">
                                                <strong>50 Classes</strong>
                                            </h5>
                                            <h6 className="mb-3">
                                                Duration : <strong>7 Months</strong>
                                            </h6>
                                            {/* Divider here */}
                                            <hr class="hr hr-blurry" />

                                            <p className="card-text">
                                                A perfect course for kids who want to excel at coding and build complex games and applications.
                                            </p>
                                            <button href="#" className="btn btn-primary my-3">
                                                Learn More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* First column */}
                                {/* Second column */}
                                <div className="col-lg-4 col-md-12 mb-lg-0 hover-zoom">
                                    <div className="card">
                                        <div
                                            class="mt-n3 bg-image hover-overlay ripple mx-3 shadow-4-strong rounded-6"
                                            data-mdb-ripple-color="light"
                                        >
                                            <img
                                                src="/images/course-upcomming2.jpg"
                                                className="img-fluid"
                                            />
                                            <NavLink to="#">
                                                <div
                                                    className="mask"
                                                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                                />
                                            </NavLink>
                                        </div>
                                        <div className="card-body">
                                            <h4 className="card-tittle my-3" style={{ backgroundColor: "#f1f1f1", fontSize: "32px", letterSpacing: "1px" }}>
                                                <strong>Web Development</strong>
                                            </h4>
                                            <h5 className="mb-3">
                                                <strong>40 Classes</strong>
                                            </h5>
                                            <h6 className="mb-3">
                                                Duration : <strong>6 Months</strong>
                                            </h6>
                                            {/* Divider here */}
                                            <hr class="hr hr-blurry" />

                                            <p className="card-text">
                                                A perfect course for kids who want to excel at coding and build complex games and applications.
                                            </p>

                                            <button href="#" className="btn btn-primary my-3">
                                                Learn More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Second column */}
                                {/* Third column */}
                                <div className="col-lg-4 col-md-12 mb-lg-0 hover-zoom">
                                    <div className="card">
                                        <div
                                            class="mt-n3 bg-image hover-overlay ripple mx-3 shadow-4-strong rounded-6"
                                            data-mdb-ripple-color="light"
                                        >
                                            <img
                                                src="/images/course-upcomming3.jpg"
                                                className="img-fluid"
                                            />
                                            <NavLink to="#">
                                                <div
                                                    className="mask"
                                                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                                />
                                            </NavLink>
                                        </div>
                                        <div className="card-body">
                                            <h4 className="card-tittle my-3" style={{ backgroundColor: "#f1f1f1", fontSize: "32px", letterSpacing: "1px" }}>
                                                <strong>Roblox</strong>
                                            </h4>
                                            <h5 className="mb-3">
                                                <strong>50 Classes</strong>
                                            </h5>
                                            <h6 className="mb-3">
                                                Duration : <strong>7 Months</strong>
                                            </h6>
                                            {/* Divider here */}
                                            <hr class="hr hr-blurry" />

                                            <p className="card-text">
                                                A perfect course for kids who want to excel at coding and build complex games and applications.
                                            </p>

                                            <button href="#" className="btn btn-primary my-3">
                                                Learn More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Third column */}
                            </div>
                        </section>
                    </section>
                    {/**/}
                </div>
            </div>
            {/* Our Upcoming Course*/}
        </div>
    )
}

export default Course