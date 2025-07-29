import { useEffect, useMemo } from "react";
import "../Knowmore.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { lawTypeAtom, specificLawTypeAtom } from "../store/atoms/lawTypeAtom";
import { motion } from "framer-motion";
import { searchSecNumAtom } from "../store/atoms/searchSeactionAtom";
import { useDebounce } from "../store/hooks/useDebounce";
import { submitAtom } from "../store/atoms/submitAtom";
import axios from "axios";
import { errorResponse, responseAtom } from "../store/atoms/response";
import Response from "./Response";
import '../Responsive/Rknowmore.css'

function KnowMore() {
  const submit = useRecoilValue(submitAtom);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <LawCh />
      <SectionSearch />
      {submit ? <Request /> : null}
    </>
  );
}

function Output({ sectionData, specificLaw,showSaveRL, onRemove, showDelete }) {

  const responseSize =
    sectionData.length > 0 ? Object.keys(sectionData[0]).length : 0;
  
  return (
    <div>
      {sectionData.map((data, index) => {
        let props = {
          law: specificLaw,
          section: data.section,
          showSaveRL: showSaveRL,
          showDelete: showDelete,
          onRemove: () => onRemove(index)
        };
      
        switch (responseSize) {
          case 3:
            props.title = data.title;
            props.desc = data.desc;
            break;
          case 4:
            props.chapter = data.chapter;
            props.secTitle = data.sectionTitle;
            props.secDesc = data.sectionDesc;
            break;
          case 5:
            props.chapter = data.chapter;
            props.chapterTitle = data.chapterTitle;
            props.secTitle = data.sectionTitle;
            props.secDesc = data.sectionDesc;
            break;
          default:
            return null;
        }

        return <Response key={index} {...props} />;
      })}
    </div>
  );
}

function Request() {
  const lawType = useRecoilValue(lawTypeAtom); //civil
  const searchSecNum = useRecoilValue(searchSecNumAtom); //15A
  const specificLaw = useRecoilValue(specificLawTypeAtom); //CPC
  const regex = /(\b\d{1,3}[a-zA-Z]?\b)/g;
  const sectionNum = useMemo(() => searchSecNum.match(regex), [searchSecNum]);

  const [sectionData, setSectionData] = useRecoilState(responseAtom);
  const [error, setError] = useRecoilState(errorResponse);

  const handleRemove = (index) => {
    setSectionData((prevData) => prevData.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.lawprobe.xyz/v1/law/${lawType}/${specificLaw}?sections=${sectionNum.join(
            "&sections="
          )}`
        );

        setSectionData(response.data.lawData);
        setError(null);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "An error occurred while fetching section data"
        );
      }
    };

    if (specificLaw && sectionNum && sectionNum.length > 0) {
      fetchData();
    }
  }, [lawType, specificLaw, sectionNum]);

  return (
    <div>
      {sectionData ? (
        <>
         <Output sectionData={sectionData} specificLaw={specificLaw} showSaveRL={true} onRemove={handleRemove} />
        </>
      ) : (
        <div className="loader"></div>
        
      )}
    </div>
  );
}

function SectionSearch() {
  const specificLawType = useRecoilValue(specificLawTypeAtom);
  const [searchSecNum, setSearchSecNum] = useRecoilState(searchSecNumAtom);
  const [submit, setSubmit] = useRecoilState(submitAtom);
  const specificLawSections = {
    ipc: ["132", "52A", "195A", "509"],
    crpc: ["25A", "145", "268", "481"],
    ida: ["50", "33", "62", "10A"],
    iea: ["90A", "167", "65B", "152"],
    mva: ["2B", "217", "181", "88A"],
    cpc: ["76", "153A", "99", "87B"],
  };

  const handleInputSec = (e) => {
    setSubmit(false);
    setSearchSecNum(e.target.value);
  };
  const debounceFn = useDebounce(handleInputSec, 1000);

  const handleSubmit = () => {
    setSubmit(true);
  };
  return (
    <>
      <div className="secInp">
        {specificLawType ? (
          <>
            <div className="search">
              <input
                type="text"
                placeholder={`Search ${specificLawType} Section....`}
                onChange={debounceFn}
              />
              <button
                className="searchBtn"
                role="button"
                onClick={handleSubmit}
              >
                Search
              </button>
            </div>

            <div className="example" key={specificLawType}>
              <h3>Examples</h3>
              {specificLawSections[specificLawType]?.map((section, index) => (
                <motion.div
                  key={index}
                  className="exSec"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                >
                  Section {section}
                </motion.div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

function LawCh() {
  const [lawType, setLawType] = useRecoilState(lawTypeAtom);
  const [specificLaw, setSpecificLaw] = useRecoilState(specificLawTypeAtom);

  const handleLawTypeChange = (e) => {
    setLawType(e.target.value);
    setSpecificLaw("");
  };

  const handleSpecificLawChange = (e) => {
    setSpecificLaw(e.target.value);
  };

  const specificLawOptions = {
    Civil: [
      { value: "cpc", label: "Code of Civil Procedure (CPC)" },
      { value: "ida", label: "Indian Divorce Act (IDA)" },
    ],
    Criminal: [
      { value: "ipc", label: "Indian Penal Code (IPC)" },
      { value: "crpc", label: "Code of Criminal Procedure (CrPC)" },
    ],
    Others: [
      { value: "iea", label: "Indian Evidence Act (IEA)" },
      { value: "mva", label: "Motor Vehicles Act (MVA)" },
    ],
  };
  return (
    <div className="lawch">
      <div className="law-ch-container">
        <h1 className="law-title">Law Type</h1>
        <select
          className="law-select"
          value={lawType}
          onChange={handleLawTypeChange}
        >
          <option value="">Select Law Type</option>
          <option value="Civil">Civil Law</option>
          <option value="Criminal">Criminal Law</option>
          <option value="Others">Others Law</option>
        </select>
      </div>
      <div className="law-ch-container">
        <h1 className="law-title">Specific Law</h1>
        <select
          className="law-select"
          value={specificLaw}
          onChange={handleSpecificLawChange}
          disabled={!lawType}
        >
          <option value="">Select Specific Law</option>
          {lawType &&
            specificLawOptions[lawType].map((law) => (
              <option key={law.value} value={law.value}>
                {law.label}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}

export default KnowMore;
export { Output };