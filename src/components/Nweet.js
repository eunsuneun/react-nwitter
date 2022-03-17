import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner, userObj }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onClickDelete = async () => {
    const ok = window.confirm("Are you sure you wanna delete this nweet?");
    if(ok) {
      // delete nweet
      await deleteDoc(doc(dbService, "nweets", `${nweetObj.id}`));
      await deleteObject(ref(storageService, nweetObj.attachmentUrl));
    }
  };
  const toggleEditing = () => setEditing( prev => !prev );
  const onSubmitForm = async (e) => {
    e.preventDefault();
    const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
    await updateDoc(NweetTextRef, {
      text: newNweet
    });
    setEditing(false);
  };
  const onChangeInput = (e) => {
    setNewNweet(e.target.value);
  }
  const onClickCancel = (e) => {
    e.preventDefault();
    toggleEditing();
    setNewNweet(nweetObj.text);
  };

  return (
    <div className="nweet">
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmitForm} className="container nweetEdit">
                <input
                  type="text"
                  placeholder="edit your text"
                  value={newNweet}
                  onChange={onChangeInput}
                  required
                  autoFocus
                  className="formInput"
                />
                <button onClick={onClickCancel} className="formBtn cancelBtn">cancel</button>
                <input type="submit" value="edit" className="formBtn"/>
              </form>
            </>
          )}
        </>
      ) : (
        <div style={{ margin: "10px 0" }}>
          <h2>{nweetObj.text}</h2>
          { nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} /> }
          <p>작성자: {nweetObj.creatorId}</p>
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onClickDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </div>
      )}

      <hr />
    </div>
  );
};

export default Nweet;