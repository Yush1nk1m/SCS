import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomeContainer = styled.div`
    text-align: center;
    margin: 2rem;
`;

const Banner = styled.div`
    background-color: #61dafb;
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 2rem;
`;

const BannerText = styled.h1`
    margin: 0;
    font-size: 2rem;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin: 1rem 1.5rem;  /* 여백을 조정하여 간격을 넓힙니다 */
  padding: 10px 20px;
  color: #282c34;
  font-size: 1.2rem;
  text-decoration: none;
  background-color: #ffffff;
  border: 2px solid #61dafb;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    color: #ffffff;
    background-color: #61dafb;
    border: 2px solid #ffffff;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

function Home() {
    return (
        <HomeContainer>
            <Banner>
                <BannerText>Welcome to Study Computer Science</BannerText>
            </Banner>
            <StyledLink to="/sections">Go to Sections</StyledLink>
            <StyledLink to="/books">Go to Book List</StyledLink>
            <StyledLink to="/signup">Sign Up</StyledLink>
        </HomeContainer>
    );
}

export default Home;