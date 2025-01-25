import axios from "axios";
import "../savedRL.css";
import { useEffect, useState } from "react";
import { Output } from "./KnowMore";
import { Link } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useRecoilState, useSetRecoilState } from "recoil";
import { readLaterDataAtom, readLaterLawsPresentAtom } from "../store/atoms/readLaterLawsDataAtom";
import { savedReadLaterAtom } from "../store/atoms/savedReadLaterAtom";


function ReadLater() {
  const [readLaterLawPresent, setReadLaterLawPresent] = useRecoilState(readLaterLawsPresentAtom)
  const [readLaterLawsData, setReadLaterLawsData] = useRecoilState(readLaterDataAtom);
  const [showLoading, setShowLoading] = useState(true);
  const setCurrLoc = useSetRecoilState(savedReadLaterAtom)
  const token = localStorage.getItem("token");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchreadLaterLaws = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/v1/user/laws/readLater`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const readLaterLaws = response.data.data;
      // function processData(data, specificLaw) {}
      if (response.status === 200) {
        const lawPresentKeys = [];
        for (const key in readLaterLaws) {
          if (
            Array.isArray(readLaterLaws[key]) &&
            readLaterLaws[key].length > 0
          ) {
            lawPresentKeys.push(key);
          }
        }
        setReadLaterLawPresent(lawPresentKeys);
        if(JSON.stringify(readLaterLaws) !== JSON.stringify(readLaterLawsData)){
          setReadLaterLawsData(readLaterLaws);
        }
        
        setShowLoading(false);
      }
    } catch (error) {
      console.error("Error fetching saved laws:", error);
    }
  };
  useEffect(() => {
    fetchreadLaterLaws();
  }, [readLaterLawsData]);

  return (
    <div>
      <div className="readlaterHeading">
        <h1>Read Later Laws</h1>
        <p>
          "Below are the laws you have marked for future reference. Feel free to
          explore and review them at your convenience."
        </p>
      </div>
      {showLoading ? (
        <div className="loader"></div>
      ) : (
        <div>
          {readLaterLawPresent.map((lawType) => (
            <Output
              key={lawType}
              sectionData={readLaterLawsData[lawType]}
              specificLaw={lawType}
              showSaveRL={false}
              showDelete = {true}
            />
          ))}
        </div>
      )}
      <Link className="saveReadLaterBtn" to="/laws/saved">
        <button className="signbtn"onClick={()=> setCurrLoc("save")}>Saved Laws <FaArrowRightFromBracket/></button>
      </Link>
    </div>
  );
}

export default ReadLater;
