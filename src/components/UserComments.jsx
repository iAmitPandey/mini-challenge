import React from "react";

const UserComments = ({
  comments,
  replyHandler,
  deleteReply,
  activeReplyId,
  replyInput,
  handleReplyInput,
  submitReplyHandler,
  setActiveReplyId,
}) => {
  return (
    <ul>
      {comments.length > 0 &&
        comments.map((comment) => (
          <li key={comment.id} style={{ marginLeft: "20px" }}>
            <div>
              {comment.title}
              <button onClick={() => replyHandler(comment.id)}>Reply</button>
              <button onClick={() => deleteReply(comment.id)}>Delete</button>
            </div>
            {activeReplyId === comment.id && (
              <div style={{ marginLeft: "20px" }}>
                <input
                  type="text"
                  value={replyInput}
                  onChange={handleReplyInput}
                />
                <button
                  onClick={() => submitReplyHandler(comment.id)}
                  disabled={replyInput.trim().length === 0}
                >
                  Add
                </button>
                <button onClick={() => setActiveReplyId(null)}>Cancel</button>
              </div>
            )}
            {comment.reply.length > 0 && (
              <UserComments
                comments={comment.reply}
                replyHandler={replyHandler}
                deleteReply={deleteReply}
                activeReplyId={activeReplyId}
                replyInput={replyInput}
                handleReplyInput={handleReplyInput}
                submitReplyHandler={submitReplyHandler}
                setActiveReplyId={setActiveReplyId}
              />
            )}
          </li>
        ))}
    </ul>
  );
};

export default UserComments;
