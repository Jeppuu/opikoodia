import React, { useState } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CommentForm = ({ postId, authorId, addComment }) => {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Create the comment object
      const newComment = {
        postId,
        authorId,
        text,
      };
      // Pass the new comment to the parent component
      addComment(newComment, text);

      // Clear the input field
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}
      className="w-full p-2 flex flex-row text-center">
      <textarea
        className="p-2 text-sm font-light placeholder:font-light bg-bgRGBA border border-gray-300 rounded-tl-lg rounded-bl-lg resize-none w-full focus:outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your comment..."
      ></textarea>
      <button
        className="mr-auto bg-brandGreen border-none rounded-tr-lg rounded-br-lg p-4 text-white text-sm font-light transition duration-300 hover:bg-brandGreenHover"
        type="submit"><FontAwesomeIcon icon={faChevronRight} /></button>
    </form>
  );
};

export default CommentForm;
