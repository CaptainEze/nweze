import { useEffect, useState } from "react";
import StyledInputBase from "./inputs/input";

const ManualForm = ({ close = () => {} }) => {
    const [nphiValue, setNphiValue] = useState();
    const [grValue, setGrValue] = useState();
    const [depthValue, setDepthValue] = useState();
    const [phValue, setPhValue] = useState();
    const [pcValue, setPcValue] = useState();
    const [caliperValue, setCaliperValue] = useState();
    const [resValue, setResValue] = useState();

    const [fpv, setFpv] = useState("--result--");

    useEffect(() => {
        if (nphiValue && grValue && depthValue && phValue && pcValue && caliperValue && resValue) {

            // Do the request here.
            // ----------------------------------
            // This part of the code gets executed when all fields are
            // entered into the inputs.
            //
            // The values of the inputs are stored in these five variables
            // nphiValue, grValue, depthValue, phValue, pcValue.
            //
            // The values gets updated automatically when ever there
            // is a change in the input fields

            // After the computation and a result is obtained, format it properly
            // and call: `setFpv(value)` where value is the formatted result.
            // setFpv() automatically updates the UI

            const data = {
                nphiValue, grValue, depthValue, phValue, pcValue, caliperValue, resValue
            }

            fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json' // Set content type to JSON
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    console.log(response)
                    if (!response.ok) {
                    throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    setFpv(data.prediction);
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        }
    }, [nphiValue, grValue, depthValue, phValue, pcValue, caliperValue, resValue]);

    return (
        <div className="manual-form">
            <div className="content">
                <button className="close-btn" onClick={close}>
                    Close
                </button>
                 <div className="main">
                    <StyledInputBase
                        title={"NPHI"}
                        type="number"
                        placeholder="Enter NPHI value"
                        onInput={(v) => {
                            setNphiValue(v);
                        }}
                    />
                    <StyledInputBase
                        title={"Caliper"}
                        type="number"
                        placeholder="Enter Caliper value"
                        onInput={(v) => {
                            setCaliperValue(v);
                        }}
                    />
                    <StyledInputBase
                        title={"RES"}
                        type="number"
                        placeholder="Enter Resistivity value"
                        onInput={(v) => {
                            setResValue(v);
                        }}
                    />
                    <StyledInputBase
                        title={"GR"}
                        type="number"
                        placeholder="Enter GRI value"
                        onInput={(v) => {
                            setGrValue(v);
                        }}
                    />
                    <StyledInputBase
                        title={"Depth"}
                        type="number"
                        placeholder="Enter depth value"
                        onInput={(v) => {
                            setDepthValue(v);
                        }}
                    />
                    <StyledInputBase
                        title={"SONIC"}
                        type="number"
                        placeholder="Enter Sonic value"
                        onInput={(v) => {
                            setPhValue(v);
                        }}
                    />
                    <StyledInputBase
                        title={"Density"}
                        type="number"
                        placeholder="Enter Density value"
                        onInput={(v) => {
                            setPcValue(v);
                        }}
                    />
                </div>
                <div className="result-cont">
                    <p>FORMATION PRESSURE</p>
                    <p className="res">{fpv}</p>
                </div>
            </div>
        </div>
    );
};

export default ManualForm;