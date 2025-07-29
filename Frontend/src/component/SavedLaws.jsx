import axios from "axios";
import "../savedRL.css";
import { useEffect, useState } from "react";
import { Output } from "./KnowMore";
import { Link } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useRecoilState, useSetRecoilState } from "recoil";
import { savedLawsDataAtom, savedLawsPresentAtom } from "../store/atoms/savedLawsDataAtom";
import { savedReadLaterAtom } from "../store/atoms/savedReadLaterAtom";
import { showToastAtom, toastIconColorAtom, toastMsgAtom } from "../store/atoms/toastAtom";
import '../Responsive/RsavedRL.css';

function SavedLaws() {
    const [savedLawPresent, setSavedLawPresent] = useRecoilState(savedLawsPresentAtom);
    const [savedLawsData, setSavedLawsData] = useRecoilState(savedLawsDataAtom);
    const [showLoading, setShowLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false); 
    const token = localStorage.getItem("token");
    const setCurrLoc = useSetRecoilState(savedReadLaterAtom);

    const setShowToast = useSetRecoilState(showToastAtom);
    const setToastMsg = useSetRecoilState(toastMsgAtom);
    const setToastIcon = useSetRecoilState(toastIconColorAtom);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchSavedLaws = async () => {
        setShowLoading(true); 
        setFetchError(false); 
        try {
            const response = await axios.get(
                `https://api.lawprobe.xyz/v1/user/laws/saved`,
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
            
            if (response.status === 200) {
                const savedLaws = response.data.data;
                const lawPresentKeys = Object.keys(savedLaws).filter(key => 
                    Array.isArray(savedLaws[key]) && savedLaws[key].length > 0
                );

                setSavedLawPresent(lawPresentKeys);
                
                if (JSON.stringify(savedLaws) !== JSON.stringify(savedLawsData)) {
                    setSavedLawsData(savedLaws);
                }
            }
        } catch (error) {
            console.error("Error fetching saved laws:", error);
            setFetchError(true); 
            setToastMsg(error.response?.data?.message || "Failed to fetch saved laws. Please try again.");
            setToastIcon("red");
            setShowToast(true);
        } finally {
            setShowLoading(false);
        }
    };

    useEffect(() => {
        fetchSavedLaws();
    }, []);

    const renderContent = () => {
        if (showLoading) {
            return <div className="loader"></div>;
        }

        if (fetchError) {
            return (
                <div className="no-laws-message">
                    <h2>Oops! Something went wrong.</h2>
                    <p>We couldn't retrieve your saved laws. Please check your connection and try again.</p>
                    <button className="signbtn" onClick={fetchSavedLaws}>Retry</button>
                </div>
            );
        }

        if (savedLawPresent.length === 0) {
            return (
                <div className="no-laws-message">
                    <h2>Nothing Saved Yet</h2>
                    <p>You haven't saved any laws. Start exploring and save them for easy access!</p>
                    <Link to="/knowMore">
                        <button className="signbtn">Explore Laws</button>
                    </Link>
                </div>
            );
        }

        return (
            <div>
                {savedLawPresent.map((lawType) => (
                    <Output
                        key={lawType}
                        sectionData={savedLawsData[lawType]}
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
                <h1>Saved Laws</h1>
                <p>
                    Here are the laws you've saved. Feel free to explore and review them at your convenience.
                </p>
            </div>
            
            {renderContent()}

            <Link className="saveReadLaterBtn" to="/laws/readLater">
                <button className="signbtn" onClick={() => setCurrLoc("readLater")}>
                    ReadLater Laws <FaArrowRightFromBracket />
                </button>
            </Link>
        </div>
    );
}

export default SavedLaws;
