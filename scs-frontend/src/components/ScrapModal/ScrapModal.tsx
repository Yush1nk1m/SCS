import React, { useState, useEffect } from "react";
import { BookDto } from "../../api/swaggerApi";
import { getMyBooks, saveQuestionToBook } from "../../api/bookApi";
import "./ScrapModal.css";
import toast from "react-hot-toast";

interface ScrapModalProps {
  questionId: number;
  onClose: () => void;
}

const ScrapModal: React.FC<ScrapModalProps> = ({ questionId, onClose }) => {
  const [books, setBooks] = useState<BookDto[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getMyBooks(1, 100, "createdAt", "DESC");
      setBooks(response.books);
    } catch (error: any) {
      switch (error.status) {
        case 401:
          toast.error("로그인이 필요합니다.");
          break;
        default:
          toast.error("예기치 못한 에러가 발생했습니다.");
      }
    }
  };

  const handleScrap = async () => {
    if (selectedBookId) {
      try {
        await saveQuestionToBook(selectedBookId, questionId);
        toast.success("스크랩 성공!");
        onClose();
      } catch (error: any) {
        switch (error.status) {
          case 401:
            toast.error("로그인이 필요합니다.");
            break;
          case 403:
            toast.error("해당 문제집에 접근 권한이 없습니다.");
            break;
          case 404:
            toast.error("문제집 또는 질문이 더이상 존재하지 않습니다.");
            break;
          case 409:
            toast.error("질문이 이미 문제집에 저장되어 있습니다.");
            break;
          default:
            toast.error("예기치 못한 에러가 발생했습니다.");
        }
      }
    }
  };

  return (
    <div className="scrap-modal-overlay">
      <div className="scrap-modal">
        <h2>스크랩할 문제집 선택</h2>
        <select
          value={selectedBookId || ""}
          onChange={(e) => setSelectedBookId(Number(e.target.value))}
        >
          <option value="">문제집 선택</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>
        <div className="scrap-modal-actions">
          <button onClick={handleScrap} disabled={!selectedBookId}>
            스크랩
          </button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default ScrapModal;
