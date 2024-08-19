import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ActionCard.css";
import { Heart, Calendar, Image } from "lucide-react";

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
          <div className="placeholder-thumbnail">
            <Image size={48} />
            <span>No Image</span>
          </div>
        )}
      </div>
      <div className="action-content">
        <h2 className="action-title">{title}</h2>
        <div className="action-info">
          <span className="action-date">
            <Calendar size={16} />
            {new Date(createdAt).toLocaleDateString()}
          </span>
          <span className="action-likes">
            <Heart size={16} fill="#e74c3c" stroke="#e74c3c" />
            {likeCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActionCard;
