import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchLibraries } from '../api/api';

const LibraryList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
`;

const LibraryItem = styled.div`
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

const Libraries = () => {
  const [libraries, setLibraries] = useState([]);

  useEffect(() => {
    fetchLibraries().then((data) => setLibraries(data));
  }, []);

  return (
    <LibraryList>
      {libraries.map((library) => (
        <LibraryItem key={library.id}>{library.title}</LibraryItem>
      ))}
    </LibraryList>
  );
};

export default Libraries;
