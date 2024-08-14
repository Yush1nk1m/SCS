import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Question } from "../../types/question";
import { Action, ActionSortOption } from "../../types/action";
import ActionSortingOptions from "../../components/ActionSortingOptions/ActionSortingOptions";
import { fetchActions, fetchQuestion } from "../../services/question";
import "./QuestionPage.css";
import Pagination from "../../components/Pagination/Pagination";
import ActionCard from "../../components/ActionCard/ActionCard";

const QuestionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<Question>();
  const [actions, setActions] = useState<Action[]>([]);
  const [sortOption, setSortOption] = useState<ActionSortOption>({
    sort: "updatedAt",
    order: "DESC",
  });
  const [searchInput, setSearchInput] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (id) {
      fetchQuestionData(id);
      fetchActionsData(id);
    }
  }, [id, sortOption, currentPage]);

  const fetchQuestionData = async (questionId: string) => {
    try {
      const response = await fetchQuestion(questionId);
      setQuestion(response.question);
    } catch (error) {
      console.error("질문을 불러오기 실패:", error);
      alert("질문을 불러오는 데 실패했습니다. 다시 한번 시도해 주세요.");
    }
  };

  const fetchActionsData = async (questionId: string, search?: string) => {
    try {
      const response = await fetchActions(questionId, {
        ...sortOption,
        search,
        page: currentPage,
        limit: 12,
      });
      setActions(response.actions);
      setTotalPages(Math.ceil(response.total / 12));
    } catch (error) {
      console.error("액션 불러오기 실패:", error);
      alert("액션을 불러오는 데 실패했습니다. 다시 한번 시도해 주세요.");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    if (id) {
      fetchActionsData(id, searchInput);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="question-page">
      <div className="content-wrapper">
        <button className="back-button" onClick={() => navigate("/section")}>
          섹션 페이지로 돌아가기
        </button>
        {question && (
          <div className="question-content">
            <h1>{question.content}</h1>
            <p>작성자: {question.writer?.nickname || "알 수 없음"}</p>
          </div>
        )}
        <div className="actions-header">
          <ActionSortingOptions
            sortOption={sortOption}
            onSortChange={setSortOption}
          />
          <div className="search-container">
            <input
              type="text"
              placeholder="액션 검색..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={handleSearch} className="search-button">
              검색
            </button>
          </div>
        </div>
        <div className="actions-list">
          {actions.map((action) => (
            <ActionCard
              key={action.id}
              title={action.title}
              imageUrl={action.imageUrls?.[0]}
              likeCount={action.likeCount}
              createdAt={action.createdAt}
              writer={action.writer}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <button
          className="create-action-button"
          onClick={() => navigate(`/question/${id}/create-action`)}
        >
          새 액션 작성
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;
