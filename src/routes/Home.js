import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection, query, onSnapshot } from "firebase/firestore";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const onChangeInput = ({ target: { value } }) => {
    setNweet(value);
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(dbService, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
    }catch(err){
      console.log(err);
    };
    setNweet("");
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
        <button type="submit">Nweet</button>
      </form>
      <div>
        {nweets.map(nweet => (
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
        ))}
      </div>
    </>
  );
};

export default Home;
