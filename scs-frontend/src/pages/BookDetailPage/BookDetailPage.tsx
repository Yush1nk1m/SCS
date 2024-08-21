import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  deleteBook,
  getBook,
  getBookLike,
  getQuestionsOfBook,
  toggleBookLike,
} from "../../api/bookApi";
import { BookDto, QuestionDto } from "../../api/swaggerApi";
import {
  Heart,
  Eye,
  EyeOff,
  Trash2,
  ArrowLeft,
  Calendar,
  Edit2,
} from "lucide-react";
import SearchForm from "../../components/SearchForm/SearchForm";
import SortingOptions from "../../components/SortingOptions/SortingOptions";
import Pagination from "../../components/Pagination/Pagination";
import toast from "react-hot-toast";
import "./BookDetailPage.css";
import { QuestionSortOption } from "../../types/question";
import { useAuth } from "../../hooks/useAuth";
import QuestionItem from "../../components/QuestionItem/QuestionItem";
import ScrapModal from "../../components/ScrapModal/ScrapModal";
import EditBookModal from "../../components/EditBookModal/EditBookModal";

const BookDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isLoggedIn, userId } = useAuth();
  const [book, setBook] = useState<BookDto | null>(null);
  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState<QuestionSortOption>({
    sort: "createdAt",
    order: "DESC",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [scrapModalOpen, setScrapModalOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchBookData();
    fetchQuestions();
  }, [id, currentPage, sortOption, searchTerm]);

  const fetchBookData = async () => {
    if (!id) return;
    try {
      const bookResponse = await getBook(Number(id));
      setBook(bookResponse.book);
      if (localStorage.getItem("accessToken")) {
        const likeResponse = await getBookLike(Number(id));
        setIsLiked(likeResponse.liked);
      }
    } catch (error) {
      toast.error("문제집 정보를 불러오는데 실패했습니다.");
    }
  };

  const fetchQuestions = async () => {
    if (!id) return;
    try {
      const response = await getQuestionsOfBook(
        Number(id),
        currentPage,
        12,
        sortOption.sort,
        sortOption.order,
        searchTerm
      );
      setQuestions(response.questions);
      setTotalPages(Math.ceil(response.total / 12));
    } catch (error: any) {
      console.error("질문 불러오기 실패:", error);
      switch (error.status) {
        case 403:
          toast.error("문제집에 접근할 수 없습니다.");
          break;
        case 404:
          toast.error("존재하지 않는 문제집입니다.");
          break;
        default:
          toast.error("예기치 못한 에러가 발생했습니다.");
      }
    }
  };

  const handleLike = async () => {
    if (!id) return;
    try {
      if (isLoggedIn) {
        const response = await toggleBookLike(parseInt(id));
        setIsLiked(response.liked);
        setBook((prev) =>
          prev ? { ...prev, likeCount: response.likeCount } : null
        );

        if (response.liked) {
          toast.success("좋아요가 등록되었습니다.");
        } else {
          toast.success("좋아요가 취소되었습니다.");
        }
      } else {
        toast.error("로그인이 필요합니다.");
      }
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

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleSort = (option: typeof sortOption) => {
    setSortOption(option);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleScrap = (questionId: number) => {
    setSelectedQuestionId(questionId);
    setScrapModalOpen(true);
  };

  const handleDeleteBook = async () => {
    if (window.confirm("정말로 이 문제집을 삭제하시겠습니까?")) {
      try {
        await deleteBook(Number(id));
        toast.success("문제집이 삭제되었습니다.");
        navigate("/library");
      } catch (error: any) {
        switch (error.status) {
          case 401:
            toast.error("로그인이 필요합니다.");
            break;
          case 403:
            toast.error("권한이 존재하지 않습니다.");
            break;
          case 404:
            toast.error("문제집이 존재하지 않습니다.");
            break;
          default:
            toast.error("예기치 못한 에러가 발생했습니다.");
        }
      }
    }
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEditSuccess = () => {
    fetchBookData();
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="book-detail-container">
      <Link to="/library" className="book-detail-back-button">
        <ArrowLeft /> 라이브러리로 돌아가기
      </Link>
      <div className="book-detail-header">
        <h1>{book.title}</h1>
        <div className="book-detail-meta">
          <span>
            <Calendar size={16} />{" "}
            {new Date(book.createdAt).toLocaleDateString()}
          </span>
          <span>{book.publisher?.nickname || "탈퇴한 사용자"}</span>
          <span>
            {book.visibility === "public" ? (
              <Eye size={16} />
            ) : (
              <EyeOff size={16} />
            )}
          </span>
        </div>
      </div>
      <p className="book-detail-description">{book.description}</p>
      <div className="book-detail-actions">
        <div className="book-detail-like-container">
          <button
            className={`book-detail-action-button book-detail-like-button ${isLiked ? "liked" : ""}`}
            onClick={handleLike}
          >
            <Heart size={24} />
          </button>
          <span className="book-detail-like-count">
            {book.likeCount}명이 좋아합니다
          </span>
        </div>
        {book.publisher?.id === userId && (
          <div className="book-detail-edit-delete-container">
            <button
              className="book-detail-action-button book-detail-edit-button"
              onClick={handleEditClick}
            >
              <Edit2 size={24} />
            </button>
            <button
              className="book-detail-action-button book-detail-delete-button"
              onClick={handleDeleteBook}
            >
              <Trash2 size={24} />
            </button>
          </div>
        )}
      </div>
      <hr className="book-detail-divider" />
      <div className="book-detail-questions-section">
        <h2>질문 목록</h2>
        <div className="book-detail-questions-header">
          <SearchForm onSearch={handleSearch} />
          <SortingOptions
            sortOption={sortOption}
            onSortChange={handleSort}
            options={[
              { value: "createdAt-DESC", label: "최신순" },
              { value: "createdAt-ASC", label: "오래된순" },
              { value: "saved-DESC", label: "스크랩 많은순" },
              { value: "saved-ASC", label: "스크랩 적은순" },
            ]}
          />
        </div>
        <div className="book-detail-questions-list">
          {questions.map((question) => (
            <QuestionItem
              key={question.id}
              id={question.id}
              content={question.content}
              saved={question.saved}
              createdAt={question.createdAt}
              bookId={id || ""}
              onScrap={handleScrap}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      {scrapModalOpen && selectedQuestionId && (
        <ScrapModal
          questionId={selectedQuestionId}
          onClose={() => setScrapModalOpen(false)}
        />
      )}
      {isEditModalOpen && book && (
        <EditBookModal
          bookId={book.id}
          initialTitle={book.title}
          initialDescription={book.description}
          onClose={handleEditClose}
          onUpdate={handleEditSuccess}
        />
      )}
    </div>
  );
};

export default BookDetailPage;
