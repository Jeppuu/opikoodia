import React from "react";
import Comment from "./Comment";

const CommentList = ({ comments, setComments }) => {
  const handleDeleteComment = (commentId) => {
    // Filter the comments to remove the deleted comment
    const updatedComments = comments.filter((comment) => comment._id !== commentId);
    setComments(updatedComments);
  };

  return (
    <div className="w-full p-2 flex flex-col items-start justify-start">
      {comments.map((comment, index) => (
        <Comment
          key={`${comment._id}-${index}`}
          comment={comment}
          handleDeleteComment={handleDeleteComment}
        />
      ))}
    </div>
  );
};

export default CommentList;
