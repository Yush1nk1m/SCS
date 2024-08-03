import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BookList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // 모든 book들을 불러와 setBooks(response.data)
    }, []);

    return (
        <div>
            <h1>Book List</h1>
            {books.map((book) => (
                <div key={book.id}>
                    <Link to={`/book/${book.id}`}>{book.title}</Link>
                </div>
            ))}
        </div>
    );
}

export default BookList;