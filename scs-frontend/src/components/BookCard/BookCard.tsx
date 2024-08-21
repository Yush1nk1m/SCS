import React from "react";
import { Link } from "react-router-dom";
import "./BookCard.css";
import { BookDto } from "../../api/swaggerApi";
import { Book, Eye, EyeOff, Heart } from "lucide-react";

interface BookCardProps {
  book: BookDto;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Link to={`/book/${book.id}`} className="book-card">
      <div className="book-card__icon">
        <Book size={32} />
      </div>
      <h3 className="book-card__title">{book.title}</h3>
      <p className="book-card__description">{book.description}</p>
      <div className="book-card__footer">
        <div className="book-card__stats">
          <span className="book-card__likes">
            <Heart size={16} />
            {book.likeCount}
          </span>
          <span className="book-card__visibility">
            {book.visibility === "public" ? (
              <Eye size={16} />
            ) : (
              <EyeOff size={16} />
            )}
          </span>
        </div>
        <span className="book-card__publisher">
          {book.publisher?.nickname || "탈퇴한 사용자"}
        </span>
      </div>
    </Link>
  );
};

export default BookCard;
