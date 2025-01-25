interface Comment {
  id: string;
  content: string;
  status: "approved" | "pending" | "rejected";
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <ul>
      {comments.map((comment) => {
        let content;

        switch (comment.status) {
          case "approved":
            content = comment.content;
            break;
          case "pending":
            content = "This comment is awaiting moderation.";
            break;
          case "rejected":
            content = "This comment has been rejected.";
            break;
          default:
            content = "Unknown status.";
        }

        return <li key={comment.id}>{content}</li>;
      })}
    </ul>
  );
};

export default CommentList;
