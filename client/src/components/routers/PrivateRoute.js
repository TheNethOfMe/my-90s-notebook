import React, { useContext, useEffect, useState, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const PrivateRoute = ({ component: Component, context: Context, ...rest }) => {
  if (!Context) {
    Context = Fragment;
  }
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, profile, loadUser } = authContext;

  const [themes, setThemes] = useState({
    bgTheme: `main-background-paper-cup`,
    subBgTheme: `sub-background-paper-cup`
  });

  useEffect(() => {
    if (!profile) {
      loadUser();
    } else {
      setThemes({
        bgTheme: `main-background-${profile.theme}`,
        subBgTheme: `sub-background-${profile.theme}`
      });
    }
    // eslint-disable-next-line
  }, [profile]);

  const { bgTheme, subBgTheme } = themes;

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Context>
            <div id="main" className={bgTheme}>
              <div id="sub-main" className={subBgTheme}>
                <Component {...props} />
              </div>
            </div>
          </Context>
        )
      }
    />
  );
};

export default PrivateRoute;
