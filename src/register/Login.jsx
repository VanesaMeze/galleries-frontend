import { useState, useContext } from "react";
import UserContext from "../storage/UserContext";
import { logIn } from "../service/usersService";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const { signInUser } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    logIn(user.email, user.password)
      .then(({ data }) => {
        signInUser(data);
        localStorage.setItem("access_token", data.authorisation.token);
        localStorage.setItem("email", user.email);
        localStorage.setItem("password", user.password);
        setError("");
        navigate("/");
      })
      .catch((error) => {
        setError("Invalid email or password. Please try again.");
        console.log(error);

        return;
      });

    setUser({
      email: "",
      password: "",
    });
  };

  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <>
      <br />
      <br />
      <div>
        <form
          data-bs-theme="dark"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="container "
          style={{ width: "500px", color: "rgb(229,228,226)" }}
        >
          <h1 className="h3 mb-3 fw-normal">Please log in:</h1>
          {error && (
            <div className="alert alert-danger mb-4" role="alert">
              {error}
            </div>
          )}
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              value={user.email}
              onChange={handelInputChange}
            />
            <label htmlFor="floatingInput">Email address</label>
            <br />
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              name="password"
              value={user.password}
              onChange={handelInputChange}
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>{" "}
          <br />
          <button className="btn btn-outline-light w-100 py-2" type="submit">
            Log in
          </button>
          <br />
          <br />
          <p className="mb-5 pb-lg-2 text-center">
            Don't have account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </>
  );
};
export default LogIn;
