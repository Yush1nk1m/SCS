import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Section from "../components/Section";

function BookPage() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        // 특정 id의 book 불러와 setBook(response.data)
    }, [id]);

    if (!book) return <div>Loading...</div>;

    return (
        <div>
            <h1>{book.title}</h1>
            <p>{book.description}</p>
            {book.sections.map((section) => (
                <Section key={section.id} section={section} />
            ))}
        </div>
    );
}

export default BookPage;