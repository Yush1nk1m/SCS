import React, { useState } from "react";
import { CommentDto } from "../../api/swaggerApi";
import "./Comment.css";
import { Edit2, Trash2, Check, X } from "lucide-react";

interface CommentProps {
  comment: CommentDto;
  userId: number | null;
  onUpdate: (commentId: number, content: string) => void;
  onDelete: (commentId: number) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  userId,
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
        <strong className="comment-author">
          {comment.writer?.nickname || "탈퇴한 사용자"}
        </strong>
        <span className="comment-date">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>
      {isEditing ? (
        <div className="comment-edit">
          <textarea
            className="comment-edit-textarea"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="comment-edit-buttons">
            <button className="comment-save-button" onClick={handleEdit}>
              <Check size={16} />
              <span>저장</span>
            </button>
            <button
              className="comment-cancel-button"
              onClick={() => setIsEditing(false)}
            >
              <X size={16} />
              <span>취소</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="comment-content">{comment.content}</p>
          {userId === comment.writer?.id && (
            <div className="comment-buttons">
              <button
                className="comment-edit-button"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 size={16} />
                <span>수정</span>
              </button>
              <button className="comment-delete-button" onClick={handleDelete}>
                <Trash2 size={16} />
                <span>삭제</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Comment;
