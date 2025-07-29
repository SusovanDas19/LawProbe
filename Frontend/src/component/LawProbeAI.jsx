import React, { useEffect, useState } from "react";
import axios from "axios";
import "../LawProbeAI.css";
import { motion } from "framer-motion";
import { CiCircleRemove } from "react-icons/ci";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { aiResponseLoader } from "../store/atoms/aiResponseLoader";
import '../Responsive/RlawprobeAi.css'

function LawProbeAI() {
  const [airesponse, setAiResponse] = useState([]);
  const responseLength = airesponse.length;
  const [hovered, setIsHovered] = useState(null);
  const setLoading = useSetRecoilState(aiResponseLoader);

   useEffect(()=>{
    window.scrollTo(0,0);
   },[])


  const handleNewQuestion = async (question) => {
    if (!question.trim()) {
      alert("Please enter a question");
      return;
    }

    try {
      setLoading(true);
      // Send request to the backend
      const result = await axios.post(
        "https://api.lawprobe.xyz/v1/ai/generate-response",
        { question }
      );

      // Extract the response text
      const text =
        result.data?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response text available";
      const cleanedText = text.replace(/\*+/g, "");
      // Add question and response to the airesponse state
      setAiResponse((prevAiResponse) => [
        ...prevAiResponse,
        { question, response: cleanedText },
      ]);
      setLoading(false);
    } catch (error) {
      console.error("Error during API call:", error.message);
      alert("Something went wrong. Please try again later.");
    }
  };

  const deleteDiv = (indexToRemove) => {
    setAiResponse((prevAiResponse) =>
      prevAiResponse.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="mainAi">
      {responseLength == 0 ? (
        <>
          <HelloUser />
          <SearchSection onNewQuestion={handleNewQuestion} />
        </>
      ) : null}

      <div className="aiResponse">
        {airesponse.map((item, index) => (
          <motion.div
            key={index}
            className="mainAiDiv"
            onHoverStart={() => setIsHovered(index)}
            onHoverEnd={() => setIsHovered(null)}
          >
            <div id="q">Q: {item.question}</div>
            <div id="a">
              {item.response.split("<br>").map((text, index) => (
                <React.Fragment key={index}>
                  {text}
                  {index < item.response.split("<br>").length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>

            {hovered == index ? (
              <motion.button
                onClick={() => deleteDiv(index)}
                className="responseRemove"
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.3 },
                }}
                whileTap={{
                  scale: 0.8,
                  borderRadius: "200%",
                  transition: { duration: 1.5 },
                }}
              >
                Remove <CiCircleRemove className="aiRemove" />
              </motion.button>
            ) : null}
            <motion.button
                onClick={() => deleteDiv(index)}
                className="responseRemove2"
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.3 },
                }}
                whileTap={{
                  scale: 0.8,
                  borderRadius: "200%",
                  transition: { duration: 1.5 },
                }}
              >
                Remove <CiCircleRemove className="aiRemove" />
              </motion.button>
          </motion.div>
        ))}
      </div>
      {responseLength ? (
        <SearchSection onNewQuestion={handleNewQuestion} />
      ) : null}
    </div>
  );
}

function SearchSection({ onNewQuestion }) {
  const [question, setQuestion] = useState("");
  const loading = useRecoilValue(aiResponseLoader);
  const handleEnter = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (question.trim()) {
        await onNewQuestion(question);
        setQuestion(""); // Clear input after submitting
      }
    }
  };

  return (
    <div className="aiSearch">
      {loading ? <div className="generating"></div> : null}
      <textarea
        placeholder="Ask LawProbe AI..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleEnter}
      />
    </div>
  );
}

function HelloUser() {
  const username = localStorage.getItem("username");
  return (
    <motion.div
      className="subAidiv"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        className="headingAI"
        initial={{ opacity: 0, x: -120 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.9, ease: "easeInOut" }}
      >
        <h1>Hello, </h1>
        <h1 className="user">{username}</h1>
      </motion.div>
      <motion.p
        className="headingP"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5, ease: "easeInOut" }}
      >
        Provide a detailed description of the incident to receive relevant legal
        sections under Indian law.
      </motion.p>
    </motion.div>
  );
}

export default LawProbeAI;
