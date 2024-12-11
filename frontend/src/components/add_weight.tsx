import React, { useState } from "react";

interface AddWeightProps {
  onAdd: (newWeight: { weight: string; timestamp: string }) => void;
  onClose: () => void;
}

const AddWeight: React.FC<AddWeightProps> = ({ onAdd, onClose }) => {
  const [weight, setWeight] = useState("");

  const time = new Date().toLocaleTimeString();

  const handleSubmit = () => {
    if (weight) {
      onAdd({
        weight,
        timestamp: new Date().toLocaleString(),
      });
      setWeight("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-stone-700 p-6 rounded-lg shadow-md w-96">
        <div className="flex mb-4 gap-4 justify-between items-center">
          <h2 className="text-xl font-bold text-stone-300">Add Weight</h2>
          <p className="text-md px-4 text-stone-50">{time}</p>
        </div>
        <input
          type="number"
          placeholder="Enter weight"
          className="border p-2 mb-4 w-full rounded-sm"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWeight;
