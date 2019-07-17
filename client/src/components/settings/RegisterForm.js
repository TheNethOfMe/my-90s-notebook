// OLD FORM TO DELETE
import React, { useState, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import TextFieldGroup from "../common/TextFieldGroup";
import DropDownGroup from "../common/DropDownGroup";

const ProfileForm = props => {
  const authContext = useContext(AuthContext);
  const { user, updateTheme } = authContext;

  const [profile, setProfile] = useState({
    firstName: props.profile ? props.profile.firstName : "",
    lastname: props.profile ? props.profile.lastname : "",
    nickName:
      props.profile && props.profile.nickName ? props.profile.nickName : "",
    bio: props.profile && props.profile.bio ? props.profile.bio : ""
  });

  const onChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const changeTheme = newTheme => {
    updateTheme(newTheme);
  };

  const onSubmit = e => {
    e.preventDefault();
    props.handleSubmit({
      firstName: profile.firstName,
      lastName: profile.lastName,
      nickName: profile.nickName,
      bio: profile.bio
    });
  };

  const themeOptions = [
    {
      val: "paper-cup",
      display: "Paper Cup"
    },
    {
      val: "food-court",
      display: "Food Court"
    },
    {
      val: "frankly-lisa",
      display: "Frankly Lisa"
    },
    {
      val: "old-mac",
      display: "Old Mac"
    },
    {
      val: "tropical",
      display: "Tropical"
    },
    {
      val: "splat",
      display: "Sloppy Splat"
    }
  ];

  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextFieldGroup
          name="firstName"
          placeholder="firstName"
          value={profile.firstName}
          label="First Name"
          onChange={onChange}
        />
        <TextFieldGroup
          name="lastName"
          placeholder="lastName"
          value={profile.lastName}
          label="Last Name"
          onChange={onChange}
        />
        <TextFieldGroup
          name="nickName"
          placeholder="nickName"
          value={profile.nickName}
          label="Nick Name"
          onChange={onChange}
        />
        <div className="input">
          <label className="input__label" htmlFor="bio">
            Tell us about yourself.
          </label>
          <textarea
            className="input__field"
            name="bio"
            onChange={onChange}
            value={profile.bio}
          />
        </div>
        <DropDownGroup
          name="theme"
          label="Choose a theme"
          onChange={changeTheme}
          options={themeOptions}
          selected={user.theme}
        />
        <input className="input__submit" type="submit" value="Finished!" />
      </form>
    </div>
  );
};

export default ProfileForm;
