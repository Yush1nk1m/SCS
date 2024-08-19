import React, { useState } from "react";
import "./CreateBookModal.css";
import { createBook } from "../../api/bookApi";
import toast from "react-hot-toast";

interface CreateBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookCreated: () => void;
}

const CreateBookModal: React.FC<CreateBookModalProps> = ({
  isOpen,
  onClose,
  onBookCreated,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("public");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBook(visibility, title, description);
      toast.success("문제집이 생성되었습니다.");
      onBookCreated();
      onClose();
    } catch (error) {
      toast.error("문제집 생성에 실패했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>새 문제집 만들기</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="문제집 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="문제집 설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <select
            value={visibility}
            onChange={(e) =>
              setVisibility(e.target.value as "public" | "private")
            }
          >
            <option value="public">공개</option>
            <option value="private">비공개</option>
          </select>
          <div className="modal-buttons">
            <button type="submit">생성</button>
            <button type="button" onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBookModal;
