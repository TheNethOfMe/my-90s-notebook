import React from "react";

const FriendPanel = ({ id, type, first, last, nick }) => {
  const returnClass = () => `friend__panel friend__panel-${type}`;

  return (
    <div className={returnClass()}>
      <h5>
        {first}
        {nick ? ` "${nick}" ` : " "}
        {last}
      </h5>
      {type === "mutual" && <p>Is Your Friend</p>}
      {type === "pending" && <p>Friend Request Sent</p>}
      {type === "recieved" && <p>Wants to be your friend.</p>}
    </div>
  );
};

export default FriendPanel;
