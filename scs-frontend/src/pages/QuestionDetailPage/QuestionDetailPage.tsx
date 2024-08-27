import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ActionSortOption } from "../../types/action";
import { fetchActions, fetchQuestion } from "../../api/questionApi";
import Pagination from "../../components/Pagination/Pagination";
import ActionCard from "../../components/ActionCard/ActionCard";
import { useAuth } from "../../hooks/useAuth";
import { ActionDto, QuestionDto } from "../../api/swaggerApi";
import toast from "react-hot-toast";
import SortingOptions from "../../components/SortingOptions/SortingOptions";
import SearchForm from "../../components/SearchForm/SearchForm";
import "./QuestionDetailPage.css";
import { ArrowLeft, PlusCircle, User } from "lucide-react";

const QuestionDetailPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");
  const sourceId = queryParams.get("id");

  const { id } = useParams<{ id: string }>();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<QuestionDto>();
  const [actions, setActions] = useState<ActionDto[]>([]);
  const [sortOption, setSortOption] = useState<ActionSortOption>({
    sort: "updatedAt",
    order: "DESC",
  });
  const [currentPage, setCurrentPage] = useState(
    !isNaN(Number(queryParams.get("page")))
      ? Number(queryParams.get("page"))
      : 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (id) {
      fetchQuestionData(id);
      fetchActionsData(id);
    }
  }, [id, sortOption, currentPage, searchTerm]);

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

  const fetchActionsData = async (questionId: string) => {
    try {
      const response = await fetchActions(questionId, {
        ...sortOption,
        page: currentPage,
        limit: 12,
        search: searchTerm,
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

  const onSearch = (term: string) => {
    setCurrentPage(1);
    setSearchTerm(term);
  };

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="question-detail-page">
      <div className="question-detail-content-wrapper">
        {source === "section" ? (
          <button
            className="question-detail-back-button"
            onClick={() =>
              navigate(
                `/section/${sourceId}/questions?page=${queryParams.get("spage")}`
              )
            }
          >
            <ArrowLeft size={20} />
            <span>질문 목록으로 돌아가기</span>
          </button>
        ) : (
          <button
            className="question-detail-back-button"
            onClick={() => navigate(`/book/${sourceId}`)}
          >
            <ArrowLeft size={20} />
            <span>문제집으로 돌아가기</span>
          </button>
        )}
        {question && (
          <div className="question-detail-content">
            <h1 className="question-detail-title">{question.content}</h1>
            <p className="question-detail-writer">
              <User size={16} />
              <span>{question.writer?.nickname || "탈퇴한 사용자"}</span>
            </p>
          </div>
        )}
        <div className="question-detail-actions-header">
          <SortingOptions<ActionSortOption>
            sortOption={sortOption}
            onSortChange={setSortOption}
            options={[
              { value: "updatedAt-DESC", label: "최신순" },
              { value: "updatedAt-ASC", label: "오래된순" },
              { value: "likeCount-DESC", label: "좋아요 높은순" },
              { value: "likeCount-ASC", label: "좋아요 낮은순" },
            ]}
          />
          <SearchForm onSearch={onSearch} placeholder="액션 검색 ..." />
        </div>
        <div className="question-detail-actions-list">
          {actions.map((action) => (
            <ActionCard
              key={action.id}
              qpage={currentPage}
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
          onPageChange={onPageChange}
        />
        {isLoggedIn && (
          <button
            className="question-detail-create-action-button"
            onClick={() =>
              navigate(
                `/question/${id}/create-action?source=${source}&id=${sourceId}&spage=${queryParams.get("spage")}&qpage=${currentPage}`
              )
            }
          >
            <PlusCircle size={20} />
            <span>새 액션 작성</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionDetailPage;
