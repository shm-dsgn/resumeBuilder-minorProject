import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./ResumeItem.css";
import { useState } from "react";

import  {MdInfoOutline, MdModeEditOutline, MdOutlineMenu} from "react-icons/md";
import Switch from "../switch/Switch";

function ResumeItem({ itemData, onToggle, onEdit, editId, onEditId }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: itemData.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: isDragging ? "#381e72 solid 1px" : "",
    zIndex: isDragging ? 2 : 1,
    boxShadow: isDragging ? "0px 0px 5px 0px #381e72" : "",
  };

  const [isEdit, setIsEditing] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [newTitle, setNewTitle] = useState(itemData.title);

  const handleToggle = () => {
    onToggle(itemData.title);
  };

  const handleEdit = () => {
    setIsEditing(true);
    onEditId(itemData.id);
  };

  const handleSave = () => {
    if (itemData.title !== newTitle) {
      onEdit(itemData.title, newTitle);
      setIsEditing(false);
      onEditId(-1);
    }
  };

  const handleCancel = () => {
    setNewTitle(itemData.title);
    setIsEditing(false);
    onEditId(-1);
  };

  const className =
    editId === -1
      ? "item"
      : editId === itemData.id
      ? "item"
      : "item item-disable";

  return (
    <div style={style} ref={setNodeRef} {...attributes} className={className}>
      <div className="item__left">
        <div className="drag-icon" {...listeners}>
          <MdOutlineMenu fontSize="24px"/>
        </div>
        <div className="info-icon" onClick={() => setShowDesc(!showDesc)}>
          <MdInfoOutline fontSize="24px"/>
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
            <MdModeEditOutline fontSize="18px" />
          </div>
        ) : (
          <div>
            <button
              onClick={handleSave}
              className={
                itemData.title !== newTitle
                  ? "edit-save-btn"
                  : "edit-save-btn inactive"
              }
            >
              Save
            </button>
            <button onClick={handleCancel} className="edit-cancel-btn">
              Cancel
            </button>
          </div>
        )}
        <div className="toggle-switch" onClick={handleToggle}>
          <Switch checked={itemData.enabled} />
        </div>
      </div>
    </div>
  );
}

export default ResumeItem;
