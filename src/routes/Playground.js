import StyledInputBase from "../components/inputs/input";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Main from "../components/layout/Main";

const Playground = () => {
    return (
        <div>
            <Header />
            <Main>
                <div className="home play">
                    <p className="head">Welcome to petroDynamic playground</p>
                    <div className="play-space">
                        <div className="pins">
                            <div
                                className="pin"
                                title="We are excited to announce the inception of tech courses on wazobia academy. Our students now have access to a variety of tech related courses. As a form of goodwill these courses will be free for ... read more"
                            >
                                <span className="im"></span>
                                <p>Model score</p>
                            </div>
                            <div
                                className="pin"
                                title="We are excited to announce the inception of tech courses on wazobia academy. Our students now have access to a variety of tech related courses. As a form of goodwill these courses will be free for ... read more"
                            >
                                <span className="im"></span>
                                <p>T vs P</p>
                            </div>
                            <div
                                className="pin"
                                title="We are excited to announce the inception of tech courses on wazobia academy. Our students now have access to a variety of tech related courses. As a form of goodwill these courses will be free for ... read more"
                            >
                                <span className="im"></span>
                                <p>Make prediction</p>
                            </div>
                            <div
                                className="pin"
                                title="We are excited to announce the inception of tech courses on wazobia academy. Our students now have access to a variety of tech related courses. As a form of goodwill these courses will be free for ... read more"
                            >
                                <span className="im"></span>
                                <p>Evaluation score</p>
                            </div>
                        </div>
                        <div className="endl">
                            <StyledInputBase />
                            <p>FILE UPLOAD</p>
                        </div>
                    </div>
                </div>
            </Main>
            <Footer />
        </div>
    );
};

export default Playground;
