import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useState } from "react";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import "./App.css";
import ResumeItem from "./ResumeItem";

function App() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Profile Summary",
      description:
        "A concise overview highlighting key skills, qualifications, and experience.",
      enabled: true,
    },
    {
      id: 2,
      title: "Academic and Cocurricular Achievements",
      description:
        "Highlights academic accomplishments, awards, and notable achievements.",
      enabled: true,
    },
    {
      id: 3,
      title: "Summer Internship Experience",
      description:
        "Provides details about your internships during the summer period.",
      enabled: true,
    },
    {
      id: 4,
      title: "Work Experience",
      description:
        "Outlines your previous work experiences, including job positions, responsibilities, and accomplishments.",
      enabled: true,
    },
    {
      id: 5,
      title: "Projects",
      description:
        "Highlights significant projects you have completed, showcasing your skills.",
      enabled: true,
    },
    {
      id: 6,
      title: "Certifications",
      description:
        "Includes information about certifications or professional qualifications you have obtained.",
      enabled: true,
    },
    {
      id: 7,
      title: "Leadership Positions",
      description:
        "Describes your leadership roles or positions held, highlighting your responsibilities.",
      enabled: true,
    },
    {
      id: 8,
      title: "Extracurricular",
      description:
        "Includes involvement in extracurricular activities, such as clubs, sports, volunteer work, or community engagement.",
      enabled: true,
    },
    {
      id: 9,
      title: "Education",
      description:
        "Provides details about your educational background, including degrees and institutions.",
      enabled: true,
    },
  ]);

  const handleToggle = (title) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.title === title ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  const handleEdit = (oldTitle, newTitle) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.title === oldTitle ? { ...item, title: newTitle } : item
      )
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    // console.log("active", active.id);
    // console.log("over", over.id);

    if (!active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        // console.log(arrayMove(items, oldIndex, newIndex));
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    // console.log("drag end");
  };

  console.log(items);

  return (
    <div className="App">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <h1>Select your sections</h1>
        <SortableContext
          items={items}
          strategy={verticalListSortingStrategy}
          modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        >
          {items.map((item) => (
            <ResumeItem
              key={item.id}
              itemData={item}
              onEdit={handleEdit}
              onToggle={handleToggle}
            />
          ))}
        </SortableContext>
        <button className="save-next-btn">Save and Next</button>
      </DndContext>
    </div>
  );
}

export default App;
