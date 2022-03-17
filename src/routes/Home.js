import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, query, onSnapshot } from "firebase/firestore";
import NweetFactory from "components/NweetFactory";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
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
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
            userObj={userObj}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
