import React, { useState, useRef, useEffect } from "react";
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

  const updateHeight = () => {
    if (isExpanded && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    } else {
      setContentHeight(0);
    }
  };

  useEffect(() => {
    updateHeight();
  }, [isExpanded]);

  return (
    <div className={`section-item ${isExpanded ? "expanded" : ""}`}>
      <div className="section-header" onClick={() => onToggle(section.id)}>
        <h2>{section.subject}</h2>
        <span className={`toggle-icon ${isExpanded ? "expanded" : ""}`}>▼</span>
      </div>
      <div
        className="section-content"
        ref={contentRef}
        style={{ maxHeight: `${contentHeight}px` }}
      >
        <div className="section-content-inner">
          <p className="section-description">{section.description}</p>
          <QuestionList
            section={section}
            onCreateQuestion={() => onOpenModal(section.id)}
            onHeightChange={updateHeight}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionItem;
