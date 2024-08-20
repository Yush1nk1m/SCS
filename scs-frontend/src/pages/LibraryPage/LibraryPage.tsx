import React, { useEffect, useState } from "react";
import "./LibraryPage.css";
import SearchForm from "../../components/SearchForm/SearchForm";
import SortingOptions from "../../components/SortingOptions/SortingOptions";
import Pagination from "../../components/Pagination/Pagination";
import { BookSortOption } from "../../types/book";
import { BookDto } from "../../api/swaggerApi";
import { getBooks, getLikedBooks, getMyBooks } from "../../api/bookApi";
import toast from "react-hot-toast";
import BookCard from "../../components/BookCard/BookCard";
import CreateBookModal from "../../components/CreateBookModal/CreateBookModal";
import { useAuth } from "../../hooks/useAuth";

const LibraryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"public" | "liked" | "my">(
    "public"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<BookSortOption>({
    sort: "createdAt",
    order: "DESC",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [books, setBooks] = useState<BookDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      let response;
      switch (activeTab) {
        case "my":
          response = await getMyBooks(
            currentPage,
            12,
            sortOption.sort,
            sortOption.order,
            searchTerm
          );
          break;
        case "liked":
          response = await getLikedBooks(
            currentPage,
            12,
            sortOption.sort,
            sortOption.order,
            searchTerm
          );
          break;
        default:
          response = await getBooks(
            currentPage,
            12,
            sortOption.sort,
            sortOption.order,
            searchTerm
          );
      }
      setBooks(response.books);
      setTotalPages(Math.ceil(response.total / 12));
    } catch (error: any) {
      switch (error.status) {
        case 401:
          toast.error("로그인이 필요합니다.");
          break;
        default:
          toast.error("문제집을 불러오는 데 실패했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [activeTab, currentPage, sortOption, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleSortChange = (option: BookSortOption) => {
    setSortOption(option);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTabChange = (tab: "public" | "liked" | "my") => {
    if (!isLoggedIn && (tab === "liked" || tab === "my")) {
      toast.error("로그인이 필요합니다.");
      return;
    }
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleCreateBook = () => {
    setIsModalOpen(true);
  };

  const handleBookCreated = () => {
    fetchBooks();
  };

  return (
    <div className="library-page">
      <h1>Library</h1>
      <div className="library-tabs">
        <button
          className={activeTab === "public" ? "active" : ""}
          onClick={() => handleTabChange("public")}
        >
          공개 문제집
        </button>
        <button
          className={activeTab === "liked" ? "active" : ""}
          onClick={() => handleTabChange("liked")}
        >
          좋아요한 문제집
        </button>
        <button
          className={activeTab === "my" ? "active" : ""}
          onClick={() => handleTabChange("my")}
        >
          내 문제집
        </button>
      </div>
      <div className="library-controls">
        <SearchForm onSearch={handleSearch} />
        <SortingOptions<BookSortOption>
          sortOption={sortOption}
          onSortChange={handleSortChange}
          options={[
            { value: "createdAt-DESC", label: "최신순" },
            { value: "createdAt-ASC", label: "오래된순" },
            { value: "likeCount-DESC", label: "인기순" },
            { value: "likeCount-ASC", label: "비인기순" },
          ]}
        />
      </div>
      <div className="book-list">
        {isLoading ? (
          <p>Loading...</p>
        ) : books.length > 0 ? (
          books.map((book) => <BookCard key={book.id} book={book} />)
        ) : (
          <p>문제집이 없습니다.</p>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {isLoggedIn && (
        <button className="create-book-button" onClick={handleCreateBook}>
          새 문제집 만들기
        </button>
      )}
      <CreateBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookCreated={handleBookCreated}
      />
    </div>
  );
};

export default LibraryPage;
