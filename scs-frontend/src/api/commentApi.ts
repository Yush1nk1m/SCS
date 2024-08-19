import {
  BaseResponseDto,
  CommentResponseDto,
  UpdateCommentDto,
} from "./swaggerApi";
import { authRequest } from "./apiClient";
import api from "./apiClient";

export const createComment = async (
  actionId: number,
  content: string
): Promise<CommentResponseDto> => {
  return authRequest<CommentResponseDto, { actionId: number; content: string }>(
    (params) => api.v1.commentControllerCreateComment(params),
    { actionId, content }
  );
};

export const updateComment = async (
  commentId: number,
  content: string
): Promise<CommentResponseDto> => {
  const updateCommentDto: UpdateCommentDto = { content };

  return authRequest<
    CommentResponseDto,
    { id: number; body: UpdateCommentDto }
  >((params) => api.v1.commentControllerUpdateComment(params.id, params.body), {
    id: commentId,
    body: updateCommentDto,
  });
};

export const deleteComment = async (
  commentId: number
): Promise<BaseResponseDto> => {
  return authRequest<BaseResponseDto, number>(
    (params) => api.v1.commentControllerDeleteComment(params),
    commentId
  );
};
