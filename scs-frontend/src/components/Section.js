import React, { useState } from "react";
import Question from "./Question";
import styled from "styled-components";

const SectionContainer = styled.div`
    margin-bottom: 1rem;
`;

const SectionHeader = styled.div`
    cursor: pointer;
    background-color: #f1f1f1;
    padding: 1rem;
    border: 1px solid #ddd;
`;

const QuestionsList = styled.div`
    margin-left: 1rem;
`;

function Section({ section }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <SectionContainer>
            <SectionHeader onClick={toggleOpen}>
                {section.subject}
            </SectionHeader>
            {isOpen && (
                <QuestionsList>
                    {section.questions.map((question) => (
                        <Question key={question.id} question={question} />
                    ))}
                </QuestionsList>
            )}
        </SectionContainer>
    );
}

export default Section;