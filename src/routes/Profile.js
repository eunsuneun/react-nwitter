import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Profile = ({ refreshUser, userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    refreshUser();
  };
  const getMyNweets = async () => {
    const nweets = await query(collection(dbService, "nweets"), orderBy("createdAt"), where("creatorId", "==", userObj.uid));
    const querySnapshot = await getDocs(nweets);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
    });
  };
  const onChangeDisplayName = (e) => {
    setNewDisplayName(e.target.value);
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    if(userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName
      });
      refreshUser();
    }
  };
  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <div className="container">
      <form onSubmit={onSubmitForm} className="profileForm">
        <input
          type="text"
          placeholder="display name"
          value={newDisplayName}
          onChange={onChangeDisplayName}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;