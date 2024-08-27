import React from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Calendar, Bookmark, BookOpen } from "lucide-react";
import "./QuestionItem.css";

interface QuestionItemProps {
  id: number;
  content: string;
  saved: number;
  createdAt: string;
  bookId: string;
  onScrap: (questionId: number) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  id,
  content,
  saved,
  createdAt,
  bookId,
  onScrap,
}) => {
  return (
    <div className="question-item">
      <Link
        to={`/question/${id}?page=1&source=book&id=${bookId}`}
        className="question-item-link"
      >
        <h3>
          <MessageSquare size={20} /> {content}
        </h3>
        <div className="question-item-meta">
          <span className="question-item-saved">
            <BookOpen size={16} /> {saved}번 스크랩됨
          </span>
          <span className="question-item-date">
            <Calendar size={16} /> {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
      </Link>
      <button className="question-item-scrap" onClick={() => onScrap(id)}>
        <Bookmark size={20} />
      </button>
    </div>
  );
};

export default QuestionItem;
