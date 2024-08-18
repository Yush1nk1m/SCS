import React, { useEffect, useState, useCallback, useRef } from "react";
import { QuestionSortOption } from "../../types/section";
import { fetchQuestions } from "../../api/sectionApi";
import { Link } from "react-router-dom";
import "./QuestionList.css";
import Pagination from "../Pagination/Pagination";
import { useAuth } from "../../hooks/useAuth";
import { QuestionDto, SectionDto } from "../../api/swaggerApi";
import toast from "react-hot-toast";

interface QuestionListProps {
  section: SectionDto;
  onCreateQuestion: () => void;
  onHeightChange: () => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
  section,
  onCreateQuestion,
  onHeightChange,
}) => {
  const isLoggedIn = useAuth();
  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState<QuestionSortOption>({
    sort: "createdAt",
    order: "DESC",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const paginationRef = useRef<HTMLDivElement>(null);

  const fetchQuestionsData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchQuestions(
        section.id,
        page,
        sortOption,
        searchTerm
      );
      setQuestions(response.questions);
      setTotalPages(Math.ceil(response.total / 10));
    } catch (error) {
      console.error("질문 불러오기 실패:", error);
      toast.error("질문을 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
      setTimeout(() => onHeightChange(), 0); // 높이 변경 알림
      const scrollPosition = paginationRef.current?.offsetTop || window.scrollY;
      setTimeout(() => {
        window.scrollTo({ top: scrollPosition, behavior: "smooth" });
      });
    }
  }, [section, page, sortOption, searchTerm, onHeightChange]);

  useEffect(() => {
    fetchQuestionsData();
  }, [fetchQuestionsData]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sort, order] = e.target.value.split("-");
    setSortOption({
      sort: sort as "createdAt" | "saved",
      order: order as "ASC" | "DESC",
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="question-list">
      <div className="question-list-header">
        <input
          type="text"
          placeholder="질문 검색..."
          value={searchTerm}
          onChange={handleSearch}
          className="question-search-input"
        />
        <select
          className="question-sort-select"
          value={`${sortOption.sort}-${sortOption.order}`}
          onChange={handleSortChange}
        >
          <option value="createdAt-DESC">최신순</option>
          <option value="createdAt-ASC">오래된순</option>
          <option value="saved-DESC">스크랩 많은순</option>
          <option value="saved-ASC">스크랩 적은순</option>
        </select>
      </div>
      <div className="question-list-content">
        {isLoading ? (
          <p>질문을 불러오는 중...</p>
        ) : questions.length > 0 ? (
          questions.map((question) => (
            <div key={question.id} className="question-item">
              <Link to={`/question/${question.id}`}>{question.content}</Link>
              <button className="save-button">스크랩</button>
            </div>
          ))
        ) : (
          <p>질문이 없습니다.</p>
        )}
      </div>
      <div ref={paginationRef}>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      {isLoggedIn && (
        <button className="create-question-button" onClick={onCreateQuestion}>
          질문 생성
        </button>
      )}
    </div>
  );
};

export default QuestionList;
