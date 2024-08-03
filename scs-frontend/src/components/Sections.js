import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchSections } from '../api/api';

const SectionList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
`;

const SectionItem = styled.div`
  background-color: #f0f0f0;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #d0d0d0;
  }
`;

const Sections = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetchSections().then((data) => setSections(data));
  }, []);

  return (
    <SectionList>
      {sections.map((section) => (
        <SectionItem key={section.id}>{section.subject}</SectionItem>
      ))}
    </SectionList>
  );
};

export default Sections;
