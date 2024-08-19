import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchQuestions } from "../../api/sectionApi";
import { QuestionDto } from "../../api/swaggerApi";
import {
  ArrowLeft,
  SaveIcon,
  LucideMessageCircleQuestion,
  PlusCircle,
} from "lucide-react";
import SearchForm from "../../components/SearchForm/SearchForm";
import SortingOptions from "../../components/SortingOptions/SortingOptions";
import Pagination from "../../components/Pagination/Pagination";
import { QuestionSortOption } from "../../types/question";
import toast from "react-hot-toast";
import "./QuestionPage.css";
import { useAuth } from "../../hooks/useAuth";
import CreateQuestionModal from "../../components/CreateQuestionModal/CreateQuestionModal";

const QuestionPage: React.FC = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState<QuestionSortOption>({
    sort: "createdAt",
    order: "DESC",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    fetchQuestionsData();
  }, [sectionId, currentPage, sortOption, searchTerm]);

  const fetchQuestionsData = async () => {
    if (!sectionId) return;
    try {
      const response = await fetchQuestions(
        parseInt(sectionId),
        currentPage,
        sortOption,
        searchTerm
      );
      setQuestions(response.questions);
      setTotalPages(Math.ceil(response.total / 12));
    } catch (error) {
      console.error("질문 불러오기 실패:", error);
      toast.error("질문을 불러오는데 실패했습니다.");
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleCreateQuestion = () => {
    setIsModalOpen(true);
  };

  const handleQuestionSubmit = async () => {
    setIsModalOpen(false);
    await fetchQuestionsData();
  };

  return (
    <div className="question-page-container">
      <Link to="/section" className="question-page-back-link">
        <ArrowLeft size={24} />
        <span>섹션 목록으로 돌아가기</span>
      </Link>
      <h1 className="question-page-title">질문 목록</h1>
      <div className="question-page-controls">
        <SearchForm onSearch={handleSearch} placeholder="질문 검색..." />
        <SortingOptions<QuestionSortOption>
          sortOption={sortOption}
          onSortChange={setSortOption}
          options={[
            { value: "createdAt-DESC", label: "최신순" },
            { value: "createdAt-ASC", label: "오래된순" },
            { value: "saved-DESC", label: "스크랩 많은순" },
            { value: "saved-ASC", label: "스크랩 적은순" },
          ]}
        />
      </div>
      <div className="question-list">
        {questions.map((question) => (
          <Link
            to={`/question/${question.id}`}
            key={question.id}
            className="question-item"
          >
            <LucideMessageCircleQuestion size={24} />
            <div className="question-item-content">
              <h2>{question.content}</h2>
              <div className="question-item-meta">
                <span>
                  <SaveIcon size={16} /> {question.saved}
                </span>
                <span>{new Date(question.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {isLoggedIn && (
        <button
          className="create-question-button"
          onClick={handleCreateQuestion}
        >
          <PlusCircle size={20} />
          <span>질문 생성</span>
        </button>
      )}
      {isModalOpen && (
        <CreateQuestionModal
          sectionId={Number(sectionId!)}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleQuestionSubmit}
        />
      )}
    </div>
  );
};

export default QuestionPage;
