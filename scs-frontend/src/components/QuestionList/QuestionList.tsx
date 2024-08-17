import React, { useEffect, useState } from "react";
import { QuestionSortOption } from "../../types/section";
import { fetchQuestions } from "../../api/sectionApi";
import { Link } from "react-router-dom";
import "./QuestionList.css";
import Pagination from "../Pagination/Pagination";
import { useAuth } from "../../hooks/useAuth";
import { QuestionDto } from "../../api/swaggerApi";

interface QuestionListProps {
  sectionId: number;
  onCreateQuestion: () => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
  sectionId,
  onCreateQuestion,
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

  useEffect(() => {
    fetchQuestionsData();
  }, [sectionId, page, sortOption]);

  const fetchQuestionsData = async () => {
    try {
      const response = await fetchQuestions(
        sectionId,
        page,
        sortOption,
        searchTerm
      );
      setQuestions(response.questions);
      setTotalPages(Math.ceil(response.total / 10));
    } catch (error) {
      console.error("질문 불러오기 실패:", error);
      alert("질문을 불러오는 데 실패했습니다. 다시 조회해 주세요.");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchQuestionsData();
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sort, order] = e.target.value.split("-");
    setSortOption({
      sort: sort as "createdAt" | "saved",
      order: order as "ASC" | "DESC",
    });
  };

  return (
    <div className="question-list">
      <div className="question-list-header">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="질문 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            검색
          </button>
        </form>
        <select
          className="sort-select"
          value={`${sortOption.sort}-${sortOption.order}`}
          onChange={handleSortChange}
        >
          <option value="createdAt-DESC">최신순</option>
          <option value="createdAt-ASC">오래된순</option>
          <option value="saved-DESC">스크랩 많은순</option>
          <option value="saved-ASC">스크랩 적은순</option>
        </select>
      </div>
      {questions.map((question: QuestionDto) => (
        <div key={question.id} className="question-item">
          <Link to={`/question/${question.id}`}>{question.content}</Link>
          <button className="save-button" onClick={() => console.log("스크랩")}>
            스크랩
          </button>
        </div>
      ))}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      {isLoggedIn && (
        <button className="create-question-button" onClick={onCreateQuestion}>
          질문 생성
        </button>
      )}
    </div>
  );
};

export default QuestionList;
