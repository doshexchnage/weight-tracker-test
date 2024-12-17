import React, { useEffect, useState } from "react";
import store from "../../store/store";
import './style.css';
import { Add_weigh } from '../../components/component';

const PredefinedWeights = ["67618a226936c042de915909","67618a346936c042de91590c","67618a476936c042de91590f"];

const Main: React.FC = () => {
    const [wieghtArr, setWeightArr] = useState([]);
    const [IsAdd, setIsAdd] = useState(false);
    const [IsUpdate, setIsUpdate] = useState(false);
    const [Selectedweight, setSelectedWeight] = useState({
        W_unit: '',
        W_value: 1
    });

    useEffect(() => {
        getWeights();
    }, []);

    const createWeight = async (e: any) => {
        store.setLoading(true);
        setIsAdd(false);
        const weight = await store.createWeight(e);
        if (weight === 'error' || weight === null) {
            window.alert('Failed add weight, somethhing went wrong');
            store.setLoading(false);
            return
        };
        getWeights();
        window.alert('Weight added successfully.!');
        store.setLoading(false);
    };
    const getWeights = async () => {
        const weights = await store.getWeights();
        if (weights !== 'error' || weights !== null) {
            setWeightArr(weights);
        }
    };
    function toggleAddWeight() { setIsAdd(true); };
    const deleteWeight = async (e: any) => {
        store.setLoading(true);
        let deletedItem = await store.deleteWeight(e.target.id);
        if (deletedItem === 'error' || deletedItem === null) {
            window.alert('Failed to delete!');
        } else {
            getWeights()
            // window.alert('Weight deleted successfully');
        };
        store.setLoading(false)
    };
    const toggleupdateWeight = async (e: any) => {
        let selectedW = wieghtArr.filter((item: { _id: string }) => {
            if (Object.values(item).includes(e.target.id)) {
                return item;
            };
        });
        if (selectedW.length > 0) {
            setSelectedWeight(selectedW[0]);
            setIsUpdate(true);
        };
    };
    function isUpdateOff() { setIsUpdate(false) };
    function getUpdatedData(e: { target: { id: string, value: string } }) {
        const ID = e.target.id;
        const VALUE = e.target.value;
        let selected = { ...Selectedweight };

        if (ID === 'w-value') {
            selected.W_value = Number(VALUE);
        } else {
            selected.W_unit = String(VALUE)
        };

        setSelectedWeight(selected);
    };
    const updateWeight = async () => {
        store.setLoading(true)
        const updatedW = await store.updateWeight(Selectedweight);
        if (updatedW ==='error' ||updatedW ===null){
            window.alert('Failed to updated weight!');
        }else{
            getWeights();
            window.alert('Weight updated successfully !');
            setIsUpdate(false)
        }
        store.setLoading(false)
    };
function closeCard(){setIsAdd(false)};
    return (
        <div className="flex flex-col items-center w-full h-screen overflow-x-hidden overflow-y-scroll ancestor-container">
            <div className="p-4 w-full max-w-xl main-container">
                {wieghtArr.length > 0 ? wieghtArr.map((weight: { _id: string, W_value: string, W_unit: string }, index) => {
                    return (
                        <div key={index} className="relative flex flex-col justify-center bg-slate-500 bg-opacity-45 m-2 rounded-2xl w-full min-h-36 overflow-hidden">
                            {PredefinedWeights.includes(weight._id) ? null : <p className="flex flex-col justify-center items-end p-1 w-full"><span id={weight._id} className="flex flex-col justify-center items-center bg-transparent pt-1 pb-0 w-1/6 h-7 text-gray-300 aspect-square" onClick={deleteWeight}>X</span></p>}
                            <p className="m-1 mt-0 text-4xl text-center">{weight.W_value} {weight.W_unit}</p>
                            <p className="m-2"><span onClick={toggleupdateWeight} id={weight._id} className="flex flex-col justify-center items-center mb-2 pb-0 w-1/2 h-8 text-center text-gray-300">Update</span></p>
                        </div>
                    );
                }) : <p>NO DATA</p>}
                <span onClick={toggleAddWeight} className="m-4 cursor-pointer">+</span>

                {IsAdd ? <Add_weigh onSubmit={createWeight} onClose={closeCard} /> : null}
            </div>
            {IsUpdate ?
                <div className="add_weight">
                    <div className="flex flex-col justify-evenly items-center bg-white rounded-3xl min-w-96 min-h-96 text-sky-400">
                        <p className="flex flex-col justify-center items-end p-1 w-full">
                            <span onClick={isUpdateOff} className="flex flex-col justify-center items-center bg-transparent pt-1 pb-0 w-1/6 h-7 text-gray-300 aspect-square">
                                X
                            </span>
                        </p>

                        <p className="m-4">Add Weight</p>
                        <input type="text" id="w-unit" placeholder="Unit: g/kg/T" value={Selectedweight.W_unit} className="m-1 p-3" onChange={getUpdatedData} />
                        <input type="number" id="w-value" placeholder="1" className="p-3" value={Selectedweight.W_value} min="1" max="999" step="1" onChange={getUpdatedData} />
                        <button className="bg-sky-400 m-2 px-4 py-2 rounded-3xl w-36 text-white" onClick={updateWeight}>
                            Update
                        </button>
                    </div>
                </div>
                : null
            }

        </div>
    );
};

export default Main;
