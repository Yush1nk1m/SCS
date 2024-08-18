import React, { useState, useEffect } from "react";
import { fetchSections } from "../../api/sectionApi";
import { SectionSortOption } from "../../types/section";
import SortingOptions from "../../components/SortingOptions/SortingOptions";
import SectionList from "../../components/SectionList/SectionList";
import CreateQuestionModal from "../../components/CreateQuestionModal/CreateQuestionModal";
import { SectionDto } from "../../api/swaggerApi";
import toast from "react-hot-toast";
import "./SectionPage.css";

const SectionPage: React.FC = () => {
  const [sections, setSections] = useState<SectionDto[]>([]);
  const [sortOption, setSortOption] = useState<SectionSortOption>({
    sort: "subject",
    order: "ASC",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(
    null
  );

  useEffect(() => {
    fetchSectionsData();
  }, [sortOption, searchTerm]);

  const fetchSectionsData = async () => {
    try {
      const response = await fetchSections(sortOption);
      setSections(
        response.sections.filter((section) =>
          section.subject.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } catch (error) {
      console.error("섹션 불러오기 실패:", error);
      toast.error("예기치 못한 에러가 발생했습니다.");
    }
  };

  const handleOpenModal = (sectionId: number) => {
    setSelectedSectionId(sectionId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSectionId(null);
  };

  const handleQuestionSubmit = async () => {
    handleCloseModal();
    await fetchSectionsData();
  };

  return (
    <div className="section-page">
      <div className="section-header">
        <input
          type="text"
          placeholder="섹션 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="section-search-input"
        />
        <SortingOptions sortOption={sortOption} onSortChange={setSortOption} />
      </div>
      <SectionList sections={sections} onOpenModal={handleOpenModal} />
      {isModalOpen && selectedSectionId && (
        <CreateQuestionModal
          sectionId={selectedSectionId}
          onClose={handleCloseModal}
          onSubmit={handleQuestionSubmit}
        />
      )}
    </div>
  );
};

export default SectionPage;
