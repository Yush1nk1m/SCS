import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ActionSortOption } from "../../types/action";
import ActionSortingOptions from "../../components/ActionSortingOptions/ActionSortingOptions";
import { fetchActions, fetchQuestion } from "../../api/questionApi";
import "./QuestionPage.css";
import Pagination from "../../components/Pagination/Pagination";
import ActionCard from "../../components/ActionCard/ActionCard";
import { useAuth } from "../../hooks/useAuth";
import { ActionDto, QuestionDto } from "../../api/swaggerApi";
import toast from "react-hot-toast";

const QuestionPage: React.FC = () => {
  const isLoggedIn = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<QuestionDto>();
  const [actions, setActions] = useState<ActionDto[]>([]);
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
    } catch (error: any) {
      console.error("질문 불러오기 실패:", error);
      switch (error.status) {
        case 404:
          toast.error("존재하지 않는 질문입니다.");
          break;
        default:
          toast.error("예기치 못한 에러가 발생했습니다.");
      }
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
    } catch (error: any) {
      console.error("액션 불러오기 실패:", error);
      switch (error.status) {
        case 404:
          toast.error("존재하지 않는 질문입니다.");
          break;
        default:
          toast.error("예기치 못한 에러가 발생했습니다.");
      }
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
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="액션 검색..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              검색
            </button>
          </form>
        </div>
        <div className="actions-list">
          {actions.map((action) => (
            <ActionCard
              key={action.id}
              id={action.id}
              title={action.title}
              imageUrl={action.imageUrls?.[0]}
              likeCount={action.likeCount}
              createdAt={action.createdAt}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        {isLoggedIn && (
          <button
            className="create-action-button"
            onClick={() => navigate(`/question/${id}/create-action`)}
          >
            새 액션 작성
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
