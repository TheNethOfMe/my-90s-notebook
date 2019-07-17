import React, { useState, useContext, useEffect, Fragment } from "react";
import AuthContext from "../../context/auth/authContext";
import TextFieldGroup from "../common/TextFieldGroup";

const Login = props => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, login, error } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/dashboard");
    }
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      console.log("Error Occured!");
    } else {
      login({ email, password });
    }
  };

  return (
    <Fragment>
      <img
        className="noauth__logo"
        src="images/icons/ninties-logo.png"
        alt="My 90s Notebook"
      />
      <div className="noauth__subheading">
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <TextFieldGroup
            name="email"
            placeholder="email"
            value={email}
            label="Email"
            onChange={onChange}
          />
          <TextFieldGroup
            name="password"
            placeholder="password"
            value={password}
            type="password"
            label="Password"
            onChange={onChange}
          />
          <input className="input__submit" type="submit" value="Log In" />
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
