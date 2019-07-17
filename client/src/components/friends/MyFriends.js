import React, { useState, Fragment } from "react";
import FriendPanel from "./FriendPanel";

const MyFriends = ({ mutualFriends, requestsYouSent, requestsTheySent }) => {
  const [isVisable, toggleVisible] = useState({
    mutual: true,
    recieved: true,
    sent: false
  });

  const mutuals = mutualFriends.map(friend => {
    return (
      <FriendPanel
        key={friend.friendUserId}
        id={friend.friendUserId}
        type="mutual"
        first={friend.friendFirstName}
        last={friend.friendLastName}
        nick={friend.friendNickName}
      />
    );
  });

  const sentRequests = requestsYouSent.map(friend => {
    return (
      <FriendPanel
        key={friend.friendUserId}
        id={friend.friendUserId}
        type="pending"
        first={friend.friendFirstName}
        last={friend.friendLastName}
        nick={friend.friendNickName}
      />
    );
  });

  const recievedRequests = requestsTheySent.map(friend => {
    return (
      <FriendPanel
        key={friend.friendUserId}
        id={friend.friendUserId}
        type="recieved"
        first={friend.friendFirstName}
        last={friend.friendLastName}
        nick={friend.friendNickName}
      />
    );
  });

  return (
    <div className="friend__main">
      <div className="friend__buttons">
        <div
          className="friend__selector"
          onClick={() =>
            toggleVisible({ ...isVisable, mutual: !isVisable.mutual })
          }
        >
          <p>Mutual </p>
          {isVisable.mutual ? (
            <i className="far fa-eye" />
          ) : (
            <i className="far fa-eye-slash" />
          )}
        </div>
        <div
          className="friend__selector"
          onClick={() =>
            toggleVisible({ ...isVisable, recieved: !isVisable.recieved })
          }
        >
          <p>Requests </p>
          {isVisable.recieved ? (
            <i className="far fa-eye" />
          ) : (
            <i className="far fa-eye-slash" />
          )}
        </div>
        <div
          className="friend__selector"
          onClick={() => toggleVisible({ ...isVisable, sent: !isVisable.sent })}
        >
          <p>Pending </p>
          {isVisable.sent ? (
            <i className="far fa-eye" />
          ) : (
            <i className="far fa-eye-slash" />
          )}
        </div>
      </div>
      <div className="friend__display">
        {isVisable.recieved && <Fragment>{recievedRequests}</Fragment>}
        {isVisable.mutual && <Fragment>{mutuals}</Fragment>}
        {isVisable.sent && <Fragment>{sentRequests}</Fragment>}
      </div>
    </div>
  );
};

export default MyFriends;
