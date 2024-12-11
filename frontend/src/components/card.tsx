import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import MeasurementsTable from "./measurements_table";
import AddWeight from "./add_weight";
import EditWeightDialog from "./edit_weight";
import EditGoalDialog from "./edit_goal";

export default function Card({
  user,
}: {
  user: {
    email: string;
    username: string;
    goal: string;
    measurements: { weight: string; timestamp: string }[];
  };
}) {
  const [showAddWeight, setShowAddWeight] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showEditGoalDialog, setShowEditGoalDialog] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [measurements, setMeasurements] = useState<
    { weight: string; timestamp: string }[]
  >([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${user.email}`)
      .then((response) => {
        setMeasurements(response.data.measurements);
      })
      .catch((error) => {
        toast.error("Failed to load measurements");
        console.error(error);
      });
  }, [user.email]);

  function handleGoalUpdate(newGoal: string) {
    axios
      .put(`http://localhost:5000/users/${user.email}/goal`, {
        goal: newGoal,
      })
      .then((response) => {
        user.goal = response.data.goal;
        toast.success("Goal updated successfully!");
        setShowEditGoalDialog(false);
      })
      .catch((error) => {
        toast.error("Failed to update goal");
        console.error(error);
      });
  }

  function handleEdit(index: number) {
    setSelectedIndex(index);
    setShowEditDialog(true);
  }

  function saveEdit(newWeight: string) {
    if (selectedIndex === null) return;

    const selectedMeasurement = measurements[selectedIndex];
    axios
      .put(
        `http://localhost:5000/users/${user.email}/weights/${selectedMeasurement.timestamp}`,
        { weight: newWeight }
      )
      .then((response) => {
        const updatedMeasurements = [...measurements];
        updatedMeasurements[selectedIndex] = response.data;
        setMeasurements(updatedMeasurements);
        toast.success("Weight updated successfully!");
        setShowEditDialog(false);
        setSelectedIndex(null);
      })
      .catch((error) => {
        toast.error("Failed to update weight");
        console.error(error);
      });
  }

  const handleDelete = (index: number) => {
    const selectedMeasurement = measurements[index];

    axios
      .delete(
        `http://localhost:5000/users/${user.email}/weights/${selectedMeasurement.timestamp}`
      )
      .then(() => {
        const updatedMeasurements = measurements.filter((_, i) => i !== index);
        setMeasurements(updatedMeasurements);
        toast.success("Weight deleted successfully!");
      })
      .catch((error) => {
        toast.error("Failed to delete weight");
        console.error(error);
      });
  };

  function addWeight(newWeight: { weight: string; timestamp: string }) {
    axios
      .post(`http://localhost:5000/users/${user.email}/weights`, newWeight)
      .then((response) => {
        setMeasurements([...measurements, response.data]);
        toast.success("Weight added successfully!");
        setShowAddWeight(false);
      })
      .catch((error) => {
        toast.error("Failed to add weight");
        console.error(error);
      });
  }

  function toGoal(goal: number) {
    if (measurements.length === 0) {
      return `No weight data available to calculate your goal.`;
    }

    const lastWeight = measurements.reduce((latest, current) => {
      return new Date(current.timestamp) > new Date(latest.timestamp)
        ? current
        : latest;
    }, measurements[0]);

    const currentWeight = parseFloat(lastWeight.weight);

    if (currentWeight > goal) {
      return `You are ${Math.abs(currentWeight - goal)} kg from your goal.`;
    } else {
      return `Congrats! You have overachieved your goal by ${Math.abs(
        goal - currentWeight
      )} kg!`;
    }
  }

  return (
    <div className="w-1/2 flex flex-col border-yellow-600 border rounded-lg p-6 bg-stone-700">
      <div className="border-b border-yellow-600 mb-6">
        <h1 className="text-2xl font-bold text-stone-300">Weight Tracker</h1>
        <div className="flex justify-between text-lg px-2 py-2 text-stone-300">
          <h4 className="text-lg px-2 py-2 text-stone-300">
            Hi <strong>{user.username}</strong>!
          </h4>
          <h4>
            Goal:{" "}
            <span className="text-yellow-400 font-bold">
              {user.goal ? user.goal : "0"}
            </span>{" "}
            kg{" "}
            <button
              onClick={() => setShowEditGoalDialog(true)}
              className="bg-stone-500 text-yellow-400 px-2 mx-4 rounded"
            >
              Edit
            </button>
          </h4>
        </div>
        <p className="text-stone-400 pb-4 pl-4">{toGoal(Number(user.goal))}</p>
      </div>
      <div>
        <MeasurementsTable
          measurements={measurements}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <div>
        <button
          onClick={() => setShowAddWeight(true)}
          className="bg-stone-500 text-yellow-400  px-4 py-2 rounded"
        >
          Add Weight
        </button>
      </div>

      {/* Show Goal dialog */}
      {showEditGoalDialog && (
        <EditGoalDialog
          currentGoal={user.goal}
          onSave={handleGoalUpdate}
          onClose={() => setShowEditGoalDialog(false)}
        />
      )}

      {/* Show Edit dialog */}
      {showEditDialog && selectedIndex !== null && (
        <EditWeightDialog
          currentWeight={measurements[selectedIndex].weight}
          onSave={saveEdit}
          onClose={() => setShowEditDialog(false)}
        />
      )}

      {/* Show Add dialog */}
      {showAddWeight && (
        <AddWeight onAdd={addWeight} onClose={() => setShowAddWeight(false)} />
      )}
    </div>
  );
}
