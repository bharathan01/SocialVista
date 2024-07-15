import React, { useContext } from "react";
import { CreateNewPostContext } from "../../hooks/contexts/createpost/CreatePost";

function Settings() {
  const { toggleIslogOutCard } = useContext(CreateNewPostContext);
  return (
    <div className="w-full flex flex-col gap-3">
      <ul className="menu bg-base-200">
        <li>
          <a>Activity</a>
        </li>
        <li>
          <a>Archive</a>
        </li>
        <li>
          <a>Saved</a>
        </li>
        <li>
          <a>Notification</a>
        </li>
        <li>
          <a>Account Privacy</a>
        </li>
        <li>
          <a>Blocked</a>
        </li>
      </ul>
      <ul className="menu bg-base-200">
        <li>
          <a>Privacy and Policy</a>
        </li>
        <li>
          <a>Help Center</a>
        </li>
      </ul>
      <ul className="menu bg-base-200">
        <li
          className="text-red-600"
          onClick={() => toggleIslogOutCard("openLogOutcard")}
        >
          <a>Log Out</a>
        </li>
        <li className="text-red-600">
          <a>Delete Account</a>
        </li>
      </ul>
    </div>
  );
}

export default Settings;
