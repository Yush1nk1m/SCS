import React, { useState, useEffect } from "react";
import { ArrowLeft, Heart, Edit, Trash2, Send } from "lucide-react";
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
import Comment from "../../components/Comment/Comment";
import toast from "react-hot-toast";
import "./ActionPage.css";
import { useAuth } from "../../hooks/useAuth";

const ActionPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");
  const sourceId = queryParams.get("id");
  const questionId = queryParams.get("questionId");

  const { isLoggedIn, userId } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
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
    navigate(
      `/action/${id}/edit?source=${source}&id=${sourceId}&questionId=${questionId}`
    );
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 이 액션을 삭제하시겠습니까?")) {
      try {
        await deleteAction(Number(id));
        toast.success("액션이 삭제되었습니다.");
        navigate(`/question/${questionId}?source=${source}&id=${sourceId}`);
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

  if (isLoading || !action) return <div className="loading">로딩 중...</div>;

  return (
    <div className="action-detail-page">
      <button
        className="action-detail-back-button"
        onClick={() =>
          navigate(`/question/${questionId}?source=${source}&id=${sourceId}`)
        }
      >
        <ArrowLeft size={20} />
        <span>질문 페이지로 돌아가기</span>
      </button>
      <h1 className="action-detail-title">{action.title}</h1>
      <div className="action-detail-author-info">
        <span>
          {action.writer?.nickname || "탈퇴한 사용자"} •{" "}
          {new Date(action.createdAt).toLocaleString()}
        </span>
      </div>
      <div
        className="action-detail-content"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(action.content) }}
      />
      <div className="action-detail-like-section">
        <button
          className={`action-detail-like-button ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
        >
          <Heart size={30} />
        </button>
        <div className="action-detail-like-count">
          {action.likeCount}명이 좋아합니다
        </div>
      </div>
      {action.writer?.id === userId && (
        <div className="action-detail-buttons">
          <button onClick={handleEdit} className="action-detail-edit-button">
            <Edit size={20} />
            <span>수정</span>
          </button>
          <button
            onClick={handleDelete}
            className="action-detail-delete-button"
          >
            <Trash2 size={20} />
            <span>삭제</span>
          </button>
        </div>
      )}
      <div className="action-detail-comments-section">
        <h2 className="action-detail-comments-title">댓글 {comments.length}</h2>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            userId={userId}
            onUpdate={handleCommentUpdate}
            onDelete={handleCommentDelete}
          />
        ))}
        <form
          className="action-detail-comment-form"
          onSubmit={handleCommentSubmit}
        >
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요"
          />
          <button type="submit">
            <Send size={20} />
            <span>작성</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActionPage;
