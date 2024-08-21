import React, { useState } from "react";
import { Edit2, Check, X } from "lucide-react";
import "./EditableField.css";

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({ value, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleSave = () => {
    onSave(editedValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="editable-field editing">
        <input
          type="text"
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
        />
        <button onClick={handleSave}>
          <Check size={16} />
        </button>
        <button onClick={handleCancel}>
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="editable-field">
      <span>{value}</span>
      <button onClick={() => setIsEditing(true)}>
        <Edit2 size={16} />
      </button>
    </div>
  );
};

export default EditableField;
