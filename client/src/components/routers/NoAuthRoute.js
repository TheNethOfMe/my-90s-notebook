import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const NoAuthRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  return (
    <div className="noauth">
      <div className="noauth__notebook">
        <Route
          {...rest}
          render={props =>
            isAuthenticated ? (
              <Redirect to="/dashboard" />
            ) : (
              <Component {...props} />
            )
          }
        />
      </div>
    </div>
  );
};

export default NoAuthRoute;
