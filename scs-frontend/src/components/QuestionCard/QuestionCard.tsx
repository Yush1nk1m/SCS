import React from "react";
import { Link, useParams } from "react-router-dom";
import { QuestionDto } from "../../api/swaggerApi";
import { SaveIcon, LucideMessageCircleQuestion } from "lucide-react";
import "./QuestionCard.css";

interface QuestionCardProps {
  question: QuestionDto;
  onScrap: (questionId: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onScrap }) => {
  const { sectionId } = useParams<{ sectionId: string }>();
  return (
    <div className="question-card">
      <LucideMessageCircleQuestion size={24} />
      <div className="question-card-content">
        <h2>{question.content}</h2>
        <div className="question-card-meta">
          <span>
            <SaveIcon size={16} /> {question.saved}
          </span>
          <span>{new Date(question.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="question-card-actions">
        <button className="scrap-button" onClick={() => onScrap(question.id)}>
          스크랩
        </button>
        <Link
          to={`/question/${question.id}?source=section&id=${sectionId}`}
          className="view-button"
        >
          보기
        </Link>
      </div>
    </div>
  );
};

export default QuestionCard;
