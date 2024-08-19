import React, { useState } from "react";
import "./SearchForm.css";

interface SearchFormProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  placeholder = "검색어를 입력하세요...",
}) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder={placeholder}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        검색
      </button>
    </form>
  );
};

export default SearchForm;
