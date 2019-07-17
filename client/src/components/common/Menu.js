import React from "react";
import { Link } from "react-router-dom";

export default ({ hide, themebg }) => (
  <div id="menu__display" className={hide ? `${themebg} hide` : themebg}>
    <Link to="/dashboard">
      <img
        className={hide ? "menu__button hide" : "menu__button"}
        src="/images/DashboardButton.png"
        alt="Dashboard"
      />
    </Link>
    <Link to="/friends">
      <img
        className={hide ? "menu__button hide" : "menu__button"}
        src="/images/MyFriendsButton.png"
        alt="My Friends"
      />
    </Link>
    <Link to="/postDash">
      <img
        className={hide ? "menu__button hide" : "menu__button"}
        src="/images/PostsButton.png"
        alt="My Posts"
      />
    </Link>
  </div>
);
