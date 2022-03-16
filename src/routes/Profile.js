import { authService } from "fbase";
import React from "react";

const Profile = () => {
  const onLogOutClick = () => {
    return authService.signOut();
  }
  return (
    <>
      <h1>Profile</h1>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  )
};

export default Profile;