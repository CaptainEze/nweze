import { useEffect, useState } from "react";
import StyledInputBase from "./inputs/input";

const ManualForm = ({ close = () => {} }) => {
    const [nphiValue, setNphiValue] = useState();
    const [grValue, setGrValue] = useState();
    const [depthValue, setDepthValue] = useState();
    const [phValue, setPhValue] = useState();
    const [pcValue, setPcValue] = useState();

    const [fpv, setFpv] = useState("--result--");

    useEffect(() => {
        if (nphiValue && grValue && depthValue && phValue && pcValue) {
            console.log("active");

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
        }
    }, [nphiValue, grValue, depthValue, phValue, pcValue]);

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
                        title={"PH"}
                        type="number"
                        placeholder="Enter PH value"
                        onInput={(v) => {
                            setPhValue(v);
                        }}
                    />
                    <StyledInputBase
                        title={"PC"}
                        type="number"
                        placeholder="Enter PC value"
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
