import React from "react";
import { SectionSortOption } from "../../types/section";
import "./SortingOptions.css";

interface SortingOptionsProps {
  sortOption: SectionSortOption;
  onSortChange: (option: SectionSortOption) => void;
}

const SortingOptions: React.FC<SortingOptionsProps> = ({
  sortOption,
  onSortChange,
}) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sort, order] = e.target.value.split("-");
    onSortChange({
      sort: sort as "subject" | "id",
      order: order as "ASC" | "DESC",
    });
  };

  return (
    <select
      className="sorting-options"
      value={`${sortOption.sort}-${sortOption.order}`}
      onChange={handleSortChange}
    >
      <option value="subject-ASC">이름 오름차순</option>
      <option value="subject-DESC">이름 내림차순</option>
      <option value="id-ASC">ID 오름차순</option>
      <option value="id-DESC">ID 내림차순</option>
    </select>
  );
};

export default SortingOptions;
