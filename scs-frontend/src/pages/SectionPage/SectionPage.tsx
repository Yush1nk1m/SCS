import React, { useEffect, useState } from "react";
import { fetchSections } from "../../services/section";
import { Section, SectionSortOption } from "../../types/section";
import "./SectionPage.css";
import SortingOptions from "../../components/SortingOptions/SortingOptions";
import SectionList from "../../components/SectionList/SectionList";
import CreateQuesitonModal from "../../components/CreateQuestionModal/CreateQuestionModal";

const SectionPage: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
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
  }, [sortOption]);

  const fetchSectionsData = async () => {
    try {
      const response = await fetchSections(sortOption);
      setSections(response.data.sections);
    } catch (error) {
      console.error("섹션 불러오기 실패:", error);
      alert("섹션을 불러오는 데 실패했습니다. 다시 한번 시도해 주세요.");
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

  const handleQuestionSubmit = () => {
    handleCloseModal();
    fetchSectionsData();
  };

  const filteredSections = sections.filter((section) =>
    section.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="section-page">
      <div className="content-wrapper">
        <div className="sticky-header">
          <div className="search-sort-container">
            <input
              type="text"
              placeholder="섹션 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <SortingOptions
              sortOption={sortOption}
              onSortChange={setSortOption}
            />
          </div>
          <div className="section-list-container">
            <SectionList
              sections={filteredSections}
              onOpenModal={handleOpenModal}
            />
          </div>
        </div>
      </div>
      {isModalOpen && selectedSectionId && (
        <CreateQuesitonModal
          sectionId={selectedSectionId}
          onClose={handleCloseModal}
          onSubmit={handleQuestionSubmit}
        />
      )}
    </div>
  );
};

export default SectionPage;
