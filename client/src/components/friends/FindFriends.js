import React, { useState, useContext, useEffect, Fragment } from "react";
import FriendContext from "../../context/friend/friendContext";

import TextFieldGroup from "../common/TextFieldGroup";
import Spinner from "../common/Spinner";
import FoundProfile from "./FoundProfile";

const FindFriends = () => {
  const friendContext = useContext(FriendContext);
  const {
    loading,
    searchByEmail,
    searchForFriends,
    searchResults
  } = friendContext;

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  const [searchState, updateSearchState] = useState({
    searchType: "name",
    email: "",
    first: "",
    last: "",
    nick: ""
  });

  const updateField = e => {
    updateSearchState({ ...searchState, [e.target.name]: e.target.value });
  };

  const submitForm = e => {
    e.preventDefault();
    if (searchState.searchType === "email") {
      searchByEmail(searchState.email);
    } else {
      const formData = {
        firstName: searchState.first,
        lastName: searchState.last,
        nickName: searchState.nick
      };
      searchForFriends(formData);
    }
  };

  const formSelect = form => {
    updateSearchState({ ...searchState, searchType: form });
  };

  const displayForm = () => {
    if (searchState.searchType === "email") {
      return (
        <Fragment>
          <TextFieldGroup
            name="email"
            placeholder="test@test.com"
            value={searchState.email}
            label="Email"
            onChange={updateField}
          />
        </Fragment>
      );
    }
    if (searchState.searchType === "name") {
      return (
        <Fragment>
          <TextFieldGroup
            name="first"
            placeholder="James"
            value={searchState.first}
            label="First Name"
            onChange={updateField}
          />
          <TextFieldGroup
            name="last"
            placeholder="Howlett"
            value={searchState.last}
            label="Last Name"
            onChange={updateField}
          />
          <TextFieldGroup
            name="nick"
            placeholder="Wolverine"
            value={searchState.nick}
            label="Nick Name"
            onChange={updateField}
          />
        </Fragment>
      );
    }
  };

  const displayResults = () => {
    if (loading) {
      return <Spinner />;
    } else if (!searchResults || !searchResults.length) {
      return <p>No Profiles to Display!</p>;
    } else {
      return searchResults.map(result => {
        return <FoundProfile key={result._id} profile={result} />;
      });
    }
  };

  return (
    <div className="friend__search-area">
      <div className="friend__forms">
        <h3>Search for Friends</h3>
        <div className="friend__form-picker">
          <h4
            className={searchState.searchType === "email" ? "selected" : ""}
            onClick={() => formSelect("email")}
          >
            Search By Email
          </h4>
          <h4
            className={searchState.searchType === "name" ? "selected" : ""}
            onClick={() => formSelect("name")}
          >
            Search By Name
          </h4>
        </div>
        <form onSubmit={submitForm}>
          {displayForm()}
          <button className="input__submit">Find Friend</button>
        </form>
      </div>
      <div className="friend__form-results">{displayResults()}</div>
    </div>
  );
};

export default FindFriends;
