import React, { useState, useContext } from "react";
import "./login.styles.scss";
import { withRouter } from "react-router-dom";
import { Alert } from "react-bootstrap";
import UserContext from "../../userContext";

import FormInput from "../FormInput/form-input.component";
import CustomButton from "../CustomButton/custom-button.component";

const Login = ({ handleRedirect, history, handleClose }) => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [invalidEmailMsg, setInvalidEmailMsg] = useState("");
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "" || !email.includes("@"))
      setInvalidEmailMsg("Please enter a valid email.");
    if (password === "") setInvalidPasswordMsg("Please enter your password.");

    if (!email === "" || email.includes("@") || !password === "") {
      setLoadingLogin(true);
      fetch("https://intense-waters-48513.herokuapp.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.access !== null && data !== false) {
            localStorage.setItem("token", data.access);
            fetch(
              "https://intense-waters-48513.herokuapp.com/api/users/details",
              {
                headers: {
                  Authorization: `Bearer ${data.access}`,
                },
              }
            )
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                setUser({
                  id: data._id,
                  isAdmin: data.isAdmin,
                });
                setLoadingLogin(false);
                handleClose();
                if (data.isAdmin) history.push("/courses");
                else history.push("/profile");
              });
          } else {
            setLoadingLogin(false);
            setAlertMsg("error");
          }
        });
    }

    setEmail("");
    setPassword("");
  };

  const handleClear = () => {
    setAlertMsg("");
    setInvalidEmailMsg("");
    setInvalidPasswordMsg("");
  };

  const handleAlertShow = () => {
    if (alertMsg === "error")
      return (
        <Alert variant="danger" className="alert text-center">
          <Alert.Heading>
            Password might be incorrect or user does not exists.
          </Alert.Heading>
        </Alert>
      );
    return null;
  };

  return (
    <>
      <div className="login-container">
        <form
          className="col-sm-10 mx-auto"
          onSubmit={(e) => {
            handleLogin(e);
          }}
        >
          <h2 className="title text-center">Welcome</h2>
          {handleAlertShow()}
          <>
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
          </>
          <div className="mx-auto mt-3">
            <CustomButton type="submit">
              {loadingLogin ? <div className="loader-2"></div> : "Login"}
            </CustomButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default withRouter(Login);
