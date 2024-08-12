import React, { useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import axios from "axios";

const mdParser = new MarkdownIt();

const Editor = () => {
  const [content, setContent] = useState("");

  const handleEditorChange = ({ html, text }) => {
    setContent(text);
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(
        "http://localhost:4000/v1/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data.url;
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/v1/questions/1/actions",
        {
          content,
        }
      );
      console.log("Action created:", response.data);
    } catch (error) {
      console.error("Action creation failed:", error);
    }
  };

  return (
    <div>
      <MdEditor
        style={{ height: "500px" }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
        onImageUpload={handleImageUpload}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Editor;
