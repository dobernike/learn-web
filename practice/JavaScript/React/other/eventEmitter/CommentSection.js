import React from "react";
import { EventEmmiter } from "./events";

const CommentSection = ({ data, index, commentInput }) => (
  <div className="comments-container">
    {data.comments.map(comment => {
      return (
        <div className="comment">
          <span className="user">{comment.username}&nbsp;</span>
          {comment.text}
        </div>
      );
    })}
    <div className="timestamp">{data.timestamp}</div>
    <div className="add-comment">
      <form
        id={index}
        onSubmit={event => EventEmmiter.dispatch("addComment", event)}
      >
        <input
          className="comment-input"
          type="text"
          placeholder="Add a comment..."
          value={commentInput}
          onChanhe={event => EventEmmiter.dispatch("commentChange", event)}
        />
      </form>
    </div>
  </div>
);
