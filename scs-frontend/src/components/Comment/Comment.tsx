import React, { useState } from "react";
import { CommentDto, UserDto } from "../../api/swaggerApi";
import "./Comment.css";

interface CommentProps {
  comment: CommentDto;
  currentUser: UserDto | undefined;
  onUpdate: (commentId: number, content: string) => void;
  onDelete: (commentId: number) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  currentUser,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleEdit = () => {
    onUpdate(comment.id, editedContent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      onDelete(comment.id);
    }
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <strong>{comment.writer.nickname}</strong>
        <span>{new Date(comment.createdAt).toLocaleString()}</span>
      </div>
      {isEditing ? (
        <div className="comment-edit">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="comment-edit-buttons">
            <button onClick={handleEdit}>저장</button>
            <button onClick={() => setIsEditing(false)}>취소</button>
          </div>
        </div>
      ) : (
        <>
          <p className="comment-content">{comment.content}</p>
          {currentUser && currentUser.id === comment.writer.id && (
            <div className="comment-buttons">
              <button onClick={() => setIsEditing(true)}>수정</button>
              <button onClick={handleDelete}>삭제</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Comment;
