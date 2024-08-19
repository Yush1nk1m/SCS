import React from "react";
import "./SortingOptions.css";
import { SectionSortOption } from "../../types/section";
import { ActionSortOption } from "../../types/action";
import { QuestionSortOption } from "../../types/question";

type SortOption = SectionSortOption | ActionSortOption | QuestionSortOption;

interface SortingOptionsProps<T extends SortOption> {
  sortOption: T;
  onSortChange: (option: T) => void;
  options: Array<{
    value: `${T["sort"]}-${T["order"]}`;
    label: string;
  }>;
}

function SortingOptions<T extends SortOption>({
  sortOption,
  onSortChange,
  options,
}: SortingOptionsProps<T>) {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sort, order] = e.target.value.split("-") as [T["sort"], T["order"]];
    onSortChange({ sort, order } as T);
  };

  return (
    <div className="sorting-options">
      <select
        value={`${sortOption.sort}-${sortOption.order}`}
        onChange={handleSortChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortingOptions;
