import { useState } from "react";
import { GripVertical, Plus, Settings, Trash2 } from "lucide-react";

const SectionManager = ({ resumeData, setResumeData }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [newSectionTitle, setNewSectionTitle] = useState("");

  const sectionNames = {
    summary: "Professional Summary",
    experience: "Work Experience",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
    certifications: "Certifications",
    awards: "Awards & Achievements",
  };

  const handleDragStart = (sectionId) => {
    setDraggedItem(sectionId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (!draggedItem) return;

    const currentIndex = resumeData.sectionOrder.indexOf(draggedItem);
    if (currentIndex === -1) return;

    const newOrder = [...resumeData.sectionOrder];
    newOrder.splice(currentIndex, 1);
    newOrder.splice(targetIndex, 0, draggedItem);

    setResumeData({
      ...resumeData,
      sectionOrder: newOrder,
    });

    setDraggedItem(null);
  };

  const toggleSection = (sectionId, enabled) => {
    setResumeData({
      ...resumeData,
      enabledSections: {
        ...resumeData.enabledSections,
        [sectionId]: enabled,
      },
    });
  };

  const addCustomSection = () => {
    if (!newSectionTitle.trim()) return;

    const newSection = {
      id: `custom-${Date.now()}`,
      title: newSectionTitle,
      content: "",
    };

    setResumeData({
      ...resumeData,
      customSections: [...resumeData.customSections, newSection],
      sectionOrder: [...resumeData.sectionOrder, newSection.id],
      enabledSections: {
        ...resumeData.enabledSections,
        [newSection.id]: true,
      },
    });

    setNewSectionTitle("");
  };

  const removeCustomSection = (sectionId) => {
    setResumeData({
      ...resumeData,
      customSections: resumeData.customSections.filter(
        (s) => s.id !== sectionId
      ),
      sectionOrder: resumeData.sectionOrder.filter((id) => id !== sectionId),
      enabledSections: Object.fromEntries(
        Object.entries(resumeData.enabledSections).filter(
          ([key]) => key !== sectionId
        )
      ),
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          Section Management
        </h3>
      </div>
      <div className="p-6 space-y-4">
        {/* Section Order */}
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
            Section Order (Drag to reorder)
          </label>
          <div className="space-y-2">
            {resumeData.sectionOrder.map((sectionId, index) => {
              const isCustom = sectionId.startsWith("custom-");
              const customSection = isCustom
                ? resumeData.customSections.find((s) => s.id === sectionId)
                : null;
              const displayName = isCustom
                ? customSection?.title || "Custom Section"
                : sectionNames[sectionId] || sectionId;

              return (
                <div
                  key={sectionId}
                  draggable
                  onDragStart={() => handleDragStart(sectionId)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 cursor-move hover:border-gray-300 dark:hover:border-gray-500 transition-colors"
                >
                  <GripVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <input
                    type="checkbox"
                    checked={resumeData.enabledSections[sectionId] || false}
                    onChange={(e) => toggleSection(sectionId, e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-gray-900 dark:text-white flex-1">
                    {displayName}
                  </span>
                  {isCustom && (
                    <button
                      onClick={() => removeCustomSection(sectionId)}
                      className="p-1 text-red-600 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Custom Section */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Add Custom Section
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              placeholder="Section title (e.g., Languages, Volunteer Work)"
              className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={addCustomSection}
              disabled={!newSectionTitle.trim()}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md transition-colors flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionManager;
