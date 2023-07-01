import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../storage/UserContext";
import { logOut } from "../../service/usersService";

const Header = () => {
  const { signedIn, signOutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    const shouldLogOut = window.confirm("Are you sure?");
    if (shouldLogOut) {
      logOut().then(({ data }) => {
        signOutUser(data);
        navigate("/login");
      });
    }
  };

  return (
    <div className="container">
      <header className="p-3 text-bg-black">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to="/"
            className="d-flex mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <h3
              className="nav-item px-2"
              style={{
                color: "white",
                fontWeight: "300",
                fontSize: "1cm",
              }}
            >
              Galleries
            </h3>
          </Link>
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 align-items-center justify-content-center mb-md-0">
            {signedIn ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-link px-2 text-white"
                    aria-current="page"
                  >
                    All Galleries
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/my-galleries"
                    className="nav-link px-2 text-white"
                    aria-current="page"
                  >
                    My Galleries
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/create"
                    className="nav-link px-2 text-white"
                    aria-current="page"
                  >
                    Create New Gallery
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link" aria-current="page">
                    <button
                      className="btn button-81"
                      type="submit"
                      onClick={() => handleLogOut()}
                    >
                      Log Out
                    </button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-link px-2 text-white"
                    aria-current="page"
                  >
                    All Galleries
                  </Link>
                </li>{" "}
                <li
                  className="nav-item"
                  style={{ textAlign: "right", border: "0" }}
                >
                  <Link to="/login" className="nav-link">
                    <button className="btn button-81" type="submit">
                      Log in
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    <button className="btn button-81" type="submit">
                      Register
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
};
export default Header;
