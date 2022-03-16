import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const Nweet = ({nweetObj, isOwner}) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onClickDelete = async () => {
    const ok = window.confirm("Are you sure you wanna delete this nweet?");
    if(ok) {
      // delete nweet
      await deleteDoc(doc(dbService, "nweets", `${nweetObj.id}`));
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
  useEffect(() => {
    console.log('nweet page componentDidMounted')
  },[])
  return (
    <>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmitForm}>
                <input
                  type="text"
                  placeholder="edit your text"
                  value={newNweet}
                  onChange={onChangeInput}
                  required
                />
                <button onClick={onClickCancel}>cancel</button>
                <input type="submit" value="edit" />
              </form>
            </>
          )}
        </>
      ) : (
        <div style={{ margin: "10px 0" }}>
          <span>{nweetObj.text}</span>
          <p>Creator: {nweetObj.creatorId}</p>
          <p>true or false : {isOwner}</p>
          {isOwner && (
            <>
              <button onClick={toggleEditing}>Edit Nweet</button>
              <button onClick={onClickDelete}>Delete Nweet</button>
            </>
          )}
        </div>
      )}

      <hr />
    </>
  );
};

export default Nweet;