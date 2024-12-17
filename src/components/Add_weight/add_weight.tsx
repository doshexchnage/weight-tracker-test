import React, { useState } from "react";
import './style.css';

interface Weight {
    W_value: number;
    W_unit: string;
}

interface AddWeighProps {
    onSubmit: (weight: Weight) => void; 
    onClose: () =>void;
}

const AddWeigh: React.FC<AddWeighProps> = ({onClose},{ onSubmit } ) => {
    const [Weight, setWeight] = useState<Weight>({
        W_value: 0,
        W_unit: ''
    });

    // Handle input changes
    const fetchData = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = e.target;
        setWeight((prevWeight) => ({
            ...prevWeight,
            [id === 'w-value' ? 'W_value' : 'W_unit']: id === 'w-value' ? Number(value) : value,
        }));
    };

    // Submit handler
    const Submit = (): void => {
        if (Weight.W_value > 0 && Weight.W_unit.trim()) {
            onSubmit(Weight); 
        } else {
            console.error("Invalid weight data. Please fill in all fields correctly.");
        }
    };
    function exit() {
        onClose();
    };
    return (
        <div className="add_weight">
            <div className="flex flex-col justify-evenly items-center bg-white rounded-3xl min-w-96 min-h-96 text-sky-400">
                <p className="flex flex-col justify-center items-end p-1 w-full">
                    <span onClick={exit} className="flex flex-col justify-center items-center bg-transparent shadow-none pt-1 pb-0 w-1/6 h-7 text-gray-300 aspect-square">
                        X
                    </span>
                </p>

                <p className="m-4">Add Weight</p>

                <input type="text" id="w-unit" placeholder="Unit: g/kg/T" className="m-1 p-3" onChange={fetchData} />
                <input type="number" id="w-value" placeholder="1" className="p-3" min="1" max="999" step="1" onChange={fetchData} />
                <button className="bg-sky-400 m-2 px-4 py-2 rounded text-white" onClick={Submit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default AddWeigh;
