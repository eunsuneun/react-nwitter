import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({userObj}) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
        <p>{userObj.displayName}</p>
      </nav>
    </>
  )
}

export default Navigation;