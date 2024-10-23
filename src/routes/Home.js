import { useState } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Main from "../components/layout/Main";
import ManualForm from "../components/ManualForm";
import { ArrowRight } from "../components/svgs";

const Home = () => {
    const [isInputActive, setIsInputActive] = useState(false);
    return (
        <div>
            <Header />
            <Main>
                <div className="home">
                    <p className="head">
                        Formation Pressure
                        <br />
                        Predictor
                    </p>
                    <p className="pre">
                        Determine Formation Pressure in just a few
                        <br />
                        clicks with this Formation Pressure Predictor
                    </p>
                    <div className="action">
                        <button
                            className="bgls"
                            onClick={() => {
                                setIsInputActive(true);
                            }}
                        >
                            <span>Manual Input</span>
                            <ArrowRight />
                        </button>
                        <button className="bgls">
                            <span>Automatic Input</span>
                        </button>
                    </div>
                </div>
            </Main>
            <Footer />
            {isInputActive && (
                <ManualForm
                    close={() => {
                        setIsInputActive(false);
                    }}
                />
            )}
        </div>
    );
};

export default Home;
