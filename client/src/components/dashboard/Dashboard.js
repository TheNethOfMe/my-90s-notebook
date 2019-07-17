import React, { useContext, useEffect } from "react";
import NoteContext from "../../context/notification/noteContext";
import Spinner from "../common/Spinner";
import SingleNotification from "./SingleNotification";

const Dashboard = () => {
  const noteContext = useContext(NoteContext);
  const { loading, noteList, loadNotes } = noteContext;

  useEffect(() => {
    loadNotes();
    // eslint-disable-next-line
  }, []);

  const dashboardContent = () => {
    if (loading) {
      return <Spinner />;
    } else if (!noteList.length) {
      return <h4>You have no notifications.</h4>;
    } else {
      return noteList.map(note => <SingleNotification note={note} />);
    }
  };

  return (
    <div className="dashbaord">
      <h2>Welcome</h2>
      {dashboardContent()}
    </div>
  );
};

export default Dashboard;
