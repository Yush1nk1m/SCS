import React, { useState } from "react";
import { changeUserPassword, deleteCurrentUser } from "../../api/userApi";
import { toast } from "react-hot-toast";
import "./SettingsModal.css";
import { useNavigate } from "react-router-dom";
import { removeTokens } from "../../utils/tokenUtils";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deletePassword, setDeletePassword] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      await changeUserPassword({
        password,
        newPassword,
        confirmPassword,
      });
      toast.success("비밀번호가 변경되었습니다.");
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
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

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "회원 탈퇴를 희망합니다.") {
      toast.error("회원 탈퇴 확인 문구가 일치하지 않습니다.");
      return;
    }
    try {
      await deleteCurrentUser({
        password: deletePassword,
        confirmMessage: deleteConfirm,
      });
      toast.success("회원 탈퇴가 완료되었습니다.");
      onClose();
      removeTokens();
      navigate("/");
      window.location.reload();
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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>설정</h2>
        <div className="modal-section">
          <h3>비밀번호 변경</h3>
          <input
            type="password"
            placeholder="현재 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="새 비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleChangePassword}>비밀번호 변경</button>
        </div>
        <div className="modal-section">
          <h3>회원 탈퇴</h3>
          <input
            type="password"
            placeholder="현재 비밀번호"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="'회원 탈퇴를 희망합니다.' 입력"
            value={deleteConfirm}
            onChange={(e) => setDeleteConfirm(e.target.value)}
          />
          <button onClick={handleDeleteAccount} className="delete-button">
            회원 탈퇴
          </button>
        </div>
        <button onClick={onClose} className="close-button">
          닫기
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
