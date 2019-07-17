import React, { useContext, useEffect, Fragment } from "react";
import AuthContext from "../../context/auth/authContext";

const Landing = props => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/dashboard");
    }
  }, [isAuthenticated, props.history]);

  return (
    <Fragment>
      <img
        className="noauth__logo"
        src="images/icons/ninties-logo.png"
        alt="My 90s Notebook"
      />
      <div className="noauth__subheading">
        Social Media and More with 90's Flair!
      </div>
    </Fragment>
  );
};

export default Landing;
