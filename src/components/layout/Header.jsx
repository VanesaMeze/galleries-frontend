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
      <header className="d-flex flex-wrap justify-content-centerborder-bottom">
        <Link
          to="/"
          className="d-flex mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <h1 className="heading">Galleries</h1>
        </Link>
        <ul className="nav nav-pills">
          {signedIn ? (
            <>
              <li className="nav-item">
                <Link to="/" className="nav-link" aria-current="page">
                  <button
                    className="btn btn-outline-dark w-100 py-2"
                    type="submit"
                  >
                    All Galleries
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/my-galleries"
                  className="nav-link"
                  aria-current="page"
                >
                  <button
                    className="btn btn-outline-dark w-100 py-2"
                    type="submit"
                  >
                    My Galleries
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link" aria-current="page">
                  <button
                    className="btn btn-outline-dark w-100 py-2"
                    type="submit"
                  >
                    Create New Gallery
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link" aria-current="page">
                  <button
                    className="btn btn-outline-danger w-100 py-2"
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
                <Link to="/" className="nav-link" aria-current="page">
                  <button
                    className="btn btn-outline-dark w-100 py-2"
                    type="submit"
                  >
                    All Galleries
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  <button
                    className="btn btn-outline-dark w-100 py-2"
                    type="submit"
                  >
                    Log in
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  <button
                    className="btn btn-outline-dark w-100 py-2"
                    type="submit"
                  >
                    Register
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </div>
  );
};
export default Header;
