import React from "react";
import "./About.css";

export default function About() {
  return (
    <>
      <main id="main">
        {/* <!-- ======= About Us Section ======= --> */}
          <section section id="about" className="about">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center my-5">
                  <h2>About Us</h2>
                  <p className="lead">
                    Welcome to FlightBooker, your ultimate destination for
                    booking flights hassle-free. Our mission is to provide you
                    with the best flight booking experience possible, offering a
                    wide range of destinations, competitive prices, and
                    exceptional customer service.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <p>
                    At FlightBooker, we understand that planning a trip can be
                    overwhelming, so we strive to make it easy for you. Our
                    user-friendly interface allows you to search, compare, and
                    book flights effortlessly, saving you time and money.
                  </p>
                  <ul className="list-unstyled">
                    <li>
                      <i className="ri-check-double-line"></i> Explore a vast
                      selection of airlines and destinations
                    </li>
                    <li>
                      <i className="ri-check-double-line"></i> Find the best
                      deals and discounts on flights
                    </li>
                    <li>
                      <i className="ri-check-double-line"></i> Enjoy 24/7
                      customer support for any assistance you may need
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6">
                  <p>
                    Whether you're traveling for business or leisure,
                    FlightBooker has got you covered. Our dedicated team works
                    tirelessly to ensure that your travel experience is seamless
                    from start to finish. So why wait? Start planning your next
                    adventure with FlightBooker today!
                  </p>
                  <a href="#" className="btn btn-primary btn-lg">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
        </section>
        {/* <!-- End About Us Section --> */}

        {/* <!-- ======= Cta Section ======= --> */}
        <section id="cta" className="cta my-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 text-center text-lg-start">
                <h3>Call To Action</h3>
                <p>
                  Ready to embark on your next journey? Search for flights and
                  start planning your trip today!
                </p>
              </div>
              <div className="col-lg-3 cta-btn-container text-center">
                <a className="cta-btn align-middle" href="#">
                  Call To Action
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End Cta Section --> */}

        {/* <!-- ======= Services Section ======= --> */}
        <section id="services" className="services my-5">
          <div className="container">
            <div className="section-title">
              <h2>Why Choose Us?</h2>
              <p>
                Discover the advantages of booking your flights with
                FlightBooker.
              </p>
            </div>

            <div className="row">
              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
                <div className="icon-box">
                  <div className="icon">
                    <i class="fa-solid fa-globe"></i>
                  </div>
                  <h4>
                    <a href="#">Global Reach</a>
                  </h4>
                  <p>
                    Explore the world with our extensive network of flights
                    covering various destinations.
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                <div className="icon-box">
                  <div className="icon">
                    <i class="fa-solid fa-hand-pointer"></i>
                  </div>
                  <h4>
                    <a href="#">Wide Selection</a>
                  </h4>
                  <p>
                    Choose from a wide range of airlines and destinations to
                    find the perfect flight for your trip.
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                <div className="icon-box">
                  <div className="icon">
                    <i class="fa-solid fa-plane-circle-check"></i>{" "}
                  </div>
                  <h4>
                    <a href="#">Easy Booking</a>
                  </h4>
                  <p>
                    Our user-friendly platform makes booking your flights quick
                    and hassle-free.
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                <div className="icon-box">
                  <div className="icon">
                    <i class="fa-solid fa-jet-fighter"></i>{" "}
                  </div>
                  <h4>
                    <a href="#">Fast & Secure</a>
                  </h4>
                  <p>
                    Enjoy fast and secure transactions when you book your
                    flights with us.
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                <div className="icon-box">
                  <div className="icon">
                    <i class="fa-brands fa-usps"></i>{" "}
                  </div>
                  <h4>
                    <a href="#">Exceptional Service</a>
                  </h4>
                  <p>
                    Experience exceptional service and personalized assistance
                    throughout your journey.
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                <div className="icon-box">
                  <div className="icon">
                    <i class="fa-solid fa-fire"></i>{" "}
                  </div>
                  <h4>
                    <a href="#">Exciting Offers</a>
                  </h4>
                  <p>
                    Discover exciting offers and deals on flights to make your
                    travel more affordable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End Services Section --> */}

        {/* <!-- ======= Counts Section ======= --> */}
        <section id="counts" className="counts my-5">
          <div className="container">
            <div className="text-center title">
              <h3>What we have achieved so far</h3>
              <p>
                We take pride in what we've accomplished so far, thanks to our
                dedicated team and valued customers.
              </p>
            </div>

            <div className="row counters position-relative">
              <div className="col-lg-3 col-6 text-center">
                <span
                //   data-purecounter-start="0"
                //   data-purecounter-end="232"
                //   data-purecounter-duration="1"
                //   className="purecounter"
                >
                  245
                </span>
                <p>Clients</p>
              </div>
              <div className="col-lg-3 col-6 text-center">
                <span
                  data-purecounter-start="0"
                  data-purecounter-end="521"
                  data-purecounter-duration="1"
                  className="purecounter"
                >
                  23
                </span>
                <p>Projects</p>
              </div>

              <div className="col-lg-3 col-6 text-center">
                <span
                  data-purecounter-start="0"
                  data-purecounter-end="1463"
                  data-purecounter-duration="1"
                  className="purecounter"
                >
                  500
                </span>
                <p>Hours Of Support</p>
              </div>

              <div className="col-lg-3 col-6 text-center">
                <span
                  data-purecounter-start="0"
                  data-purecounter-end="15"
                  data-purecounter-duration="1"
                  className="purecounter"
                >
                  50
                </span>
                <p>Hard Workers</p>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End Counts Section --> */}
      </main>
    </>
  );
}
