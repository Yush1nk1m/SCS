import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getBook, getBookLike, toggleBookLike } from "../../api/bookApi"; // API 함수들은 직접 만들어야 해
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

const BookDetailPage: React.FC = () => {
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
    // TO DO:
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
          <span>{book.publisher.nickname}</span>
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
            {book.likeCount}명이 좋아했습니다.
          </span>
        </div>
        {book.publisher.id === userId && (
          <div className="book-detail-edit-delete-container">
            <button className="book-detail-action-button book-detail-edit-button">
              <Edit2 size={24} />
            </button>
            <button className="book-detail-action-button book-detail-delete-button">
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
            <div key={question.id} className="book-detail-question-item">
              <h3>{question.content}</h3>
              <span className="book-detail-answer-count">
                답변 {question.saved}
              </span>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BookDetailPage;
