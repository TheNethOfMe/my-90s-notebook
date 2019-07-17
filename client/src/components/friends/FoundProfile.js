import React, { useContext, useState, useEffect } from "react";
import FriendContext from "../../context/friend/friendContext";

const FoundProfile = ({ profile }) => {
  const { firstName, lastName, nickName, user } = profile;

  const friendContext = useContext(FriendContext);
  const {
    mutualFriends,
    requestsYouSent,
    requestsTheySent,
    createFriendRequest
  } = friendContext;

  const [relationship, setRelationship] = useState({
    status: "none"
  });

  const isUserOnList = list => {
    let result = false;
    for (let i = 0; i < list.length; i++) {
      if (list[i].friendUserId === user) {
        result = true;
      }
    }
    return result;
  };

  useEffect(() => {
    if (isUserOnList(mutualFriends)) {
      setRelationship({ status: "mutual" });
    }
    if (isUserOnList(requestsYouSent)) {
      setRelationship({ status: "sent" });
    }
    if (isUserOnList(requestsTheySent)) {
      setRelationship({ status: "recieved" });
    }
    // eslint-disable-next-line
  }, [mutualFriends, requestsYouSent, requestsTheySent]);

  const sendRequest = () => {
    createFriendRequest(user);
  };

  return (
    <div>
      <h4>
        {firstName}
        {nickName ? ` "${nickName}" ` : " "}
        {lastName}
      </h4>
      {relationship.status === "none" && (
        <button onClick={sendRequest}>Send Friend Request?</button>
      )}
      {relationship.status === "mutual" && <p>Mutual Friends</p>}
      {relationship.status === "sent" && <p>Friend Request Sent</p>}
      {relationship.status === "recieved" && <p>Wants to be your friend.</p>}
    </div>
  );
};

export default FoundProfile;
