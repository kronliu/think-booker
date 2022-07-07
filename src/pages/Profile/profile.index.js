import React, { useState, useEffect } from "react";
import "./profile.styles.scss";

import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import Header from "../../components/Header/header.component";
import WhiteStrip from "../../components/WhiteStrip/white-strip.component";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://intense-waters-48513.herokuapp.com/api/users/details", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setName(`${data.firstname} ${data.lastname}`);
        setEmail(data.email);
        setMobileNo(data.mobileNo);
        setLoading(false);
        let coursesTemp = [];
        data.enrollments.forEach((enrollment) => {
          fetch(
            `https://intense-waters-48513.herokuapp.com/api/courses/${enrollment.courseId}`,
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
              coursesTemp = [...coursesTemp];
              coursesTemp.push(data);
              setCourses(coursesTemp);
              setLoading(false);
            });
        });
      });
  }, []);

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
        <div className="col-md-11 offset-md-1 text-center text-md-left mt-auto">
          <h2 className="text-white">{name}</h2>
        </div>
      </Header>

      <div className="bg-grey">
        <WhiteStrip>
          <div className="d-flex justify-content-md-start justify-content-center">
            <div className="offset-md-1">
              <i className="fa fa-envelope"></i> <span>{email}</span>
            </div>
            <div>
              <i className="fa fa-phone ml-3"></i> <span>{mobileNo}</span>
            </div>
          </div>
        </WhiteStrip>
        <div className="container mt-5">
          <h3 className="text-center">Enrolled Courses:</h3>
          <hr className="my-4" />
          {courses.length === 0 && (
            <Alert variant="info" className="alert text-center">
              <Alert.Heading>No Available Courses</Alert.Heading>
            </Alert>
          )}
          <div className="row">
            {courses.map((course) => {
              return (
                <div className="col-12 col-md-6" key={course._id}>
                  <div className="card shadow container course-container my-2">
                    <div className="row flex flex-column p-3">
                      <h4 className="course-name text-dark">{course.name}</h4>
                      <p className="course-description text-dark">
                        {course.description}
                      </p>
                    </div>
                    <div className="row mt-auto mb-3">
                      <Link
                        to={`/course/?courseId=${course._id}`}
                        className=" ml-auto mr-3"
                      >
                        <button className="btn btn-primary" type="button">
                          View Course
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
