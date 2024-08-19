import React, { useEffect, useState, useCallback, useRef } from "react";
import { fetchQuestions } from "../../api/sectionApi";
import { Link } from "react-router-dom";
import "./QuestionList.css";
import Pagination from "../Pagination/Pagination";
import { useAuth } from "../../hooks/useAuth";
import { QuestionDto, SectionDto } from "../../api/swaggerApi";
import toast from "react-hot-toast";
import SearchForm from "../SearchForm/SearchForm";
import SortingOptions from "../SortingOptions/SortingOptions";
import { QuestionSortOption } from "../../types/question";

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

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="question-list">
      <div className="question-list-header">
        <SearchForm onSearch={handleSearch} placeholder="질문 검색 ..." />
        <SortingOptions<QuestionSortOption>
          sortOption={sortOption}
          onSortChange={setSortOption}
          options={[
            { value: "createdAt-DESC", label: "최신순" },
            { value: "createdAt-ASC", label: "오래된순" },
            { value: "saved-DESC", label: "스크랩 높은 순" },
            { value: "saved-ASC", label: "스크랩 낮은 순" },
          ]}
        />
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
