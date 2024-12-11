import React, { useState } from "react";

interface EditGoalDialogProps {
  currentGoal: string;
  onSave: (newGoal: string) => void;
  onClose: () => void;
}

const EditGoalDialog: React.FC<EditGoalDialogProps> = ({
  currentGoal,
  onSave,
  onClose,
}) => {
  const [newGoal, setNewGoal] = useState(currentGoal);

  const handleSave = () => {
    if (newGoal.trim() === "") {
      alert("Goal cannot be empty."); // Optional validation
      return;
    }
    onSave(newGoal);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-stone-700 p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-bold text-stone-300 mb-4">Edit Goal</h2>
        <input
          type="number"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          className="border p-2 mb-4 w-full rounded-sm text-stone-900"
          placeholder="Enter new goal"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGoalDialog;
