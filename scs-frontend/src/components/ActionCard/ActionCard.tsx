import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ActionCard.css";

interface ActionCardProps {
  id: number;
  title: string;
  imageUrl?: string;
  likeCount: number;
  createdAt: string;
}

const ActionCard: React.FC<ActionCardProps> = ({
  id,
  title,
  imageUrl,
  likeCount,
  createdAt,
}) => {
  const { id: questionId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/action/${id}`, { state: questionId });
  };

  return (
    <div className="action-card" onClick={handleClick}>
      <div className="action-thumbnail">
        {imageUrl ? (
          <img src={imageUrl} alt={title} />
        ) : (
          <div className="placeholder-thumbnail">No Image</div>
        )}
      </div>
      <h2>{title}</h2>
      <div className="action-info">
        <p>작성일: {new Date(createdAt).toLocaleDateString()}</p>
        <p>❤️ {likeCount}</p>
      </div>
    </div>
  );
};

export default ActionCard;
