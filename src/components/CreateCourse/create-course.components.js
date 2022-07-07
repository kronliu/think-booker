import React, { useState } from "react";
import "./create-course.styles.scss";
import { Alert } from "react-bootstrap";
import FormInput from "../FormInput/form-input.component";

const CreateCourse = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const [invalidNameMsg, setInvalidNameMsg] = useState("");
  const [invalidDescriptionMsg, setInvalidDescriptionMsg] = useState("");
  const [invalidPriceMsg, setInvalidPriceMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") setInvalidNameMsg("Enter course name.");
    if (description === "")
      setInvalidDescriptionMsg("Enter course description.");
    if (price === "") setInvalidPriceMsg("Enter course price.");

    if (name !== "" && description !== "" && price > 0) {
      fetch("https://intense-waters-48513.herokuapp.com/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: name,
          description: description,
          price: price,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data) {
            setAlertMsg("success");
          } else {
            setAlertMsg("error");
          }
        });
    }
    setName("");
    setDescription("");
    setPrice("");
  };

  const handleAlertShow = () => {
    if (alertMsg === "success")
      return (
        <Alert variant="success" className="alert text-center">
          <Alert.Heading>Course created.</Alert.Heading>
        </Alert>
      );
    if (alertMsg === "error")
      return (
        <Alert variant="danger" className="alert text-center">
          <Alert.Heading>Unable to create course.</Alert.Heading>
        </Alert>
      );
    return null;
  };

  const handleClear = () => {
    setAlertMsg("");
    setInvalidNameMsg("");
    setInvalidDescriptionMsg("");
    setInvalidPriceMsg("");
  };

  return (
    <>
      <div className="create-course-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h2 className="mb-4 ml-3">Create Course</h2>
          {handleAlertShow()}
          <FormInput
            label={"Name"}
            value={name}
            type={"text"}
            onChange={(e) => {
              setName(e.target.value);
            }}
            onClick={handleClear}
            invalidMessage={invalidNameMsg}
          />
          <FormInput
            label={"Description"}
            value={description}
            type={"text"}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            onClick={handleClear}
            invalidMessage={invalidDescriptionMsg}
          />
          <FormInput
            label={"Price"}
            value={price}
            type={"number"}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            onClick={handleClear}
            invalidMessage={invalidPriceMsg}
          />

          <div className="text-right mr-3">
            <button type="submit" className="btn btn-primary">
              Create Course
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCourse;
