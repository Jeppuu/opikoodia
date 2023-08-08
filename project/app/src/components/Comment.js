import React from "react";
import { useSession } from "next-auth/react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comment = ({ comment, handleDeleteComment }) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const onDeleteClick = async () => {
    const confirmModal = confirm('Are you sure you want to delete this comment?')
    if (confirmModal) {
      try {
        await fetch(`/api/comment/${comment._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "DELETE",
        });
        handleDeleteComment(comment._id);
      } catch (error) {
        console.log("Error occurred", error);
      }
    }

  };

  return (
    <div className="w-full m-2 bg-bgRGBA rounded-lg border border-gray-300 flex flex-col items-start justify-start text-sm">
      <div className="flex flex-row  p-2 w-full justify-between">
        <p className="pr-2 font-medium">{comment?.authorId?.username}</p>
        {session?.user?._id === comment?.authorId?._id && (
          <button onClick={onDeleteClick}
            className="text-gray-300 transition duration-300 hover:text-red ml-auto">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
      <p className="inline-flex p-2 font-base">{comment?.text}</p>
    </div>
  );
};

export default Comment;
