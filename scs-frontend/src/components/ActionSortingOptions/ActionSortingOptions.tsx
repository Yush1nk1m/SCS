import React from "react";
import { ActionSortOption } from "../../types/action";
import "./ActionSortingOptions.css";

interface ActionSortingOptionsProps {
  sortOption: ActionSortOption;
  onSortChange: (option: ActionSortOption) => void;
}

const ActionSortingOptions: React.FC<ActionSortingOptionsProps> = ({
  sortOption,
  onSortChange,
}) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sort, order] = e.target.value.split("-");
    onSortChange({
      sort: sort as "updatedAt" | "likeCount",
      order: order as "ASC" | "DESC",
    });
  };

  return (
    <div className="action-sorting-options">
      <select
        value={`${sortOption.sort}-${sortOption.order}`}
        onChange={handleSortChange}
      >
        <option value="updatedAt-DESC">최신순</option>
        <option value="updatedAt-ASC">오래된순</option>
        <option value="likeCount-DESC">좋아요 높은순</option>
        <option value="likeCount-ASC">좋아요 낮은순</option>
      </select>
    </div>
  );
};

export default ActionSortingOptions;
