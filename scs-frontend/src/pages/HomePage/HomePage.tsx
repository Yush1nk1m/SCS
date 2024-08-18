import React from "react";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <div className="content-wrapper">
        <h1 className="textLine line1">환영합니다!</h1>
        <p className="textLine line2">SCS에서 전공 지식을 학습하세요.</p>
        <p className="textLine line3">여러분을 응원합니다.</p>
      </div>
    </div>
  );
};

export default HomePage;
