// EditActionPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { getAction, getRawContent, updateAction } from "../../api/actionApi";
import { uploadImage } from "../../api/uploadApi";
import "./EditActionPage.css";
import toast from "react-hot-toast";
import { UpdateActionDto } from "../../api/swaggerApi";

const mdParser = new MarkdownIt();

const EditActionPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");
  const sourceId = queryParams.get("id");
  const questionId = queryParams.get("questionId");

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAction = async () => {
      try {
        const actionResponse = await getAction(Number(id));
        setTitle(actionResponse.action.title);
        const contentResponse = await getRawContent(Number(id));
        setContent(contentResponse.content);
      } catch (error: any) {
        console.error("액션 조회 실패:", error);
        toast.error("액션을 불러오는데 실패했습니다.");
      }
    };
    fetchAction();
  }, [id]);

  const handleEditorChange = ({ text }: { text: string }) => {
    setContent(text);
  };

  const handleImageUpload = async (file: File): Promise<string | undefined> => {
    try {
      const url = await uploadImage(file);
      return url;
    } catch (error: any) {
      console.error("이미지 업로드 실패:", error);
      toast.error("이미지 업로드에 실패했습니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const updateActionDto: UpdateActionDto = { title, content };
      await updateAction(Number(id), updateActionDto);
      toast.success("액션이 성공적으로 수정되었습니다.");
      navigate(
        `/action/${id}?source=${source}&id=${sourceId}&questionId=${questionId}`
      );
    } catch (error: any) {
      console.error("액션 수정 실패:", error);
      toast.error("액션 수정에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="edit-action-page">
      <div className="content-wrapper">
        <h1>액션 수정하기</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="titleInput"
            required
          />
          <MdEditor
            style={{
              height: `calc(100vh - var(--header-height) - var(--footer-height) - var(--content-padding) * 2 - 200px - 40px)`,
              marginBottom: "20px",
            }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            value={content}
            onImageUpload={handleImageUpload}
          />
          <div className="buttonContainer">
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/action/${id}?source=${source}&id=${sourceId}&questionId=${questionId}`
                )
              }
              className="cancelButton"
            >
              취소
            </button>
            <button type="submit" disabled={isLoading} className="submitButton">
              {isLoading ? "수정 중..." : "수정"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditActionPage;
