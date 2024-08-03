import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const QuestionContainer = styled.div`
    magin-bottom: 0.5rem;
`;

const QuestionHeader = styled.div`
    cursor: pointer;
    background-color: #f9f9f9;
    padding: 0.5rem;
    border: 1px solid #eee;
`;

const ActionList = styled.div`
    margin-left: 1rem;
`;

function Question({ question }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <QuestionContainer>
            <QuestionHeader onClick={toggleOpen}>
                {question.content}
            </QuestionHeader>
            {isOpen && (
                <ActionList>
                    {question.actions.map((action) => (
                        <div key={action.id}>
                            <Link to={`/action/${action.id}`}>{action.content}</Link>
                        </div>
                    ))}
                </ActionList>
            )}
        </QuestionContainer>
    );
}

export default Question;