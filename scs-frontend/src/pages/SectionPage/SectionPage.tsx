import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchSections } from "../../api/sectionApi";
import { SectionSortOption } from "../../types/section";
import { SectionDto } from "../../api/swaggerApi";
import { ArrowUpDown, Notebook } from "lucide-react";
import SearchForm from "../../components/SearchForm/SearchForm";
import SortingOptions from "../../components/SortingOptions/SortingOptions";
import toast from "react-hot-toast";
import "./SectionPage.css";

const SectionPage: React.FC = () => {
  const [sections, setSections] = useState<SectionDto[]>([]);
  const [sortOption, setSortOption] = useState<SectionSortOption>({
    sort: "subject",
    order: "ASC",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSectionsData();
  }, [sortOption]);

  const fetchSectionsData = async () => {
    try {
      const response = await fetchSections(sortOption);
      setSections(response.sections);
    } catch (error) {
      console.error("섹션 불러오기 실패:", error);
      toast.error("섹션을 불러오는데 실패했습니다.");
    }
  };

  const filteredSections = sections.filter((section) =>
    section.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="section-page-container">
      <h1 className="section-page-title">섹션 목록</h1>
      <div className="section-page-controls">
        <SearchForm onSearch={setSearchTerm} placeholder="섹션 검색..." />
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
      <div className="section-list">
        {filteredSections.map((section) => (
          <Link
            to={`/section/${section.id}/questions?source=section`}
            key={section.id}
            className="section-item"
          >
            <Notebook size={24} />
            <div className="section-item-content">
              <h2>{section.subject}</h2>
              <p>{section.description}</p>
            </div>
            <ArrowUpDown size={24} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SectionPage;
