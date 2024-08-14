import React from "react";
import "./ActionCard.css";

interface ActionCardProps {
  title: string;
  imageUrl?: string;
  likeCount: number;
  createdAt: Date;
  writer?: {
    id: number;
    nickname: string;
  };
}

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  imageUrl,
  likeCount,
  createdAt,
  writer,
}) => {
  return (
    <div className="action-card">
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
      <p>작성자: {writer?.nickname || "알 수 없음"}</p>
    </div>
  );
};

export default ActionCard;
