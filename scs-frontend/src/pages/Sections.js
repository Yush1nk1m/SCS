import React, { useState, useEffect } from "react";
import { axios } from "axios";
import Section from "../components/Section";

function Sections() {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        // API 호출로 섹션 데이터를 가져온다.
    }, []);

    return (
        <div>
            <h1>Sections</h1>
            {sections.map((section) => (
                <Section key={section.id} section={section} />
            ))}
        </div>
    );
}

export default Sections;