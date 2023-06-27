import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../service/usersService";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    emailVerified: true,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    registerUser(
      user.first_name,
      user.last_name,
      user.email,
      user.password,
      user.password_confirmation,
      user.emailVerified
    );
    setUser({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      emailVerified: true,
    });
  };

  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          navigate("/login");
        }}
        className="container"
        style={{ width: "500px", alignItems: "center" }}
      >
        <h1 className="h3 mb-3 fw-normal">Register</h1>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="first_name"
            onChange={handelInputChange}
            value={user.first_name}
            placeholder="First Name"
            required
          />
          <label htmlFor="firstName">First Name</label>
        </div>
        <div className="form-floating mt-3">
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="last_name"
            onChange={handelInputChange}
            value={user.last_name}
            placeholder="Last Name"
            required
          />
          <label htmlFor="lastName">Last Name</label>
        </div>
        <div className="form-floating mt-3">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={handelInputChange}
            value={user.email}
            placeholder="name@example.com"
            required
          />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating mt-3">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handelInputChange}
            value={user.password}
            placeholder="Password"
            pattern="(?=.*\d).{8,}"
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-floating mt-3">
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="password_confirmation"
            onChange={handelInputChange}
            value={user.password_confirmation}
            placeholder="Confirm Password"
            pattern="(?=.*\d).{8,}"
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>
        <div className="form-check text-start my-3">
          <input
            className="form-check-input"
            type="checkbox"
            value="remember-me"
            id="flexCheckDefault"
            required
          />
          <label className="form-check-label" for="flexCheckDefault">
            I Accept Terms and Conditions
          </label>
        </div>
        <button className="btn btn-outline-dark w-100 py-2" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
