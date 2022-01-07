import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="footer-main">
        <footer>
          <div className="container justify-content-center">
            <div className="row mb-0 pt-5 row-2 justify-content-md-around justify-content-center text-center"></div>

            <hr />
            <div className="row mb-0 mt-1 row-2 justify-content-xl-around justify-content-sm-between">
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 pt-4 order-1   ">
                <div className="footer-text pull-left">
                  <div className="d-flex main-img">
                    <img src="/automartz-logo-white.gif" />
                  </div>
                  <p>
                    AUTOMARTZ : Indian B2B & B2C portal of the entire Automobile
                    industry. Get info of Vehicles, Auto spare parts,
                    accessories, dealers buyers sellers & much more.
                  </p>
                </div>
              </div>
              <div className="offset-xl-1 col-xl-2 col-lg-4 col-md-4 col-sm-6 pt-4 order-2">
                <ul className="list-unstyled">
                  <li className="mt-md-0 mt-4">Main Menu</li>
                  <li>Home</li>
                  <li>Latest News</li>
                  <li>Latest Launches</li>
                  <li>Events</li>
                </ul>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-6 pt-4 col-sm-6 my-sm-0 order-md-3 order-sm-1 d-flex ">
                <ul className="list-unstyled">
                  <li className="mt-md-0 mt-4">Important Links</li>
                  <li>Latest Updates</li>
                  <li>Associated Industries</li>
                  <li>Auto Shows & Trade Events</li>
                  <li>Trade Associations</li>
                </ul>
              </div>
              <div className="col-xl-2 col-lg-6 col-md-6 pt-4 col-sm-6 my-sm-0 order-md-3 order-sm-1 d-flex ">
                <ul className="list-unstyled">
                  <li className="mt-md-0 mt-4">TOP CATEGORIES</li>
                  <li>Features</li>
                  <li>Associates</li>
                  <li>Feedback</li>
                  <li>How it works</li>
                </ul>
              </div>

              {/* <div className="col-xl-auto text-left col-lg-4 col-md-4 col-sm-6 col-12 pt-4 my-sm-0 order-6 my-auto">
                <div className="input-group-lg input-group mb-3 mt-md-0 mt-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your e-mail address"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-success"
                      type="button"
                      id="button-addon2"
                    >
                      {" "}
                      <b>Join</b>
                    </button>
                  </div>
                </div>
                <ul className="list-unstyled">
                  <li>
                    <p className="mb-0 pb-0 mt-5">
                      FOLLOW THE WEB ON SOCIAL NETWORKS
                    </p>
                  </li>
                  <li>
                    <a className="fa fa-facebook"></a>
                    <a className="fa fa-twitter"></a>
                    <a className="fa fa-instagram"></a>
                    <a className="fa fa-linkedin"></a>
                  </li>
                </ul>
              </div> */}
            </div>
            <hr className="line" />
            <div className="row py-3 justify-content-around ">
              <div className="col">
                <h5 className=" mb-4 text-white">
                  <b>Why choose AutoMartz? </b>{" "}
                </h5>
                <small>
                  Developed way back in 2016, AutoMartz is the result of a
                  vision to ease automotive consumers’ life by helping them find
                  their required auto products or services from the shops,
                  vendors, or servicing centers in their own or nearby location.
                  On the other hand, it is most suitable for all types and sizes
                  of automotive shops like spare parts and/or accessories shops
                  and stores as well as automotive vendors, dealers,
                  distributors, and many other professionals. AutoMartz
                  prioritizes location therefore it showcases the auto units or
                  shops to consumers of the same or nearest location. For that,
                  we use some digital forms of marketing that increase your auto
                  shop or entity’s visibility to your potential consumers in
                  your location. It results in boosting your auto entity sales
                  and thus ensures good growth of your automotive business.
                  Additionally, it also makes people aware of the latest
                  updates, news, and any other changes taking place in this
                  ever-changing industry to keep consumers as well as business
                  owners up-to-date. In a nutshell, AutoMartz is committed
                  towards bringing the automotive & automobile sector into the
                  mainstream and making each individual aware and familiar with
                  it. The reason is, it is the most essential sector that
                  influences almost every single life; from a common man to the
                  richest or almost all. But a large chunk of the population is
                  not aware of this industry. AutoMartz has held the flag for
                  the betterment of the Auto Sector by connecting the consumers
                  to their right auto entity from the same location.
                </small>
              </div>
            </div>

            <hr className="line" />
            <div className="row text-center py-3">
              <div className="col">
                <p className="">
                  <b>ALL RIGHTS ARE RESERVED BY ASPI GLOBAL PVT. LTD.</b>{" "}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
