import React, { useState, Fragment } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import DropDownGroup from "../common/DropDownGroup";

const ProfileForm = props => {
  // PROPS (profile, handleSubmit, isRegisterForm)

  const [profile, setProfile] = useState({
    email: "",
    password: "",
    password2: "",
    firstName: props.profile ? props.profile.firstName : "",
    lastName: props.profile ? props.profile.lastName : "",
    nickName:
      props.profile && props.profile.nickName ? props.profile.nickName : "",
    bio: props.profile && props.profile.bio ? props.profile.bio : "",
    theme:
      props.profile && props.profile.theme ? props.profile.theme : "paper-cup"
  });

  const onChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const profileData = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      nickName: profile.nickName,
      bio: profile.bio,
      theme: profile.theme
    };
    if (props.isRegisterForm) {
      const userData = {
        email: profile.email,
        password: profile.password,
        password2: profile.password2
      };
      props.handleSubmit(userData, profileData);
    } else {
      props.handleSubmit(profileData);
    }
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
        {props.isRegisterForm && (
          <Fragment>
            <TextFieldGroup
              name="email"
              placeholder="email"
              value={profile.email}
              type="email"
              label="Enter Email (required)"
              onChange={onChange}
            />
            <TextFieldGroup
              name="password"
              placeholder="password"
              value={profile.password}
              type="password"
              label="Enter Password (required)"
              onChange={onChange}
            />
            <TextFieldGroup
              name="password2"
              placeholder="password2"
              value={profile.password2}
              type="password"
              label="Confirm Password (required)"
              onChange={onChange}
            />
          </Fragment>
        )}
        <TextFieldGroup
          name="firstName"
          placeholder="firstName"
          value={profile.firstName}
          label="First Name (required)"
          onChange={onChange}
        />
        <TextFieldGroup
          name="lastName"
          placeholder="lastName"
          value={profile.lastName}
          label="Last Name (required)"
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
          onChange={onChange}
          options={themeOptions}
          selected={profile.theme}
        />
        <input className="input__submit" type="submit" value="Finished!" />
      </form>
    </div>
  );
};

export default ProfileForm;
