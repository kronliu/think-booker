import React, { useEffect, useState } from "react";
import "./home.styles.scss";

import Header from "../../components/Header/header.component";
import Footer from "../../components/Footer/footer.component";
import GradientStrip from "../../components/GradientStrip/gradient-strip.component";

const Home = () => {
  return (
    <>
      <Header>
        <h1 className="text-white">ThinkBooker Booking Services</h1>
        <p className="lead text-white">Booking for everyone, everywhere</p>
      </Header>
      <GradientStrip />
      <main className="p-2 bg-grey">
        <div className="container">
          <div className="row">
            <div className="col-md-4 my-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Find The Class</h5>
                  <p className="card-text">
                    Simply go to the course page function to locate your
                    className and find further information on location, prices
                    and dates.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 my-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Book The Class</h5>
                  <p className="card-text">
                    Read your course overview by clicking on the course and book
                    your place by clicking on the “Enroll Course” button.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 my-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Enjoy The Class</h5>
                  <p className="card-text">
                    Once you have booked a course, you now have an access to the
                    high quality training and education the course provides.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
