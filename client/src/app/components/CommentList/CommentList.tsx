import React from "react";
interface CommentListProps {
  comments: { id: string; content: string }[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
};

export default CommentList;
