import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./ResumeItem.css";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

function ResumeItem({ itemData, onToggle, onEdit }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: itemData.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isEdit, setIsEditing] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [newTitle, setNewTitle] = useState(itemData.title);

  const handleToggle = () => {
    onToggle(itemData.title);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(itemData.title, newTitle);
    setIsEditing(false);
  };

  return (
    <div style={style} ref={setNodeRef} {...attributes} className="item">
      <div className="item__left">
        <div className="drag-icon" {...listeners}>
          <MenuOutlinedIcon />
        </div>
        <div className="info-icon" onClick={() => setShowDesc(!showDesc)}>
          <InfoOutlinedIcon />
        </div>

        {isEdit ? (
          <input
            className="input"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            autoFocus
          />
        ) : (
          <div className="text-section">
            <p className="title">{newTitle}</p>
            {showDesc && <p className="description">{itemData.description}</p>}
          </div>
        )}
      </div>
      <div className="item__right">
        {!isEdit ? (
          <div className="edit-icon" onClick={handleEdit}>
            <EditOutlinedIcon fontSize="18px" />
          </div>
        ) : (
          <button onClick={handleSave}>Save</button>
        )}
        <div className="toggle-switch" onClick={handleToggle}>
          <Switch checked={itemData.enabled} />
        </div>
      </div>
    </div>
  );
}

export default ResumeItem;