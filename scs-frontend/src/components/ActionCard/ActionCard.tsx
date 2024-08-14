import React from "react";
import "./ActionCard.css";
import { useNavigate } from "react-router-dom";

interface ActionCardProps {
  id: number;
  title: string;
  imageUrl?: string;
  likeCount: number;
  createdAt: Date;
}

const ActionCard: React.FC<ActionCardProps> = ({
  id,
  title,
  imageUrl,
  likeCount,
  createdAt,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/action/${id}`);
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
      <p>❤️: {likeCount}</p>
      <p>작성일: {new Date(createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ActionCard;
