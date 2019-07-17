import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import ProfileForm from "./ProfileForm";
import Spinner from "../common/Spinner";

const Settings = () => {
  const authContext = useContext(AuthContext);
  const { loadUser, profile, updateProfile, loading } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onSubmit = profileData => {
    console.log(profileData);
    updateProfile(profileData);
  };

  const display = () => {
    if (loading || !profile) {
      return <Spinner />;
    } else {
      return (
        <ProfileForm
          profile={profile}
          handleSubmit={onSubmit}
          isRegisterForm={false}
        />
      );
    }
  };

  return (
    <div>
      <h2>Settings</h2>
      {display()}
    </div>
  );
};

export default Settings;
