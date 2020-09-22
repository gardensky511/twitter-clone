import React from "react";
import { databaseService } from "firebaseConfig";

function Tweet({ tweetObject, isOwner }) {
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      await databaseService.doc(`tweets/${tweetObject.id}`).delete();
    }
  };

  return (
    <div>
      <h4>{tweetObject.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Tweet</button>
          <button>Edit Tweet</button>
        </>
      )}
    </div>
  );
}

export default Tweet;
