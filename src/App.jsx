import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import UserComments from "./components/UserComments";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [comments, setComments] = useState([]);
  const [replyInput, setReplyInput] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);

  function handleInput(e) {
    setInputValue(e.target.value);
  }

  function handleReplyInput(e) {
    setReplyInput(e.target.value);
  }

  function submitHandler() {
    if (inputValue.trim()) {
      const id = uuidv4();
      setComments([...comments, { title: inputValue, id, reply: [] }]);
      setInputValue("");
    }
  }

  function submitReplyHandler(commentId) {
    if (replyInput.trim()) {
      const id = uuidv4();
      const newReply = { title: replyInput, id, reply: [] };
      const updatedComments = addReplyToComment(comments, commentId, newReply);
      setComments(updatedComments);
      setReplyInput("");
      setActiveReplyId(null);
    }
  }

  function addReplyToComment(comments, commentId, newReply) {
    return comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, reply: [...comment.reply, newReply] };
      } else if (comment.reply.length > 0) {
        return {
          ...comment,
          reply: addReplyToComment(comment.reply, commentId, newReply),
        };
      }
      return comment;
    });
  }

  function deleteReply(commentId) {
    const updatedComments = deleteCommentOrReply(comments, commentId);
    setComments(updatedComments);
  }

  function deleteCommentOrReply(comments, commentId) {
    return comments
      .filter((comment) => comment.id !== commentId)
      .map((comment) => ({
        ...comment,
        reply: deleteCommentOrReply(comment.reply, commentId),
      }));
  }

  function replyHandler(commentId) {
    setActiveReplyId((prevId) => (prevId === commentId ? null : commentId));
  }

  return (
    <>
      <input type="text" value={inputValue} onChange={handleInput} />
      <button
        type="submit"
        onClick={submitHandler}
        disabled={inputValue.trim().length === 0}
      >
        Add
      </button>
      <ul>
        <UserComments
          comments={comments}
          replyHandler={replyHandler}
          deleteReply={deleteReply}
          activeReplyId={activeReplyId}
          replyInput={replyInput}
          handleReplyInput={handleReplyInput}
          submitReplyHandler={submitReplyHandler}
          setActiveReplyId={setActiveReplyId}
        />
      </ul>
    </>
  );
}

export default App;
