import { motion } from "framer-motion";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import { sidebarAtom } from "../store/atoms/sidebarAtom";
import { useEffect, useRef } from "react";
import { usernameAtom } from "../store/atoms/usernameAtom";
import { IoBookmarks } from "react-icons/io5";
import { MdWatchLater } from "react-icons/md";
import { savedReadLaterAtom } from "../store/atoms/savedReadLaterAtom";
import "../Responsive/Rheader.css"
import { AiFillHome } from "react-icons/ai";

function Sidebar() {
  const sidebarRef = useRef(null);
  const [sidebar, setSidebar] = useRecoilState(sidebarAtom);
  const navigate = useNavigate();
  const [user, setStoreUsername] = useRecoilState(usernameAtom);
  const setCurrLoc = useSetRecoilState(savedReadLaterAtom);

  const handleLogout = () => {
    setSidebar(false);
    setStoreUsername("Guest");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Close sidebar if clicking outside it
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!sidebar) return null;

  return (
    <>
      {/* Blurred overlay */}
      <div className="sidebar-overlay" onClick={() => setSidebar(false)}></div>
      <motion.div
        ref={sidebarRef}
        className="sidebar"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{
          duration: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 8,
            stiffness: 100,
            restDelta: 0.001,
          },
        }}
      >
        <div className="userName">
          <h3>{user}</h3>
        </div>
        <div className="divider"></div>

        {/* Navigation links visible only on small screens */}
        <div className="sidebar-links">
          <Link to="/" onClick={() => setSidebar(false)}>
            Home
          </Link>
          <Link to="/lawprobeAI" onClick={() => setSidebar(false)}>
            LawProbe AI
          </Link>
          <Link to="/knowMore" onClick={() => setSidebar(false)}>
            Know More
          </Link>
        </div>
  
        <div className="allLinks">
          <Link
            to="/laws/saved"
            onClick={() => {
              setCurrLoc("save");
              setSidebar(false);
            }}
            className="scn"
          >
            Saved Laws <IoBookmarks className="ssIcon"/> 
          </Link>
          <Link
            to="/laws/readLater"
            onClick={() => {
              setCurrLoc("readLater");
              setSidebar(false);
            }}
            className="scn"
          >
            Read Later <MdWatchLater className="ssIcon" />
          </Link>
          <Link to="/aboutUs" onClick={() => setSidebar(false)}>
            About us
          </Link>
        </div>
        <div className="divider"></div>
        <button className="logoutBtn" role="button" onClick={handleLogout}>
          <span className="text">Log Out</span>
        </button>
      </motion.div>
    </>
  );
}

export default Sidebar;
