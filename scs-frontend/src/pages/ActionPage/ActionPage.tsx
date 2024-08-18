import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import {
  getAction,
  likeAction,
  getComments,
  deleteAction,
  getActionLike,
} from "../../api/actionApi";
import {
  createComment,
  updateComment,
  deleteComment,
} from "../../api/commentApi";
import { ActionDetailDto, CommentDto } from "../../api/swaggerApi";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Comment from "../../components/Comment/Comment";
import toast from "react-hot-toast";
import "./ActionPage.css";

const ActionPage: React.FC = () => {
  const questionId = useLocation().state;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading, isLoggedIn } = useCurrentUser();
  const [action, setAction] = useState<ActionDetailDto | null>(null);
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchActionAndComments = async () => {
      setIsLoading(true);
      try {
        if (localStorage.getItem("accessToken")) {
          const likeData = await getActionLike(Number(id));
          setIsLiked(likeData.liked);
        }
        const [actionData, commentsData] = await Promise.all([
          getAction(Number(id)),
          getComments(Number(id)),
        ]);
        setAction(actionData.action);
        setComments(commentsData.comments);
      } catch (error: any) {
        toast.error(
          error.status === 404
            ? "존재하지 않는 액션입니다."
            : "예기치 못한 에러가 발생했습니다."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchActionAndComments();
  }, [id]);

  const handleLike = async () => {
    if (!isLoggedIn) {
      toast.error("로그인이 필요합니다.");
      return;
    }
    try {
      const { liked, likeCount } = await likeAction(Number(id));
      setIsLiked(liked);
      setAction((prev) => (prev ? { ...prev, likeCount } : null));
      toast.success(
        liked ? "좋아요가 등록되었습니다." : "좋아요가 취소되었습니다."
      );
    } catch (error: any) {
      toast.error("좋아요 처리 중 에러가 발생했습니다.");
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("로그인이 필요합니다.");
      return;
    }
    try {
      const { comment } = await createComment(Number(id), newComment);
      setComments((prev) => [...prev, comment]);
      setNewComment("");
      toast.success("댓글이 작성되었습니다.");
    } catch (error: any) {
      toast.error(
        error.status === 403
          ? "사용자 권한이 존재하지 않습니다."
          : "댓글 작성 중 에러가 발생했습니다."
      );
    }
  };

  const handleCommentUpdate = async (commentId: number, content: string) => {
    try {
      const { comment } = await updateComment(commentId, content);
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? comment : c))
      );
      toast.success("댓글이 수정되었습니다.");
    } catch (error: any) {
      toast.error("댓글 수정 중 에러가 발생했습니다.");
    }
  };

  const handleCommentDelete = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      toast.success("댓글이 삭제되었습니다.");
    } catch (error: any) {
      toast.error("댓글 삭제 중 에러가 발생했습니다.");
    }
  };

  const handleEdit = () => {
    navigate(`/action/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 이 액션을 삭제하시겠습니까?")) {
      try {
        await deleteAction(Number(id));
        toast.success("액션이 삭제되었습니다.");
        navigate(-1);
      } catch (error: any) {
        toast.error(
          error.status === 403
            ? "사용자 권한이 존재하지 않습니다."
            : error.status === 404
              ? "존재하지 않는 액션입니다."
              : "예기치 못한 에러가 발생했습니다."
        );
      }
    }
  };

  if (isLoading || loading || !action)
    return <div className="loading">로딩 중...</div>;

  return (
    <div className="action-detail">
      <button
        className="back-button"
        onClick={() => navigate(`/question/${questionId}`)}
      >
        질문 페이지로 돌아가기
      </button>
      <h1 className="action-title">{action.title}</h1>
      <div className="author-info">
        <span>
          {action.writer.nickname} •{" "}
          {new Date(action.createdAt).toLocaleString()}
        </span>
      </div>
      <div
        className="action-content"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(action.content) }}
      />
      <div className="like-section">
        <button
          className={`like-button ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
        />
        <div className="like-count">{action.likeCount}명이 좋아합니다</div>
      </div>
      {user && action.writer.id === user.id && (
        <div className="action-buttons">
          <button onClick={handleEdit} className="edit-button">
            수정
          </button>
          <button onClick={handleDelete} className="delete-button">
            삭제
          </button>
        </div>
      )}
      <div className="comments-section">
        <h2>댓글</h2>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            currentUser={user}
            onUpdate={handleCommentUpdate}
            onDelete={handleCommentDelete}
          />
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
