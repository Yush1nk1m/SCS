import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { createAction } from "../../api/actionApi";
import { uploadImage } from "../../api/uploadApi";
import "./CreateActionPage.css";
import toast from "react-hot-toast";

const mdParser = new MarkdownIt();

const CreateActionPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");
  const sourceId = queryParams.get("id");

  const { id: questionId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEditorChange = ({ text }: { text: string }) => {
    setContent(text);
  };

  const handleImageUpload = async (file: File): Promise<string | undefined> => {
    try {
      const url = await uploadImage(file);
      return url;
    } catch (error: any) {
      console.error("이미지 업로드 실패:", error);
      switch (error.status) {
        case 400:
          toast.error("이미지만 업로드할 수 있습니다.");
          break;
        case 401:
          toast.error("로그인이 필요합니다.");
          break;
        default:
          toast.error("예기치 못한 에러가 발생했습니다.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const loadingToast = toast.loading("액션 생성 중 ...");
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await createAction(Number(questionId), title, content);
      toast.success("액션 생성 성공!", { id: loadingToast });
      navigate(
        `/action/${response.action.id}?source=${source}&id=${sourceId}&questionId=${questionId}&spage=${queryParams.get("spage")}&qpage=1`
      );
    } catch (error: any) {
      switch (error.status) {
        case 400:
          toast.error("내용을 작성해야 합니다.", { id: loadingToast });
          break;
        case 401:
          toast.error("로그인이 필요합니다.", { id: loadingToast });
          break;
        case 404:
          toast.error("존재하지 않는 질문입니다.", { id: loadingToast });
          break;
        default:
          toast.error("예기치 못한 에러가 발생했습니다.", { id: loadingToast });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="createActionPage">
      <div className="content-wrapper">
        <h1>액션을 작성해 커뮤니티에 기여하세요!</h1>
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
            onImageUpload={handleImageUpload}
          />
          <div className="buttonContainer">
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/question/${questionId}?page=${queryParams.get("qpage")}&source=${source}&id=${sourceId}&spage=${queryParams.get("spage")}`
                )
              }
              className="cancelButton"
            >
              취소
            </button>
            <button type="submit" disabled={isLoading} className="submitButton">
              {isLoading ? "저장 중..." : "저장"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateActionPage;
