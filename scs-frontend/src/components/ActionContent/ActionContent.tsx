import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

interface ActionContentProps {
  content: string;
}

const ActionContent: React.FC<ActionContentProps> = ({ content }) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={{
        h1: ({ node, ...props }) => (
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#333",
            }}
            {...props}
          />
        ),
        h2: ({ node, ...props }) => (
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#333",
            }}
            {...props}
          />
        ),
        p: ({ node, ...props }) => (
          <p style={{ marginBottom: "15px", lineHeight: "1.6" }} {...props} />
        ),
        a: ({ node, ...props }) => (
          <a style={{ color: "#4c4cff", textDecoration: "none" }} {...props} />
        ),
        img: ({ node, ...props }) => (
          <img
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
            {...props}
          />
        ),
        code: ({ node, inline, className, children, ...props }) => {
          return !inline ? (
            <pre
              style={{
                backgroundColor: "#f0f0f0",
                padding: "10px",
                borderRadius: "8px",
                overflowX: "auto",
                marginBottom: "15px",
              }}
            >
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          ) : (
            <code
              style={{
                backgroundColor: "#f0f0f0",
                padding: "2px 4px",
                borderRadius: "4px",
              }}
              {...props}
            >
              {children}
            </code>
          );
        },
        blockquote: ({ node, ...props }) => (
          <blockquote
            style={{
              borderLeft: "4px solid #4c4cff",
              paddingLeft: "15px",
              fontStyle: "italic",
              marginBottom: "15px",
            }}
            {...props}
          />
        ),
        table: ({ node, ...props }) => (
          <table
            style={{
              borderCollapse: "collapse",
              marginBottom: "15px",
            }}
            {...props}
          />
        ),
        thead: ({ node, ...props }) => (
          <thead style={{ backgroundColor: "#f0f0f0" }} {...props} />
        ),
        th: ({ node, ...props }) => (
          <th
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              textAlign: "left",
            }}
            {...props}
          />
        ),
        td: ({ node, ...props }) => (
          <td
            style={{ border: "1px solid #ddd", padding: "10px" }}
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default ActionContent;
