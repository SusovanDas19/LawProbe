import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import { sidebarAtom } from "../store/atoms/sidebarAtom";
import { useEffect, useRef } from "react";
import { usernameAtom } from "../store/atoms/usernameAtom";
import { IoBookmarks } from "react-icons/io5";
import { MdWatchLater} from "react-icons/md";
import { savedReadLaterAtom } from "../store/atoms/savedReadLaterAtom";

function Sidebar() {
  const sidebarRef = useRef(null);
  const [sidebar, setSidebar] = useRecoilState(sidebarAtom);
  const navigate = useNavigate();
  const [user, setStoreUsername] = useRecoilState(usernameAtom);
  const setCurrLoc = useSetRecoilState(savedReadLaterAtom)

  const handleLogout = () => {
    setSidebar(false);
    setStoreUsername("Guest");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  // Function to handle clicks outside the sidebar
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebar(false); // Close the sidebar
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener on unmount
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return sidebar ? (
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
      <div className="userName">
        <Link to="/laws/saved" onClick={()=>setCurrLoc("save")}>Saved Laws <IoBookmarks/></Link>
        
      </div>
      <div className="userName">
        <Link to="/laws/readLater" onClick={()=>setCurrLoc("readLater")}>Read Later <MdWatchLater/></Link>
        
      </div>
      <div className="userName">
        <Link to="/aboutUs">About us</Link>
      </div>
      <div className="divider"></div>

      <button className="logoutBtn" role="button" onClick={handleLogout}>
        <span className="text">Log Out</span>
      </button>
    </motion.div>
  ) : null;
}

export default Sidebar;
