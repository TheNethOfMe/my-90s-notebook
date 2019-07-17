import React, { useContext, useEffect, Fragment } from "react";
import AuthContext from "../../context/auth/authContext";
import ProfileForm from "../settings/ProfileForm";

const Register = props => {
  const authContext = useContext(AuthContext);
  const { register, error, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/dashboard");
    }
  }, [error, isAuthenticated, props.history]);

  const onSubmit = (userData, profileData) => {
    let errors = [];
    if (
      !userData.email ||
      !userData.password ||
      !profileData.firstName ||
      !profileData.lastName
    ) {
      errors.push("Please enter all required fields fields.");
    }
    if (userData.password !== userData.password2) {
      errors.push("Your passwords don't match.");
    }
    if (!errors.length) {
      console.log("Register", userData, profileData);
      register(userData, profileData);
    } else {
      console.log(errors);
    }
  };

  return (
    <Fragment>
      <div className="noauth__subheading">
        <div className="noauth__form">
          <h1>Register</h1>
          <ProfileForm
            profile={null}
            handleSubmit={onSubmit}
            isRegisterForm={true}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
