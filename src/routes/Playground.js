import { useState } from "react";
import StyledInputBase from "../components/inputs/input";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Main from "../components/layout/Main";

const Playground = () => {
    const [imgActive, setImgActive] = useState(false);

    const [mae, setMae] = useState(null);
    const [r2, setR2] = useState(null);
    const [imgData, setImgData] = useState(null);

    const [predict2Active, setPredict2Active] = useState(false);
    //   const [predict2Value]

    const upload = (e) => {
        const fileInput = document.getElementById("fileInput");
        const file = fileInput.files[0]; // Get the first selected file

        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        e.target.value = "";

        fetch("http://127.0.0.1:5000/plot", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json(); // Parse JSON response if available
                } else {
                    throw new Error("File upload failed.");
                }
            })
            .then((data) => {
                console.log("File uploaded successfully:", data);
                setMae(data.MAE);
                setR2(data.r2);
                setImgData(`data:image/png;base64,${data.img}`);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const Img = () => {
        return (
            <div className="plot-cont">
                <div>
                    {imgData && <img alt="plot" src={imgData} />}
                    <button
                        className="close"
                        onClick={() => {
                            setImgActive(false);
                        }}
                    >
                        <svg
                            width="20px"
                            height="17px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                                stroke="#1C274C"
                                stroke-width="1.5"
                                stroke-linecap="round"
                            />
                            <path
                                d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                                stroke="#1C274C"
                                stroke-width="1.5"
                                stroke-linecap="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        );
    };

    const Predict2 = () => {
        return (
            <div className="plot-cont">
                <div>
                    <button
                        className="close"
                        onClick={() => {
                            setPredict2Active(false);
                        }}
                    >
                        <svg
                            width="20px"
                            height="17px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                                stroke="#1C274C"
                                stroke-width="1.5"
                                stroke-linecap="round"
                            />
                            <path
                                d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                                stroke="#1C274C"
                                stroke-width="1.5"
                                stroke-linecap="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Header />
            <Main>
                <div className="home play">
                    <p className="head">Welcome to petroDynamic playground</p>
                    <div className="play-space">
                        <div className="pins">
                            <div className="pin" title={`R2: ${r2}`}>
                                <span className="im"></span>
                                <p>
                                    Model score <em>({r2 && `R2: ${r2}`})</em>
                                </p>
                            </div>
                            <div
                                className="pin"
                                // title="We are excited to announce the inception of tech courses on wazobia academy. Our students now have access to a variety of tech related courses. As a form of goodwill these courses will be free for ... read more"
                                onClick={() => {
                                    setImgActive(true);
                                }}
                            >
                                <span className="im"></span>
                                <p>T vs P</p>
                            </div>
                            <div
                                className="pin"
                                // title="We are excited to announce the inception of tech courses on wazobia academy. Our students now have access to a variety of tech related courses. As a form of goodwill these courses will be free for ... read more"
                                onClick={() => {
                                    setPredict2Active(true);
                                }}
                            >
                                <span className="im"></span>
                                <p>Make prediction</p>
                            </div>
                            <div className="pin" title={`MAE: ${mae}`}>
                                <span className="im"></span>
                                <p>
                                    Evaluation score{" "}
                                    <em>({mae && `MAE: ${mae}`})</em>
                                </p>
                            </div>
                        </div>
                        <div className="endl">
                            <StyledInputBase />
                            <div className="file-cont">
                                <input
                                    id="fileInput"
                                    type="file"
                                    className="file"
                                    accept=".xls, .xlsx, .csv"
                                    onChange={upload}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {imgActive && <Img />}
                {predict2Active && <Predict2 />}
            </Main>
            <Footer />
        </div>
    );
};

export default Playground;
