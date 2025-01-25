import axios from "axios";
import "../savedRL.css";
import { useEffect, useState } from "react";
import { Output } from "./KnowMore";
import { Link } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { responseAtom } from "../store/atoms/response";
import { useRecoilState, useSetRecoilState } from "recoil";
import { savedLawsDataAtom, savedLawsPresentAtom } from "../store/atoms/savedLawsDataAtom";
import { savedReadLaterAtom } from "../store/atoms/savedReadLaterAtom";


function SavedLaws() {
  const [savedLawPresent, setSavedLawPresent] = useRecoilState(savedLawsPresentAtom);
  const [savedLawsData, setSavedLawsData] = useRecoilState(savedLawsDataAtom)
  const [showLoading, setShowLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [sectionData, setSectionData] = useRecoilState(responseAtom);
  const setCurrLoc = useSetRecoilState(savedReadLaterAtom);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchSavedLaws = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/v1/user/laws/saved`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const savedLaws = response.data.data;
      // function processData(data, specificLaw) {}
      if (response.status === 200) {
        const lawPresentKeys = [];
        for (const key in savedLaws) {
          if (Array.isArray(savedLaws[key]) && savedLaws[key].length > 0) {
            lawPresentKeys.push(key);
          }
        }
        setSavedLawPresent(lawPresentKeys);
        if(JSON.stringify(savedLaws) !== JSON.stringify(savedLawsData)){
          setSavedLawsData(savedLaws);
        }
        
        setShowLoading(false);
      }
    } catch (error) {
      console.error("Error fetching saved laws:", error);
    }
  };
  useEffect(() => {
    fetchSavedLaws();
  }, [savedLawsData]);


  return (
    <div>
      <div className="readlaterHeading">
        <h1>Saved Laws</h1>
        <p>
          "Here are the laws you've saved. Feel free to explore and review them
          at your convenience."
        </p>
      </div>
      {showLoading ? (
        <div class="loader"></div>
      ) : (
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
      )}
      <Link className="saveReadLaterBtn" to="/laws/readLater">
        <button className="signbtn" onClick={()=> setCurrLoc("readLater")}>ReadLater Laws <FaArrowRightFromBracket/></button>
      </Link>
    </div>
  );
}

export default SavedLaws;
