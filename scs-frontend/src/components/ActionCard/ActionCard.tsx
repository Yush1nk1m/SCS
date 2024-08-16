import React from "react";
import { useNavigate } from "react-router-dom";
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
      <p>❤️ {likeCount}</p>
    </div>
  );
};

export default ActionCard;
