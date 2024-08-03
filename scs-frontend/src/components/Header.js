import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
    background-color: #282c34;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const Logo = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
`;

const Ul = styled.ul`
    list-style: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0;
    padding: 0;
    width: 100%
    flex-wrap: wrap;
`;

const Li = styled.li`
    color: white;
    margin: 0.5rem 1rem;
`;

const StyledNavLink = styled(NavLink)`
    color: white;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 5px;
    transition: all 0.3s ease;

    &:hover {
        color: #282c34;
        background-color: #61dafb;
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        transform: trnaslateY(-2px);
    }

    &.active {
        text-decoration: underline;
    }
`;

function Header() {
    return (
        <Nav>
            <Logo>Study Computer Science</Logo>
            <Ul>
                <Li><StyledNavLink to="/">Home</StyledNavLink></Li>
                <Li><StyledNavLink to="/sections">Sections</StyledNavLink></Li>
                <Li><StyledNavLink to="/books">Book List</StyledNavLink></Li>
                <Li><StyledNavLink to="/signup">Sign Up</StyledNavLink></Li>
            </Ul>
        </Nav>
    );
}

export default Header;