import axios from "axios";
import "../savedRL.css";
import { useEffect, useState } from "react";
import { Output } from "./KnowMore";
import { Link } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useRecoilState, useSetRecoilState } from "recoil";
import { readLaterDataAtom, readLaterLawsPresentAtom } from "../store/atoms/readLaterLawsDataAtom";
import { savedReadLaterAtom } from "../store/atoms/savedReadLaterAtom";
import { showToastAtom, toastIconColorAtom, toastMsgAtom } from "../store/atoms/toastAtom";

function ReadLater() {
    const [readLaterLawPresent, setReadLaterLawPresent] = useRecoilState(readLaterLawsPresentAtom);
    const [readLaterLawsData, setReadLaterLawsData] = useRecoilState(readLaterDataAtom);
    const [showLoading, setShowLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);
    const setCurrLoc = useSetRecoilState(savedReadLaterAtom);
    const token = localStorage.getItem("token");

    const setShowToast = useSetRecoilState(showToastAtom);
    const setToastMsg = useSetRecoilState(toastMsgAtom);
    const setToastIcon = useSetRecoilState(toastIconColorAtom);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchReadLaterLaws = async () => {
        setShowLoading(true);
        setFetchError(false);
        try {
            const response = await axios.get(
                `https://api.lawprobe.xyz/v1/user/laws/readLater`,
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );

            if (response.status === 200) {
                const readLaterLaws = response.data.data;
                const lawPresentKeys = Object.keys(readLaterLaws).filter(key =>
                    Array.isArray(readLaterLaws[key]) && readLaterLaws[key].length > 0
                );

                setReadLaterLawPresent(lawPresentKeys);
                if (JSON.stringify(readLaterLaws) !== JSON.stringify(readLaterLawsData)) {
                    setReadLaterLawsData(readLaterLaws);
                }
            }
        } catch (error) {
            console.error("Error fetching read later laws:", error);
            setFetchError(true);
            setToastMsg(error.response?.data?.message || "Failed to fetch laws. Please try again.");
            setToastIcon("red");
            setShowToast(true);
        } finally {
            setShowLoading(false);
        }
    };

    useEffect(() => {
        fetchReadLaterLaws();
    }, []);

    const renderContent = () => {
        if (showLoading) {
            return <div className="loader"></div>;
        }

        if (fetchError) {
            return (
                <div className="no-laws-message">
                    <h2>Oops! Something went wrong.</h2>
                    <p>We couldn't retrieve your 'Read Later' list. Please check your connection and try again.</p>
                    <button className="signbtn" onClick={fetchReadLaterLaws}>Retry</button>
                </div>
            );
        }

        if (readLaterLawPresent.length === 0) {
            return (
                <div className="no-laws-message">
                    <h2>Your 'Read Later' List is Empty</h2>
                    <p>You haven't marked any laws to read later. Explore and add some!</p>
                    <Link to="/knowMore">
                        <button className="signbtn">Explore Laws</button>
                    </Link>
                </div>
            );
        }

        return (
            <div>
                {readLaterLawPresent.map((lawType) => (
                    <Output
                        key={lawType}
                        sectionData={readLaterLawsData[lawType]}
                        specificLaw={lawType}
                        showSaveRL={false}
                        showDelete={true}
                    />
                ))}
            </div>
        );
    };

    return (
        <div>
            <div className="readlaterHeading">
                <h1>Read Later Laws</h1>
                <p>
                    "Below are the laws you have marked for future reference. Feel free to
                    explore and review them at your convenience."
                </p>
            </div>

            {renderContent()}

            <Link className="saveReadLaterBtn" to="/laws/saved">
                <button className="signbtn" onClick={() => setCurrLoc("save")}>
                    Saved Laws <FaArrowRightFromBracket />
                </button>
            </Link>
        </div>
    );
}

export default ReadLater;
