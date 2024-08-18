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
  }, [sortOption.sort, sortOption.order]);

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

  const filteredSections = sections.filter((section) =>
    section.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <SortingOptions<SectionSortOption>
          sortOption={sortOption}
          onSortChange={setSortOption}
          options={[
            { value: "subject-ASC", label: "이름 오름차순" },
            { value: "subject-DESC", label: "이름 내림차순" },
            { value: "id-ASC", label: "ID 오름차순" },
            { value: "id-DESC", label: "ID 내림차순" },
          ]}
        />
      </div>
      <SectionList sections={filteredSections} onOpenModal={handleOpenModal} />
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
