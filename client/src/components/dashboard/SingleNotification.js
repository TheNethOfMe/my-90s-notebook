import React from "react";

const SingleNotification = note => {
  return (
    <div className="notification__panel">
      <div>{note.message}</div>
    </div>
  );
};

export default SingleNotification;
