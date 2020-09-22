import React, { useState, useEffect } from "react";
import { databaseService } from "firebaseConfig";
import Tweet from "components/Tweet";

function Home({ userObject }) {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    databaseService.collection("tweets").onSnapshot(snapshot => {
      const tweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTweets(tweetArray);
    });
  }, []);

  const onSubmit = async event => {
    event.preventDefault();
    await databaseService.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObject.uid
    });
    setTweet("");
  };
  const onChange = event => {
    const { value } = event.target;
    setTweet(value);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind"
          maxLength={140}
        />
        <input type="submit" value="TWEET" />
      </form>
      <div>
        {tweets.map(tweet => (
          <Tweet
            key={tweet.id}
            tweetObject={tweet}
            isOwner={tweet.creatorId === userObject.uid}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
