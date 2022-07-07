import React, { useState, useEffect } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UserProvider } from "./userContext";

import NavBar from "./components/NavBar/navbar.component";
import Home from "./pages/Home/home.index";
import Profile from "./pages/Profile/profile.index";
import Logout from "./pages/Logout/logout.index";
import Courses from "./pages/Courses/courses.index";
import Course from "./pages/Course/course.index";

const App = () => {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  const unsetUser = () => {
    localStorage.clear();

    setUser({
      id: null,
      isAdmin: null,
    });
  };

  useEffect(() => {
    fetch("https://intense-waters-48513.herokuapp.com/api/users/details", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data._id) {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin,
          });
        } else {
          setUser({
            id: null,
            isAdmin: null,
          });
        }
      });
  }, []);

  return (
    <>
      <UserProvider
        value={{
          user,
          setUser,
          unsetUser,
        }}
      >
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/courses" component={Courses} />
            <Route exact path="/course" component={Course} />
            <Route exact path="/logout" component={Logout} />
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </>
  );
};

export default App;
