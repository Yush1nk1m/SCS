import React, { useEffect, useRef, useState } from "react";
import "./SectionItem.css";
import QuestionList from "../QuestionList/QuestionList";
import { SectionDto } from "../../api/swaggerApi";

interface SectionItemProps {
  section: SectionDto;
  onOpenModal: (sectionId: number) => void;
  isExpanded: boolean;
  onToggle: (sectionId: number) => void;
}

const SectionItem: React.FC<SectionItemProps> = ({
  section,
  onOpenModal,
  isExpanded,
  onToggle,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isExpanded]);

  return (
    <div className={`section-item ${isExpanded ? "expanded" : ""}`}>
      <div className="section-header" onClick={() => onToggle(section.id)}>
        <h2>{section.subject}</h2>
        <span className="toggle-icon">{isExpanded ? "▼" : "▶"}</span>
      </div>
      <div
        className="section-content"
        ref={contentRef}
        style={{ maxHeight: isExpanded ? `${contentHeight}px` : "0px" }}
      >
        <p className="section-description">{section.description}</p>
        <QuestionList
          section={section}
          onCreateQuestion={() => onOpenModal(section.id)}
        />
      </div>
    </div>
  );
};

export default SectionItem;
