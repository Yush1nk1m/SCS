import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Flame, Trophy, Star, HelpCircle } from "lucide-react";
import "./ContributionBox.css";

interface ContributionBoxProps {
  type: "created" | "question" | "action" | "book";
  total: number;
  percentile: number;
}

const ContributionBox: React.FC<ContributionBoxProps> = ({
  type,
  total,
  percentile,
}) => {
  const [animatedPercentile, setAnimatedPercentile] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentile(100 - percentile);
    }, 500);

    return () => clearTimeout(timer);
  }, [percentile]);

  const getContributionInfo = () => {
    switch (type) {
      case "created":
        return { icon: Flame, color: "#FF6B6B", text: "총 생성 수" };
      case "question":
        return { icon: HelpCircle, color: "#4ECDC4", text: "질문 스크랩 수" };
      case "action":
        return { icon: Star, color: "#FFD93D", text: "액션 좋아요 수" };
      case "book":
        return { icon: Trophy, color: "#6639A6", text: "문제집 좋아요 수" };
    }
  };

  const { icon: Icon, color, text } = getContributionInfo();

  const getPercentileText = (percentile: number) => {
    if (percentile === 0) return "최상위";
    if (percentile < 1) return "상위 1% 미만";
    return `상위 ${percentile.toFixed(1)}%`;
  };

  return (
    <div className="contribution-box">
      <div className="contribution-header">
        <Icon size={24} color={color} />
        <h3>{text}</h3>
      </div>
      <div className="contribution-content">
        <div className="contribution-stat">
          <p>총 횟수</p>
          <h2>{total}</h2>
        </div>
        <div className="contribution-percentile">
          <CircularProgressbar
            value={animatedPercentile}
            text={getPercentileText(percentile)}
            styles={buildStyles({
              textColor: color,
              pathColor: color,
              trailColor: "#f0f0f0",
              textSize: "12px",
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default ContributionBox;
