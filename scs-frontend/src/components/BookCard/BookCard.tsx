import React from "react";
import { Link } from "react-router-dom";
import "./BookCard.css";
import { BookDto } from "../../api/swaggerApi";

interface BookCardProps {
  book: BookDto;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Link to={`/books/${book.id}`} className="book-card">
      <h3 className="book-card__title">{book.title}</h3>
      <p className="book-card__description">{book.description}</p>
      <div className="book-card__footer">
        <span className="book-card__likes">좋아요 {book.likeCount}</span>
        <span className="book-card__publisher">{book.publisher.nickname}</span>
        <span className="book-card__visibility">
          {book.visibility === "public" ? "공개" : "비공개"}
        </span>
      </div>
    </Link>
  );
};

export default BookCard;
