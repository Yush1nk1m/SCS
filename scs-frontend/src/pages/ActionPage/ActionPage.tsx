// pages/ActionDetail.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { getAction, likeAction, getComments } from "../../api/actionApi";
import { createComment } from "../../api/commentApi";
import { ActionDetailDto, CommentDto } from "../../api/swaggerApi";
import "./ActionPage.css";

const ActionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [action, setAction] = useState<ActionDetailDto | null>(null);
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchAction = async () => {
      try {
        const data = await getAction(Number(id));
        setAction(data.action);
      } catch (error) {
        console.error("액션 데이터 가져오기 실패:", error);
        alert(
          "액션 데이터를 가져오는 데 실패했습니다. 다시 한번 시도해주세요."
        );
      }
    };
    fetchAction();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(Number(id));
        setComments(data.comments);
      } catch (error) {
        console.error("댓글 가져오기 실패:", error);
      }
    };
    fetchComments();
  }, [id]);

  const handleLike = async () => {
    try {
      const data = await likeAction(Number(id));
      setIsLiked(data.liked);
      setAction((prev) =>
        prev ? { ...prev, likeCount: data.likeCount } : null
      );
    } catch (error) {
      console.error("좋아요 처리 중 에러 발생:", error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await createComment(Number(id), newComment);
      setComments((prev) => [...prev, data.comment]);
      setNewComment("");
    } catch (error) {
      console.error("댓글 작성 중 에러 발생:", error);
    }
  };

  if (!action) return <div>로딩 중...</div>;

  return (
    <div className="action-detail">
      <h1 className="action-title">{action.title}</h1>
      <div className="author-info">
        <span>
          {action.writer.nickname} •{" "}
          {new Date(action.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div
        className="action-content"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(action.content) }}
      />
      <div className="like-button-container">
        <button
          className={`like-button ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
        />
      </div>
      <div className="like-count">{action.likeCount}명이 좋아합니다</div>
      <div className="comments-section">
        <h2>댓글</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <strong>{comment.writer.nickname}</strong>
            <p>{comment.content}</p>
            <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요"
          />
          <button type="submit">작성</button>
        </form>
      </div>
    </div>
  );
};

export default ActionPage;
