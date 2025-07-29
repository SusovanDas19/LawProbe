import React, { useRef } from "react";
import "../Response.css";
import { IoBookmarks } from "react-icons/io5";
import {
  MdWatchLater,
  MdCancelPresentation,
  MdDeleteSweep,
} from "react-icons/md";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  showToastAtom,
  toastIconColorAtom,
  toastMsgAtom,
} from "../store/atoms/toastAtom";
import { savedReadLaterAtom } from "../store/atoms/savedReadLaterAtom";
import { savedLawsDataAtom } from "../store/atoms/savedLawsDataAtom";
import { readLaterDataAtom } from "../store/atoms/readLaterLawsDataAtom";
import { usePrev } from "../store/hooks/usePrev";
import '../Responsive/Rknowmore.css'

function Response(props) {
  const propsCount = Object.keys(props).length;

  const componentCall = () => {
    if (propsCount === 7) {
      return <Component4 {...props} />;
    } else if (propsCount >= 8) {
      return <Component5_6 {...props} />;
    }
    return null;
  };
  return <div>{componentCall()}</div>;
}



function Component4(props) {
  const [isHoveredRemove, setIsHoveredRemove] = useState(false);
  const [isHoveredSave, setIsHoveredSave] = useState(false);
  const [isHoveredRl, setIsHoveredRl] = useState(false);
  const token = localStorage.getItem("token");

  const setShowToast = useSetRecoilState(showToastAtom);
  const setToastMsg = useSetRecoilState(toastMsgAtom);
  const setToastIcon = useSetRecoilState(toastIconColorAtom);
  
  const setSavedLawsData = useSetRecoilState(savedLawsDataAtom)
  const setReadLaterLawsData = useSetRecoilState(readLaterDataAtom)

  const currLoc = useRecoilValue(savedReadLaterAtom);
  const prevValue = usePrev(currLoc,"savedReadLater");
  const location = currLoc === ""? prevValue : currLoc;

  const content = props.showDelete ? `Delete from ${location} laws` : "Remove";


  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://api.lawprobe.xyz/v1/user/${location}/delete`,
        {
          headers: {
            Authorization: `${token}`,
          },
          data: {
            law: props.law,
            lawSection: props.section,
          },
        }
      );

      if (response.status === 200) {
        setToastMsg(response.data.message);
        setToastIcon("green");
        if(location == "save"){
          setSavedLawsData((prevLaws) => ({
            ...prevLaws,
            [props.law]: prevLaws[props.law].filter(
              (entry) => entry.section !== props.section
            ),
          }));
        }else{
          setReadLaterLawsData((prevLaws) => ({
            ...prevLaws,
            [props.law]: prevLaws[props.law].filter(
              (entry) => entry.section !== props.section
            ),
          }));
        }
      } else if (response.status === 400) {
        setToastMsg(response.data.message);
        setToastIcon("yellow");
      } else if (response.status === 404) {
        setToastMsg("User not found");
        setToastIcon("red");
      } else {
        setToastMsg("Unexpected response");
        setToastIcon("yellow");
      }

      setShowToast(true);
    } catch (error) {
      console.error("Error sending request:", error);
      setToastMsg(
        error.response ? error.response.data.message : "An error occurred"
      );
      setToastIcon("red");
      setShowToast(true);
    }
  };

  const handleBtnClick = async (arg) => {
    try {
      const response = await axios.post(
        `https://api.lawprobe.xyz/v1/user/${arg}`,
        {
          law: props.law,
          sectionNo: props.section,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        setToastMsg(response.data.message);
        setToastIcon("green");
      } else if (response.status === 400) {
        setToastMsg(response.data.message);
        setToastIcon("yellow");
      } else if (response.status === 404) {
        setToastMsg("User not found");
        setToastIcon("red");
      } else {
        setToastMsg("Unexpected response");
        setToastIcon("yellow");
      }

      setShowToast(true);
    } catch (error) {
      console.error("Error sending request:", error);
      setToastMsg(
        error.response ? error.response.data.message : "An error occurred"
      );
      setToastIcon("red");
      setShowToast(true);
    }
  };

  return (
    <div className="mainDiv container">
      <div className="seclaw">
        <h2 style={{ color: "#48CFCB" }}>
          {props.law.toUpperCase()} Section {props.section}
        </h2>
      </div>
      <div className="details">
        <div className="dtlheader">
          <h3>Section Title: {props.title}</h3>
          <h4>Section Description: </h4>
          <p>{props.desc}</p>
          <motion.div
            className="remove"
            onHoverStart={() => setIsHoveredRemove(true)}
            onHoverEnd={() => setIsHoveredRemove(false)}
            whileHover={{
              scale: 1.5,
              rotate: 360,
              transition: { duration: 0.3 },
            }}
            whileTap={{
              scale: 0.8,
              rotate: -10,
              borderRadius: "100%",
              transition: { duration: 1.5 },
            }}
          >
            {props.showDelete ? (
              <button
                className="btnRemove"
                onClick={() => {
                  handleDelete();
                }}
              >
                <MdDeleteSweep className="resIcon" />
              </button>
            ) : (
              <button className="btnRemove" onClick={props.onRemove}>
                <MdCancelPresentation className="resIcon" />
              </button>
            )}
          </motion.div>
          {isHoveredRemove && <p className="removeText">{content}</p>}
        </div>
        <div className="dtlfooter">
          {props.showSaveRL ? (
            <>
              <motion.label
                className="save"
                onHoverStart={() => setIsHoveredSave(true)}
                onHoverEnd={() => setIsHoveredSave(false)}
                whileHover={{
                  scale: 1.5,
                  rotate: 360,
                  transition: { duration: 0.3 },
                }}
                whileTap={{
                  scale: 0.8,
                  rotate: -10, //SAVE
                  borderRadius: "100%",
                  transition: { duration: 1.5 },
                }}
              >
                <button
                  className="tempBtn"
                  onClick={() => handleBtnClick("save")}
                >
                  <IoBookmarks className="resIcon" />
                </button>
              </motion.label>
              {isHoveredSave && <p className="saveText">Save</p>}
            </>
          ) : null}

          {props.showSaveRL ? (
            <>
              <motion.label
                className="readlater"
                onHoverStart={() => setIsHoveredRl(true)}
                onHoverEnd={() => setIsHoveredRl(false)}
                whileHover={{
                  scale: 1.5,
                  rotate: 360,
                  transition: { duration: 0.3 },
                }}
                whileTap={{
                  scale: 0.8, //READ LATER
                  rotate: -10,
                  borderRadius: "100%",
                  transition: { duration: 1.5 },
                }}
              >
                <button
                  className="tempBtn"
                  onClick={() => handleBtnClick("readLater")}
                >
                  <MdWatchLater className="resIcon" />
                </button>
              </motion.label>
              {isHoveredRl && <p className="rLText">Read Later</p>}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Component5_6(props) {
  const [isHoveredRemove, setIsHoveredRemove] = useState(false);
  const [isHoveredSave, setIsHoveredSave] = useState(false);
  const [isHoveredRl, setIsHoveredRl] = useState(false);
  const token = localStorage.getItem("token");

  const setShowToast = useSetRecoilState(showToastAtom);
  const setToastMsg = useSetRecoilState(toastMsgAtom);
  const setToastIcon = useSetRecoilState(toastIconColorAtom);

  const setSavedLawsData = useSetRecoilState(savedLawsDataAtom)
  const setReadLaterLawsData = useSetRecoilState(readLaterDataAtom)

  const currLoc = useRecoilValue(savedReadLaterAtom);
  const prevValue = usePrev(currLoc,"savedReadLater")
  const location = currLoc === ""? prevValue: currLoc
  console.log("Curr loc: ",currLoc)
  console.log("location: ",location);

  const content = props.showDelete ? `Delete from ${location} laws` : "Remove";

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://api.lawprobe.xyz/v1/user/${location}/delete`,
        {
          headers: {
            Authorization: `${token}`,
          },
          data: {
            law: props.law,
            lawSection: props.section,
          },
        }
      );

      if (response.status === 200) {
        setToastMsg(response.data.message);
        setToastIcon("green");
        if(location == "save"){
          setSavedLawsData((prevLaws) => ({
            ...prevLaws,
            [props.law]: prevLaws[props.law].filter(
              (entry) => entry.section !== props.section
            ),
          }));
        }else{
          setReadLaterLawsData((prevLaws) => ({
            ...prevLaws,
            [props.law]: prevLaws[props.law].filter(
              (entry) => entry.section !== props.section
            ),
          }));
        }
      } else if (response.status === 400) {
        setToastMsg(response.data.message);
        setToastIcon("yellow");
      } else if (response.status === 404) {
        setToastMsg("User not found");
        setToastIcon("red");
      } else {
        setToastMsg("Unexpected response");
        setToastIcon("yellow");
      }

      setShowToast(true);
    } catch (error) {
      console.error("Error sending request:", error);
      setToastMsg(
        error.response ? error.response.data.message : "An error occurred"
      );
      setToastIcon("red");
      setShowToast(true);
    }
  };

  const handleBtnClick = async (arg) => {
    try {
      const response = await axios.post(
        `https://api.lawprobe.xyz/v1/user/${arg}`,
        {
          law: props.law,
          sectionNo: props.section,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        setToastMsg(response.data.message);
        setToastIcon("green");
      } else if (response.status === 400) {
        setToastMsg(response.data.message);
        setToastIcon("yellow");
      } else if (response.status === 404) {
        setToastMsg("User not found");
        setToastIcon("red");
      } else {
        setToastMsg("Unexpected response");
        setToastIcon("yellow");
      }

      setShowToast(true);
    } catch (error) {
      console.error("Error sending request:", error);
      setToastMsg(
        error.response ? error.response.data.message : "An error occurred"
      );
      setToastIcon("red");
      setShowToast(true);
    }
  };
  return (
    <div className="mainDiv container">
      <div className="seclaw">
        <h2 style={{ color: "#48CFCB" }}>
          {props.law.toUpperCase()} Section {props.section}
        </h2>
      </div>
      <div className="details">
        <div className="dtlheader">
          <div className="chapter">
            <div className="chapterStyle">
              <h3>Chapter: {props.chapter}</h3>
            </div>
            {props.chapterTitle ? (
              <div className="chapterStyle">
                <h3>
                  Chapter Title:{" "}
                  {props.chapterTitle.charAt(0).toUpperCase() +
                    props.chapterTitle.slice(1)}
                </h3>
              </div>
            ) : null}
          </div>
          <div>
            <h3>Section title: {props.secTitle}</h3>
            <h4>Section Description: </h4>
            <p>{props.secDesc}</p>
          </div>
          <motion.div
            className="remove"
            onHoverStart={() => setIsHoveredRemove(true)}
            onHoverEnd={() => setIsHoveredRemove(false)}
            whileHover={{
              scale: 1.5,
              rotate: 360,
              transition: { duration: 0.3 },
            }}
            whileTap={{
              scale: 0.8,
              rotate: -10,
              borderRadius: "100%",
              transition: { duration: 1.5 },
            }}
          >
            {props.showDelete ? (
              <button
                className="btnRemove"
                onClick={() => {
                  props.onRemove;
                  handleDelete();
                }}
              >
                <MdDeleteSweep className="resIcon" />
              </button>
            ) : (
              <button className="btnRemove" onClick={props.onRemove}>
                <MdCancelPresentation className="resIcon" />
              </button>
            )}
          </motion.div>
          {isHoveredRemove && <p className="removeText">{content}</p>}
        </div>

        <div className="dtlfooter">
          {props.showSaveRL ? (
            <>
              <motion.label
                className="save"
                onHoverStart={() => setIsHoveredSave(true)}
                onHoverEnd={() => setIsHoveredSave(false)}
                whileHover={{
                  scale: 1.5,
                  rotate: 360,
                  transition: { duration: 0.3 },
                }}
                whileTap={{
                  scale: 0.8,
                  rotate: -10, //SAVE
                  borderRadius: "100%",
                  transition: { duration: 1.5 },
                }}
              >
                <button
                  className="tempBtn"
                  onClick={() => handleBtnClick("save")}
                >
                  <IoBookmarks className="resIcon" />
                </button>
              </motion.label>
              {isHoveredSave && <p className="saveText">Save</p>}
            </>
          ) : null}

          {props.showSaveRL ? (
            <>
              <motion.label
                className="readlater"
                onHoverStart={() => setIsHoveredRl(true)}
                onHoverEnd={() => setIsHoveredRl(false)}
                whileHover={{
                  scale: 1.5,
                  rotate: 360,
                  transition: { duration: 0.3 },
                }}
                whileTap={{
                  scale: 0.8, //READ LATER
                  rotate: -10,
                  borderRadius: "100%",
                  transition: { duration: 1.5 },
                }}
              >
                <button
                  className="tempBtn"
                  onClick={() => handleBtnClick("readLater")}
                >
                  <MdWatchLater className="resIcon" />
                </button>
              </motion.label>
              {isHoveredRl && <p className="rLText">Read Later</p>}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Response;
