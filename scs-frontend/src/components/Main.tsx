import React from "react";
import "./Main.css";

interface MainProps {
  page: string;
}

const Main: React.FC<MainProps> = ({ page }) => {
  return <main className="main-content"></main>;
};

export default Main;
