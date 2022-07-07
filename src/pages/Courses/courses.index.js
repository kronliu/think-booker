import React, { useState, useEffect, useContext } from "react";
import "./courses.styles.scss";

import { Link } from "react-router-dom";
import { Redirect, withRouter } from "react-router-dom";
import { Alert } from "react-bootstrap";
import UserContext from "../../userContext";
import Swal from "sweetalert2";

import OutsideAlerter from "../../components/OutsideAlerter/outside-alerter.component";
import EditCourse from "../../components/EditCourse/edit-course.components";
import CreateCourse from "../../components/CreateCourse/create-course.components";
import Header from "../../components/Header/header.component";
import WhiteStrip from "../../components/WhiteStrip/white-strip.component";
import CustomButton2 from "../../components/CustomButton2/custom-button-2.component";
import CustomButton from "../../components/CustomButton/custom-button.component";

const Courses = () => {
  const { user } = useContext(UserContext);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://intense-waters-48513.herokuapp.com/api/courses/")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setCourses(data);
      });
  }, [showCreate, showEdit]);

  const handleEnable = (courseId) => {
    fetch(
      `https://intense-waters-48513.herokuapp.com/api/courses/${courseId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.isActive) {
          fetch(
            `https://intense-waters-48513.herokuapp.com/api/courses/archive/${courseId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              if (data) {
                fetch("https://intense-waters-48513.herokuapp.com/api/courses/")
                  .then((res) => res.json())
                  .then((data) => {
                    setCourses(data);
                  });
                Swal.fire({
                  icon: "success",
                  title: "Course Archived",
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Something Went Wrong",
                });
              }
            });
        } else {
          fetch(
            `https://intense-waters-48513.herokuapp.com/api/courses/enable/${courseId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              if (data) {
                fetch("https://intense-waters-48513.herokuapp.com/api/courses/")
                  .then((res) => res.json())
                  .then((data) => {
                    setCourses(data);
                  });
                Swal.fire({
                  icon: "success",
                  title: "Course Enabled",
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Something Went Wrong",
                });
              }
            });
        }
      });
  };

  if (loading) {
    return (
      <div className="loading-screen d-flex flex-column align-items-center justify-content-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <Header>
        <h1 className="text-white">Popular Courses</h1>
        <div className="mt-3">
          {user.isAdmin ? (
            <CustomButton2 onClick={() => setShowCreate(true)}>
              Create Course
            </CustomButton2>
          ) : null}
        </div>
      </Header>

      <div className="bg-grey">
        <WhiteStrip />
        <div className="container py-5">
          {courses.length === 0 && (
            <Alert variant="info" className="alert text-center">
              <Alert.Heading>No Available Courses</Alert.Heading>
            </Alert>
          )}
          <div className="row">
            {courses
              .filter((course) => {
                if (user.isAdmin === null) return course.isActive === true;
                return course;
              })
              .map((course) => {
                return (
                  <div className="col-12 col-lg-6" key={course._id}>
                    <div className="card shadow container course-container my-2">
                      <div className="row pt-3 px-3">
                        <div className="col-8">
                          <h4 className="course-name text-dark">
                            {course.name}
                          </h4>
                        </div>

                        <span
                          className={
                            course.isActive
                              ? "card-header-green ml-auto"
                              : "card-header-red ml-auto"
                          }
                        >
                          {course.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <div className="row px-3">
                        <div className="col-12">
                          <p className="course-description text-dark">
                            {course.description}
                          </p>
                        </div>
                      </div>
                      <div className="row mt-auto mb-3">
                        {!user.isAdmin ? (
                          <Link
                            to={`/course/?courseId=${course._id}`}
                            className=" ml-auto mr-2"
                          >
                            <button className="btn btn-primary" type="button">
                              View Course
                            </button>
                          </Link>
                        ) : (
                          <>
                            <Link
                              to={`/course/?courseId=${course._id}`}
                              className="ml-auto mr-2"
                            >
                              <button className="btn btn-primary" type="button">
                                View Course
                              </button>
                            </Link>
                            <button
                              className={
                                course.isActive
                                  ? "btn btn-danger mr-2"
                                  : "btn btn-success mr-2"
                              }
                              data-id={course._id}
                              onClick={(e) => {
                                setSelectedCourseId(
                                  e.target.getAttribute("data-id")
                                );

                                handleEnable(course._id);
                              }}
                            >
                              {course.isActive
                                ? "Archive Course"
                                : "Enable Course"}
                            </button>
                            <button
                              className="btn btn-secondary mr-3"
                              data-id={course._id}
                              onClick={(e) => {
                                setShowEdit(true);
                                setSelectedCourseId(
                                  e.target.getAttribute("data-id")
                                );
                              }}
                            >
                              Edit Course
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className={showEdit ? "modal modal-show " : "modal"}>
        <div className="modal-content col-sm-10 col-md-6 p-3">
          <OutsideAlerter handleClose={() => setShowEdit(false)}>
            <EditCourse courseId={selectedCourseId} />
          </OutsideAlerter>
        </div>
      </div>
      <div className={showCreate ? "modal modal-show " : "modal"}>
        <div className="modal-content col-sm-10 col-md-6 p-3">
          <OutsideAlerter handleClose={() => setShowCreate(false)}>
            <CreateCourse />
          </OutsideAlerter>
        </div>
      </div>
    </>
  );
};

export default Courses;
