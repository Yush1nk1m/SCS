import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./ActionCard.css";
import { Heart, Calendar, Image, ArrowRight } from "lucide-react";

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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");
  const sourceId = queryParams.get("id");

  const { id: questionId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(
      `/action/${id}?source=${source}&id=${sourceId}&questionId=${questionId}`
    );
  };

  return (
    <div className="action-card-container" onClick={handleClick}>
      <div className="action-card-thumbnail">
        {imageUrl ? (
          <img src={imageUrl} alt={title} />
        ) : (
          <div className="action-card-placeholder-thumbnail">
            <Image size={48} />
            <span>No Image</span>
          </div>
        )}
      </div>
      <div className="action-card-content">
        <h2 className="action-card-title">{title}</h2>
        <div className="action-card-info">
          <span className="action-card-date">
            <Calendar size={16} />
            {new Date(createdAt).toLocaleDateString()}
          </span>
          <span className="action-card-likes">
            <Heart size={16} />
            {likeCount}
          </span>
        </div>
      </div>
      <div className="action-card-view">
        <ArrowRight size={20} />
      </div>
    </div>
  );
};

export default ActionCard;
