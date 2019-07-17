// DELETE
import React, { useContext, useEffect } from "react";
import ProfileContext from "../../context/profile/profileContext";
import ProfileForm from "../settings/ProfileForm";

const FirstTime = () => {
  const profileContext = useContext(ProfileContext);
  const { createProfile, error } = profileContext;

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const onCreateProfile = profileData => {
    createProfile(profileData);
  };

  return (
    <div>
      <h1>Profile Setup</h1>
      <ProfileForm profile={null} handleSubmit={onCreateProfile} />
    </div>
  );
};

export default FirstTime;
