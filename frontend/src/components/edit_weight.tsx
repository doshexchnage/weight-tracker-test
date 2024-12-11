import React, { useState } from "react";

interface EditWeightDialogProps {
  currentWeight: string;
  onSave: (newWeight: string) => void;
  onClose: () => void;
}

const EditWeightDialog: React.FC<EditWeightDialogProps> = ({
  currentWeight,
  onSave,
  onClose,
}) => {
  const [newWeight, setNewWeight] = useState(currentWeight);

  const handleSave = () => {
    if (newWeight.trim() === "") {
      alert("Weight cannot be empty."); // Optional validation
      return;
    }
    onSave(newWeight);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-stone-700 p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-bold text-stone-300 mb-4">Edit Weight</h2>
        <input
          type="number"
          value={newWeight}
          onChange={(e) => setNewWeight(e.target.value)}
          className="border p-2 mb-4 w-full rounded-sm text-stone-900"
          placeholder="Enter new weight"
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

export default EditWeightDialog;
