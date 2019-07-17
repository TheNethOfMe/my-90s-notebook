import React, { useContext, useEffect, useState } from "react";
import FriendContext from "../../context/friend/friendContext";

import SubMenu from "../common/SubMenu";
import Spinner from "../common/Spinner";
import MyFriends from "./MyFriends";
import FindFriends from "./FindFriends";

const FriendDash = () => {
  const friendContext = useContext(FriendContext);
  const {
    loadFriends,
    loading,
    mutualFriends,
    requestsYouSent,
    requestsTheySent
  } = friendContext;

  const [tab, pickTab] = useState({
    selected: "friends"
  });

  useEffect(() => {
    loadFriends();
    // eslint-disable-next-line
  }, []);

  const toggleSelection = selection => {
    pickTab({ selected: selection });
  };

  const tabFriends = [
    {
      title: "Find Friends",
      link: "find"
    },
    {
      title: "My Friends",
      link: "friends"
    }
  ];

  const display = () => {
    if (loading) {
      return <Spinner />;
    } else {
      if (tab.selected === "friends") {
        return (
          <MyFriends
            mutualFriends={mutualFriends}
            requestsYouSent={requestsYouSent}
            requestsTheySent={requestsTheySent}
          />
        );
      }
      if (tab.selected === "find") {
        return <FindFriends />;
      }
    }
  };

  return (
    <div>
      <h2>Friends Page</h2>
      <SubMenu
        tabs={tabFriends}
        tabSelect={toggleSelection}
        selected={tab.selected}
      />
      {display()}
    </div>
  );
};

export default FriendDash;
