import React, { useState, useEffect } from "react";
import {
  changeUserAffiliation,
  changeUserNickname,
  changeUserPosition,
  getCurrentUser,
  getMyContribution,
} from "../../api/userApi";
import { UserDto } from "../../api/swaggerApi";
import ContributionBox from "../../components/ContributionBox/ContributionBox";
import SettingsModal from "../../components/SettingsModal/SettingsModal";
import "./MyPage.css";
import toast from "react-hot-toast";
import EditableField from "../../components/EditableField/EditableField";

type ContributionType = "created" | "question" | "action" | "book";

interface ContributionData {
  type: ContributionType;
  total: number;
  percentile: number;
}

const MyPage: React.FC = () => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [contributions, setContributions] = useState<ContributionData[]>([]);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  useEffect(() => {
    fetchUserData();
    fetchContributions();
  }, []);

  const fetchUserData = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error: any) {
      switch (error.status) {
        case 401:
          toast.error("로그인이 필요합니다.");
          break;
        default:
          toast.error("예기치 못한 에러가 발생했습니다.");
      }
    }
  };

  const fetchContributions = async () => {
    const types: ContributionType[] = ["created", "question", "action", "book"];
    const contributionPromises = types.map((type) => getMyContribution(type));

    try {
      const results = await Promise.all(contributionPromises);
      const formattedContributions = results.map((result, index) => ({
        type: types[index],
        total: result.total,
        percentile: result.percentile,
      }));
      setContributions(formattedContributions);
    } catch (error: any) {
      switch (error.status) {
        case 401:
          toast.error("로그인이 필요합니다.");
          break;
        default:
          toast.error("예기치 못한 에러가 발생했습니다.");
      }
    }
  };

  const handleUpdateField = async (
    field: "nickname" | "affiliation" | "position",
    value: string
  ) => {
    if (!user) return;

    try {
      let updatedUser;
      switch (field) {
        case "nickname":
          updatedUser = await changeUserNickname({ nickname: value });
          break;
        case "affiliation":
          updatedUser = await changeUserAffiliation({ affiliation: value });
          break;
        case "position":
          updatedUser = await changeUserPosition({ position: value });
          break;
      }
      setUser(updatedUser);
      toast.success(`${field} 수정 완료`);
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
      toast.error(`${field} 수정 실패`);
    }
  };

  return (
    <div className="my-page">
      <h1>마이페이지</h1>
      {user && (
        <div className="profile-info">
          <h2>
            <EditableField
              value={user.nickname}
              onSave={(value) => handleUpdateField("nickname", value)}
            />
          </h2>
          <p>이메일: {user.email}</p>
          <p>
            {"소속: "}
            <EditableField
              value={user.affiliation}
              onSave={(value) => handleUpdateField("affiliation", value)}
            />
          </p>
          <p>
            {"포지션: "}
            <EditableField
              value={user.position}
              onSave={(value) => handleUpdateField("position", value)}
            />
          </p>
        </div>
      )}
      <div className="contribution-grid">
        {contributions.map((contrib) => (
          <ContributionBox
            key={contrib.type}
            type={contrib.type}
            total={contrib.total}
            percentile={contrib.percentile}
          />
        ))}
      </div>
      <button onClick={() => setIsSettingsModalOpen(true)}>설정</button>
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </div>
  );
};

export default MyPage;
