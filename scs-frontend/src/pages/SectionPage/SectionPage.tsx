import React, { useEffect, useState } from "react";
import { fetchSections } from "../../api/sectionApi";
import { SectionSortOption } from "../../types/section";
import "./SectionPage.css";
import SortingOptions from "../../components/SortingOptions/SortingOptions";
import SectionList from "../../components/SectionList/SectionList";
import CreateQuesitonModal from "../../components/CreateQuestionModal/CreateQuestionModal";
import { SectionDto } from "../../api/swaggerApi";
import toast from "react-hot-toast";

const SectionPage: React.FC = () => {
  const [sections, setSections] = useState<SectionDto[]>([]);
  const [sortOption, setSortOption] = useState<SectionSortOption>({
    sort: "subject",
    order: "ASC",
  });
  const [searchInput, setSearchInput] = useState("");
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
      setSections(response.sections);
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
  };

  const filteredSections = sections.filter((section) =>
    section.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="section-page">
      <div className="content-wrapper">
        <div className="sticky-header">
          <div className="search-sort-container">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="섹션 검색..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                검색
              </button>
            </form>
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
