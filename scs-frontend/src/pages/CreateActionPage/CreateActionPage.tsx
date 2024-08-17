import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { createAction } from "../../api/actionApi";
import { uploadImage } from "../../api/uploadApi";
import "./CreateActionPage.css";

const mdParser = new MarkdownIt();

const CreateActionPage: React.FC = () => {
  const { id: questionId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEditorChange = ({ text }: { text: string }) => {
    setContent(text);
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      const url = await uploadImage(file);
      return url;
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      throw new Error("이미지 업로드에 실패했습니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await createAction(Number(questionId), title, content);
      navigate(`/question/${questionId}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("액션 생성에 실패했습니다. 다시 시도해주세요.");
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
          />
          <MdEditor
            style={{ height: "500px", marginBottom: "20px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            onImageUpload={handleImageUpload}
          />
          {error && <p className="errorMessage">{error}</p>}
          <div className="buttonContainer">
            <button
              type="button"
              onClick={() => navigate(-1)}
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
