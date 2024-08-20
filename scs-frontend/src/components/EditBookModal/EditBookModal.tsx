import React, { useState } from "react";
import { updateBook } from "../../api/bookApi";
import toast from "react-hot-toast";
import "./EditBookModal.css";

interface EditBookModalProps {
  bookId: number;
  initialTitle: string;
  initialDescription: string;
  onClose: () => void;
  onUpdate: () => void;
}

const EditBookModal: React.FC<EditBookModalProps> = ({
  bookId,
  initialTitle,
  initialDescription,
  onClose,
  onUpdate,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBook(bookId, { title, description });
      toast.success("문제집이 수정되었습니다.");
      onUpdate();
      onClose();
    } catch (error: any) {
      console.error("문제집 수정 실패:", error);
      switch (error.status) {
        case 401:
          toast.error("로그인이 필요합니다.");
          break;
        case 403:
          toast.error("권한이 존재하지 않습니다.");
          break;
        case 404:
          toast.error("문제집이 존재하지 않습니다.");
          break;
        default:
          toast.error("예기치 못한 에러가 발생했습니다.");
      }
    }
  };

  return (
    <div className="edit-book-modal-overlay">
      <div className="edit-book-modal">
        <h2>문제집 수정</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description">설명</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="edit-book-modal-buttons">
            <button type="submit">수정</button>
            <button type="button" onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;
