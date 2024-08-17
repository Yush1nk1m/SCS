import React, { useState } from "react";
import { createQuestion } from "../../api/questionApi";
import "./CreateQuestionModal.css";
import toast from "react-hot-toast";

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
      toast.success("질문 생성 성공!");
      onSubmit();
    } catch (error: any) {
      console.error("질문 생성 실패:", error);
      switch (error.status) {
        case 401:
          toast.error("사용자 인증에 실패했습니다.");
          break;
        case 404:
          toast.error("존재하지 않는 섹션입니다.");
          break;
        default:
          toast.error("예기치 못한 에러가 발생했습니다.");
      }
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
