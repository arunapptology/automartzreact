import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import Quicklinks from "./Quicklinks";

import { ThemeContext } from "../../Context";

import { Link } from "react-router-dom";
import SearchModal from "../searchComponents/SearchModal";
import SearchForm from "../searchComponents/SearchForm";
import LoginSignupButton from "./LoginSignupButton";

import "./navbar.css";

function Navbar() {
  const [showResults, setShowResults] = useState(false);
  const [users, setData] = useState([]);
  const { searchTerm } = useSelector((state) => state.searchReducer);

  useEffect(() => {
    //let user_info = JSON.parse(localStorage.getItem('user_info')) ;

    setData(JSON.parse(localStorage.getItem("user_info")));
  }, []);

  return (
    <>
      {/* <ThemeContext.Consumer>{(data) => {}}</ThemeContext.Consumer> */}

      <nav className="navbar navbar-expand-lg container custom-nav">
        <div className="logo">
          <Link to={"/"} className="navbar-brand" title="">
            <img src="/automartz-logo.gif" alt="automartz" />
          </Link>
        </div>

        <div className="search-bar-box desktop-view">
          <div className="row">
            <div className="col-md-8">
              <div className="header__search">
                <div className="select-bar">
                  <SearchForm />
                  {searchTerm.length > 2 && <SearchModal />}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <LoginSignupButton />
              {/* <div className="login-bar">
                  <div className="login-box">
                    <ul>
                      <li>
                        {" "}
                        <span>
                          {users && users.status === 1 ? (
                            <img
                              src={
                                "https://scontent.fdel27-1.fna.fbcdn.net/v/t1.6435-9/190739760_3864028293713821_6601613263519862653_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=G_IwheiWEQcAX-TAkXe&_nc_ht=scontent.fdel27-1.fna&oh=b2783049930f393d9312b8745fd5b178&oe=619DD131"
                              }
                            />
                          ) : (
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                          )}{" "}
                        </span>{" "}
                      </li>
                      <li>
                        {" "}
                        <Link to="/"></Link>
                        <span>
                          {users && users.status === 0 ? (
                            <Link to="/UserLogout"> Logout</Link>
                          ) : (
                            <Link to="/user-login"> login </Link>
                          )}
                        </span>
                        /
                      </li>
                      <li>
                        <Link to="/UserSignup">signup</Link>{" "}
                      </li>
                    </ul>

                    <div className="login__links">
                      <Link to="/user-login">User Login / Signup</Link>
                      <Link to="/vendor-login">Vendor Login / Signup</Link>
                    </div>
                  </div>
                </div> */}
            </div>
          </div>
        </div>

        {/* search bar for mobile */}

        {/* toggle buttop for mobile */}
        <span
          className="mobile_view closeBtn"
          onClick={() => setShowResults(!showResults)}
        >
          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
        </span>
      </nav>

      {/* queck link for desktop  */}
      <Quicklinks />

      {/* queck link for mobile  */}
      <div className="mobile_view">
        {showResults ? (
          <div className="search-results">
            <ul className="butons_ul">
              <li>
                <div className="dropdown">
                  <button
                    className="square_btn"
                    type="button"
                    id="dropdownMenu2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    User <i className="far fa-user"></i>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenu2"
                  >
                    <span className="dropdown-item">
                      <a href="">Login</a> / <a href=""> Signup</a>
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <div className="dropdown">
                  <button
                    className="square_btn_red"
                    type="button"
                    id="dropdownMenu2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Vendor <i className="fa fa-users" aria-hidden="true"></i>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenu2"
                  >
                    <span className="dropdown-item">
                      <a href="">Login</a> / <a href=""> Signup</a>
                    </span>
                  </div>
                </div>
              </li>

              <li>
                <i className="fa fa-search" aria-hidden="true"></i>
              </li>
            </ul>

            <ul className="main-ul quick-links">
              <div className="content">
                <ul className="exo-menu d-none">
                  <p>Quick Links</p>

                  <li className="drop-down">
                    {" "}
                    <img src="https://cdn-icons-png.flaticon.com/512/1165/1165940.png" />{" "}
                    <a href="#" className="main-flyout">
                      {" "}
                      Two Wheeler
                    </a>
                    <ul className="drop-down-ul animated fadeIn">
                      <li className="flyout-right ">
                        <i
                          className="fa fa-long-arrow-right"
                          aria-hidden="true"
                        ></i>
                        <a href="#">Flyout Right</a>
                        <ul className="animated fadeIn">
                          <li>
                            <a href="#">Mobile</a>
                          </li>
                          <li>
                            <a href="#">Computer</a>
                          </li>
                        </ul>
                      </li>

                      <li className="flyout-left">
                        <a href="#">Flyout Left</a>
                        <ul className="animated fadeIn">
                          <li>
                            <a href="#">Mobile</a>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <a href="#">No Flyout</a>
                      </li>
                    </ul>
                  </li>

                  <li className="drop-down">
                    {" "}
                    <img
                      src=" https://cdn-icons.flaticon.com/png/512/3543/premium/3543482.png?token=exp=1634043042~hmac=385489f2dd7c36e111cfece3aec4315e
"
                    />{" "}
                    <a href="#" className="main-flyout">
                      Three Wheeler
                    </a>
                    <ul className="drop-down-ul animated fadeIn">
                      <li className="flyout-right ">
                        <i
                          className="fa fa-long-arrow-right"
                          aria-hidden="true"
                        ></i>
                        <a href="#">Flyout Right</a>
                        <ul className="animated fadeIn">
                          <li>
                            <a href="#">Mobile</a>
                          </li>
                          <li>
                            <a href="#">Computer</a>
                          </li>
                        </ul>
                      </li>

                      <li className="flyout-left">
                        <a href="#">Flyout Left</a>
                        <ul className="animated fadeIn">
                          <li>
                            <a href="#">Mobile</a>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <a href="#">No Flyout</a>
                      </li>
                    </ul>
                  </li>

                  <li className="drop-down">
                    <img src="https://cdn-icons.flaticon.com/png/512/2736/premium/2736918.png?token=exp=1634043494~hmac=ea7f66082a013abe5e328e055df0f3e7" />{" "}
                    <a href="#" className="main-flyout">
                      Four Wheeler
                    </a>
                    <ul className="drop-down-ul animated fadeIn">
                      <li className="flyout-right ">
                        <a href="#">Flyout Right</a>
                        <ul className="animated fadeIn">
                          <li>
                            <a href="#">Mobile</a>
                          </li>
                          <li>
                            <a href="#">Computer</a>
                          </li>
                        </ul>
                      </li>

                      <li className="flyout-left">
                        <a href="#">Flyout Left</a>
                        <ul className="animated fadeIn">
                          <li>
                            <a href="#">Mobile</a>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <a href="#">No Flyout</a>
                      </li>
                    </ul>
                  </li>

                  <li className="drop-down">
                    {" "}
                    <img src=" https://cdn-icons-png.flaticon.com/512/158/158047.png" />{" "}
                    <a href="#" className="main-flyout">
                      {" "}
                      LCV
                    </a>
                    <ul className="drop-down-ul animated fadeIn">
                      <li className="flyout-right ">
                        <a href="#">Flyout Right</a>
                        <ul className="animated fadeIn">
                          <li>
                            <a href="#">Mobile</a>
                          </li>
                          <li>
                            <a href="#">Computer</a>
                          </li>
                        </ul>
                      </li>

                      <li className="flyout-left">
                        <a href="#">Flyout Left</a>
                        <ul className="animated fadeIn">
                          <li>
                            <a href="#">Mobile</a>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <a href="#">No Flyout</a>
                      </li>
                    </ul>
                  </li>

                  <li className="drop-down">
                    {" "}
                    <img src=" https://as1.ftcdn.net/v2/jpg/03/45/76/34/500_F_345763477_0O9FnjtEiHEfkTSA0BtBj73Le9wQpjcg.jpg" />{" "}
                    <a href="#" className="main-flyout">
                      HCV
                    </a>
                    <ul className="drop-down-ul animated fadeIn">
                      <li className="flyout-right ">
                        <a href="#">Flyout Right</a>
                        <ul className="animated fadeIn">
                          <li>
                            <a href="#">Mobile</a>
                          </li>
                          <li>
                            <a href="#">Computer</a>
                          </li>
                        </ul>
                      </li>

                      <li className="flyout-left">
                        <a href="#">Flyout Left</a>
                        <ul className="animated fadeIn">
                          <li>
                            <a href="#">Mobile</a>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <a href="#">No Flyout</a>
                      </li>
                    </ul>
                  </li>

                  <li className="drop-down">
                    {" "}
                    <img src="  https://cdn-icons-png.flaticon.com/512/353/353737.png" />
                    <a href="#" className="main-flyout">
                      {" "}
                      Agriculture
                    </a>
                    <ul className="drop-down-ul animated fadeIn">
                      <li className="flyout-right ">
                        <a href="#">Flyout Right</a>
                        <ul className="animated fadeIn">
                          <li>
                            <a href="#">Mobile</a>
                          </li>
                          <li>
                            <a href="#">Computer</a>
                          </li>
                        </ul>
                      </li>

                      <li className="flyout-left">
                        <a href="#">Flyout Left</a>
                        <ul className="animated fadeIn">
                          <li>
                            <a href="#">Mobile</a>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <a href="#">No Flyout</a>
                      </li>
                    </ul>
                  </li>

                  <li className="drop-down">
                    {" "}
                    <img src=" https://cdn-icons-png.flaticon.com/512/3964/3964237.png" />{" "}
                    <a href="#" className="main-flyout">
                      Construction
                    </a>
                    <ul className="drop-down-ul animated fadeIn">
                      <li className="flyout-right ">
                        <a href="#">Flyout Right</a>
                        <ul className="animated fadeIn">
                          <li>
                            <a href="#">Mobile</a>
                          </li>
                          <li>
                            <a href="#">Computer</a>
                          </li>
                        </ul>
                      </li>

                      <li className="flyout-left">
                        <a href="#">Flyout Left</a>
                        <ul className="animated fadeIn">
                          <li>
                            <a href="#">Mobile</a>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <a href="#">No Flyout</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </ul>

            <ul className="main-ul">
              <p>Main menu</p>

              <li>
                <a href="#">Home </a>
              </li>
              <li>
                <a href="#">Latest News</a>{" "}
              </li>
              <li>
                <a href="#">Latest Launches </a>
              </li>
              <li>
                <a href="#">Careers </a>
              </li>
              <li>
                <a href="#">Events </a>
              </li>
              <li>
                <a href="#">Business </a>
              </li>
              <li>
                <a href="#">FAQs </a>
              </li>
              <li>
                <a href="#">Contact Us </a>
              </li>
              <li>
                <a href="#">Auto Forum & Community </a>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Navbar;
