import React, { useState } from "react";
import { createQuestion } from "../../services/questionApi";
import "./CreateQuestionModal.css";

interface CreateQuestionModalProps {
  sectionId: number;
  onClose: () => void;
  onSubmit: () => void;
}

const CreateQuestionModal: React.FC<CreateQuestionModalProps> = ({
  sectionId,
  onClose,
  onSubmit,
}) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createQuestion(content, sectionId);
      onSubmit();
    } catch (error) {
      console.error("질문 생성 실패:", error);
      alert("질문을 등록하는 데 실패했습니다. 다시 한번 시도해 주세요.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>새 질문 등록</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="질문 내용을 입력하세요."
            required
          />
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

export default CreateQuestionModal;
