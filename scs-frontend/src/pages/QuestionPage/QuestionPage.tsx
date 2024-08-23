import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchQuestions } from "../../api/sectionApi";
import { QuestionDto } from "../../api/swaggerApi";
import { ArrowLeft, PlusCircle } from "lucide-react";
import SearchForm from "../../components/SearchForm/SearchForm";
import SortingOptions from "../../components/SortingOptions/SortingOptions";
import Pagination from "../../components/Pagination/Pagination";
import { QuestionSortOption } from "../../types/question";
import toast from "react-hot-toast";
import "./QuestionPage.css";
import { useAuth } from "../../hooks/useAuth";
import CreateQuestionModal from "../../components/CreateQuestionModal/CreateQuestionModal";
import ScrapModal from "../../components/ScrapModal/ScrapModal";
import QuestionCard from "../../components/QuestionCard/QuestionCard";

const QuestionPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { sectionId } = useParams<{ sectionId: string }>();
  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [currentPage, setCurrentPage] = useState(
    !isNaN(Number(queryParams.get("page")))
      ? Number(queryParams.get("page"))
      : 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState<QuestionSortOption>({
    sort: "createdAt",
    order: "DESC",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [scrapModalOpen, setScrapModalOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  );
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
    setIsCreateModalOpen(true);
  };

  const handleQuestionSubmit = async () => {
    setIsCreateModalOpen(false);
    await fetchQuestionsData();
  };

  const handleScrap = (questionId: number) => {
    setSelectedQuestionId(questionId);
    setScrapModalOpen(true);
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
          <QuestionCard
            key={question.id}
            question={question}
            page={currentPage}
            onScrap={handleScrap}
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
          className="create-question-button"
          onClick={handleCreateQuestion}
        >
          <PlusCircle size={20} />
          <span>질문 생성</span>
        </button>
      )}
      {isCreateModalOpen && (
        <CreateQuestionModal
          sectionId={Number(sectionId!)}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleQuestionSubmit}
        />
      )}
      {scrapModalOpen && selectedQuestionId && (
        <ScrapModal
          questionId={selectedQuestionId}
          onClose={() => setScrapModalOpen(false)}
        />
      )}
    </div>
  );
};

export default QuestionPage;
