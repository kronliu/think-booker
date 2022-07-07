import React, { useState } from "react";
import "./register.styles.scss";
import { Alert } from "react-bootstrap";

import FormInput from "../FormInput/form-input.component";
import CustomButton from "../CustomButton/custom-button.component";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  const [alertMsg, setAlertMsg] = useState("");

  const [invalidFNameMsg, setInvalidFNameMsg] = useState("");
  const [invalidLNameMsg, setInvalidLNameMsg] = useState("");
  const [invalidEmailMsg, setInvalidEmailMsg] = useState("");
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState("");
  const [invalidPassword2Msg, setInvalidPassword2Msg] = useState("");
  const [invalidMobileNoMsg, setInvalidMobileNoMsg] = useState("");
  const [loadingRegister, setLoadingRegister] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    if (firstname === "") setInvalidFNameMsg("Enter your first name.");
    if (lastname === "") setInvalidLNameMsg("Enter your last name.");
    if (email === "" || !email.includes("@"))
      setInvalidEmailMsg("Enter a valid email.");
    if (password === "") {
      setInvalidPasswordMsg("Enter a password.");
      setInvalidPassword2Msg("Confirm password");
    } else {
      if (password.length < 8) {
        setInvalidPasswordMsg("Passwords must be at least 8 character");
        setInvalidPassword2Msg("Confirm password");
      } else if (confirmPassword !== password) {
        setInvalidPasswordMsg("Passwords do not match");
        setInvalidPassword2Msg("Passwords do not match");
      }
    }

    if (mobileNo === 0 || mobileNo === "") {
      setInvalidMobileNoMsg("Enter your mobile number.");
      if (mobileNo.length > 11 || mobileNo.length < 11)
        setInvalidMobileNoMsg("Mobile number must have 11 digits.");
    }

    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      !email.includes("@") ||
      password.length < 8 ||
      mobileNo.length > 11 ||
      mobileNo.length < 11
    ) {
      return;
    } else {
      setLoadingRegister(true);
      fetch(
        "https://intense-waters-48513.herokuapp.com/api/users/email-exists",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data === false) {
            fetch("https://intense-waters-48513.herokuapp.com/api/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                mobileNo: mobileNo,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                if (data) {
                  setAlertMsg("success");
                  setLoadingRegister(false);
                } else {
                  setAlertMsg("error");
                  setLoadingRegister(false);
                }
              });
          } else {
            setAlertMsg("email-exists");
            setLoadingRegister(false);
          }
        });
    }
    setEmail("");
    setFirstname("");
    setLastname("");
    setPassword("");
    setConfirmPassword("");
    setMobileNo("");
  };

  const handleClear = () => {
    setAlertMsg("");
    setInvalidFNameMsg("");
    setInvalidLNameMsg("");
    setInvalidEmailMsg("");
    setInvalidPasswordMsg("");
    setInvalidPassword2Msg("");
    setInvalidMobileNoMsg("");
  };

  const handleAlertShow = () => {
    if (alertMsg === "success")
      return (
        <Alert variant="success" className="alert text-center">
          <Alert.Heading>Registration Successful</Alert.Heading>
        </Alert>
      );
    if (alertMsg === "error")
      return (
        <Alert variant="danger" className="alert text-center">
          <Alert.Heading>Unable to create an account.</Alert.Heading>
        </Alert>
      );
    if (alertMsg === "email-exists")
      return (
        <Alert variant="warning" className="alert text-center">
          <Alert.Heading>Email already exists.</Alert.Heading>
        </Alert>
      );
    return null;
  };

  return (
    <>
      <div className="register-container">
        <form
          className="col-sm-10 mx-auto"
          onSubmit={(e) => {
            handleRegister(e);
          }}
        >
          <h2 className="title text-center">Create An Account</h2>
          {handleAlertShow()}
          <FormInput
            label={"First Name"}
            value={firstname}
            type={"text"}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            onClick={handleClear}
            invalidMessage={invalidFNameMsg}
          />
          <FormInput
            label={"Last Name"}
            value={lastname}
            type={"text"}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            onClick={handleClear}
            invalidMessage={invalidLNameMsg}
          />
          <FormInput
            label={"Email"}
            value={email}
            type={"text"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onClick={handleClear}
            invalidMessage={invalidEmailMsg}
          />
          <FormInput
            label={"Password"}
            value={password}
            type={"password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onClick={handleClear}
            invalidMessage={invalidPasswordMsg}
          />
          <FormInput
            label={"Confirm Password"}
            value={confirmPassword}
            type={"password"}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            onClick={handleClear}
            invalidMessage={invalidPassword2Msg}
          />
          <FormInput
            label={"Mobile Number"}
            value={mobileNo}
            type={"number"}
            onChange={(e) => {
              setMobileNo(e.target.value);
            }}
            onClick={handleClear}
            invalidMessage={invalidMobileNoMsg}
          />
          <div className="d-flex justify-content-center mt-4">
            <CustomButton type="submit">
              {loadingRegister ? <div className="loader-2"></div> : "Register"}
            </CustomButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
