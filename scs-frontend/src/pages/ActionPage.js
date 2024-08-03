import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ActionPage() {
    const { id } = useParams();
    const [action, setAction] = useState(null);

    useEffect(() => {
        // 특정 id의 action 불러오기
    }, [id]);

    if (!action) return <div>Loading...</div>;

    return (
        <div>
            <h1>{action.content}</h1>
            <p>By User {action.writer}</p>
            <p>Recommended {action.recommendations.length} times</p>
            {/* 댓글 목록 및 댓글 입력 필드 추가 */}
        </div>
    );
}

export default ActionPage;