import React, { useEffect, useState } from "react";
import { dbService, storageService } from "fbase";
import { addDoc, collection, query, onSnapshot } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import Nweet from "components/Nweet";
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");

  const onChangeInput = ({ target: { value } }) => {
    setNweet(value);
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    let attachmentUrl;
    if(attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      await uploadString(attachmentRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(ref(storageService, attachmentRef));
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl
    }
    await addDoc(collection(dbService, "nweets"), nweetObj);
    setNweet("");
    setAttachment("");
  };
  const onChangeFile = (event) => {
    const {target:{files}} = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: { result }} = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClickClearAttachment  = () => {
    setAttachment("");
  };
  useEffect(() => {
    const q = query(collection(dbService, "nweets"));
    onSnapshot(q, (snapshot) => {
      let nweetArray = [];
      nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);
  
  return (
    <>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          maxLength={120}
          placeholder="What's on your mind?"
          value={nweet}
          onChange={onChangeInput}
        />
        <input type="file" accept="image/*" onChange={onChangeFile} />
        <button type="submit">Nweet</button>
        {attachment && (
          <div>
            <img src={attachment} width="50px" />
            <button onClick={onClickClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
            userObj={userObj}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
