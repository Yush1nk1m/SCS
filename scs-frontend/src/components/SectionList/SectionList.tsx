import React, { useState } from "react";
import { Section } from "../../types/section";
import SectionItem from "../SectionItem/SectionItem";
import "./SectionList.css";

interface SectionListProps {
  sections: Section[];
  onOpenModal: (sectionId: number) => void;
}

const SectionList: React.FC<SectionListProps> = ({ sections, onOpenModal }) => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const handleToggle = (sectionId: number) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="section-list">
      {sections.map((section) => (
        <SectionItem
          key={section.id}
          section={section}
          onOpenModal={onOpenModal}
          isExpanded={expandedSection === section.id}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};

export default SectionList;
