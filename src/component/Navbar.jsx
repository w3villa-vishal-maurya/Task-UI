import React, { useContext, useEffect, useState, useRef } from "react";
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const SEARCH_USER = "/searchUsers";

const Navbar = () => {
  const { isLogin, setIsLogin, auth } = useContext(AuthContext);
  const [searchUserData, setSearchUserData] = useState();
  const searchRef = useRef();

  useEffect(() => {
    initMDB({ Dropdown, Collapse });
  }, []);

  const navigate = useNavigate();

  const handleLogoutReq = async () => {
    // sessionStorage.setItem(
    //     "email",
    //     JSON.stringify({ "email": null, password: null, "accessToken": null })
    // );
    function delete_cookie(name) {
      document.cookie =
        name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
    delete_cookie("email");
    // console.log("Log out");
    // // alert("You have been logged out!!!");
    navigate("/login");

    setIsLogin(false);
    window.location.reload(false);
  };

  const handleUserSearch = async () => {
    try {
      const response = await axios.post(
        SEARCH_USER,
        { name: searchRef.current.value },
        {
          headers: { Authorization: auth.accessToken },
        }
      );

      setSearchUserData(response.data?.allUser);
    } catch (err) {
      if (!err?.response) {
        console.log(err.response);
      }
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg nav-bg-color ">
        <div className="container-fluid ">
          <button
            data-mdb-collapse-init
            className="navbar-toggler"
            type="button"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <a className="navbar-brand mt-2 mt-lg-0" href="/">
              Task Management
            </a>
          </div>

          {!isLogin ? (
            <div className="d-flex align-items-center">
              <a className="link-secondary me-3" href="/login">
                <img
                  src="images/img10.jpg"
                  className="rounded-circle"
                  height="25"
                  alt="Black and White Portrait of a Man"
                  loading="lazy"
                />
              </a>
            </div>
          ) : (
            <div className="d-flex align-items-center space">
              <form class=" form-inline my-2 my-lg-0 ">
                <input
                  data-mdb-dropdown-init
                  class="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  ref={searchRef}
                  onChange={handleUserSearch}
                />
                <ul
                  className="dropdown-menu dropdown-menu-end set-size"
                  aria-labelledby=""
                >
                  {searchUserData?.map((item, key) => {
                    return (
                      <li>
                        <div className="dropdown-item" key={item._id}>
                          {item.name}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </form>

              <div className="dropdown">
                <div
                  data-mdb-dropdown-init
                  className="dropdown-toggle d-flex align-items-center hidden-arrow"
                  id="navbarDropdownMenuAvatar"
                  role="button"
                  aria-expanded="false"
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="rounded-circle"
                    height="25"
                    alt="Black and White Portrait of a Man"
                    loading="lazy"
                  />
                </div>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuAvatar"
                >
                  <li>
                    <div
                      className="dropdown-item"
                      onClick={() => navigate("/user-profile")}
                    >
                      My profile
                    </div>
                  </li>
                  <li>
                    <div className="dropdown-item" onClick={handleLogoutReq}>
                      Logout
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
