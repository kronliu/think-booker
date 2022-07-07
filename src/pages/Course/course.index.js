import React, { useState, useEffect, useContext } from "react";
import "./course.styles.scss";
import UserContext from "../../userContext";
import { Alert } from "react-bootstrap";

import Header from "../../components/Header/header.component";
import WhiteStrip from "../../components/WhiteStrip/white-strip.component";
import CustomButton2 from "../../components/CustomButton2/custom-button-2.component";
import OutsideAlerter from "../../components/OutsideAlerter/outside-alerter.component";

const Course = () => {
  const { user } = useContext(UserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [enrollees, setEnrollees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingEnroll, setLoadingEnroll] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [showEnroll, setShowEnroll] = useState(false);

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let courseId = params.get("courseId");
    setLoading(true);
    fetch(`https://intense-waters-48513.herokuapp.com/api/courses/${courseId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setLoading(false);
        let enrollesTemp = [];
        data.enrollees.forEach((enrollee) => {
          fetch(
            `https://intense-waters-48513.herokuapp.com/api/users/enrollees/${enrollee.userId}`
          )
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              enrollesTemp = [...enrollesTemp];
              enrollesTemp.push(data);
              setEnrollees(enrollesTemp);
              setLoading(false);
            });
        });
      });
  }, [loadingEnroll]);

  const handleEnroll = () => {
    let params = new URLSearchParams(window.location.search);
    let courseId = params.get("courseId");
    setLoadingEnroll(true);
    fetch("https://intense-waters-48513.herokuapp.com/api/users/details", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const userId = data._id;
        fetch("https://intense-waters-48513.herokuapp.com/api/users/enroll", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            userId: userId,
            courseId: courseId,
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data) {
              setLoadingEnroll(false);
              setAlertMsg("success");
            } else {
              setLoadingEnroll(false);
              setAlertMsg("error");
            }
          });
      });
  };

  const handleAlertShow = () => {
    if (alertMsg === "success")
      return (
        <Alert variant="success" className="alert text-center">
          <Alert.Heading>You have now enrolled to this course</Alert.Heading>
        </Alert>
      );
    if (alertMsg === "error")
      return (
        <Alert variant="danger" className="alert text-center">
          <Alert.Heading>"Unable to enroll to this course</Alert.Heading>
        </Alert>
      );
    return null;
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
        <h2 className="text-white">{name}</h2>
        <div className="course-description">
          <p className="lead text-white">{`Course Description: ${description}`}</p>
        </div>
        <p className="lead text-white">{`Price: ${price}.00 PHP`}</p>
        {!enrollees.find((enrollee) => enrollee._id === user.id) &&
        user.id &&
        !user.isAdmin ? (
          <CustomButton2 onClick={() => setShowEnroll(true)}>
            Enroll
          </CustomButton2>
        ) : null}
      </Header>

      <div className="bg-grey">
        <WhiteStrip />
        <div className="container py-5">
          {user.id ? (
            <>
              <h3 className="text-center">Enrollees:</h3>
              <hr className="my-4" />
              {enrollees.length === 0 && (
                <Alert variant="info" className="alert text-center">
                  <Alert.Heading>No enrollees.</Alert.Heading>
                </Alert>
              )}
              <div className="row">
                {enrollees.map((enrollee) => {
                  return (
                    <div className="col-12 col-md-6" key={enrollee._id}>
                      <div className="card shadow container text-center my-2">
                        <div className="row flex flex-column p-3">
                          <h4 className="course-name text-dark">{`${enrollee.firstname} ${enrollee.lastname}`}</h4>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <Alert variant="info" className="alert text-center">
              <Alert.Heading>You must be logged in to enroll.</Alert.Heading>
            </Alert>
          )}
        </div>
      </div>

      <div className={showEnroll ? "modal modal-show " : "modal"}>
        <div className="modal-content col-sm-10 col-md-8 col-lg-5">
          <OutsideAlerter handleClose={() => setShowEnroll(false)}>
            <div className="p-4">
              <h4 className="title text-center mb-4">
                Are you sure you want to enroll?
              </h4>
              {handleAlertShow()}
              <div className="d-flex flex-row justify-content-center">
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => setShowEnroll(false)}
                >
                  Close
                </button>
                <button className="btn btn-primary mx-2" onClick={handleEnroll}>
                  {loadingEnroll ? <div className="loader-2"></div> : "Enroll"}
                </button>
              </div>
            </div>
          </OutsideAlerter>
        </div>
      </div>
    </>
  );
};

export default Course;
