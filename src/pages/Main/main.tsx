import React, { useEffect, useState } from "react";
import store from "../../store/store";
import './style.css';

const Main: React.FC = () => {
    // const store = new Store();
    const [wieghtArr, setWeightArr] = useState([]);
    const [weight, setWeight] = useState({
        unit: '',
        value: 0
    });

    useEffect(() => {
        getWeights();
    }, []);

    const create = async () => {
        const data = {
            W_unit: 'g',
            W_value: 890
        }
        const weigth = await store.createWeight(data);
        console.log(weigth)
    };
    const getWeights = async () => {
        const weights = await store.getWeights();
        if (weights !== 'error' || weights !== null) {
            setWeightArr(weights);
        };
    };

    return (
        <div className="main-container">
            {wieghtArr.length >0 ?wieghtArr.map((weight:{W_value:string,W_unit:string }, index) => (
                <div key={index} className="bg-slate-500 m-2 w-10/12 h-32">
                    <p>Value: {weight.W_value}</p>
                    <p>Unit: {weight.W_unit}</p>
                </div>
            )):<p>NO DATA</p>}

        </div>
    )
}
export default Main