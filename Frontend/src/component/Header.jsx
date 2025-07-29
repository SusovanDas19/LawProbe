import whiteLogo from "../assets/logoWhite.png";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useRecoilState } from "recoil";
import { sidebarAtom } from "../store/atoms/sidebarAtom";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import "../Responsive/Rheader.css"

function Header() {
  const token = localStorage.getItem("token")
  const [openSidebar, setSidebar] = useRecoilState(sidebarAtom);
  return (
    <>
      <div className="header2">
        <Link to="/">
          <div id="logo">
            <img src={whiteLogo} alt="" />
          </div>
        </Link>

        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/lawprobeAI">LawProbe AI</Link>
          <Link to="/knowMore">Know More</Link>
        </div>
        <div className="menu">
          {token ? <button onClick={() => setSidebar((curr) => !curr)}>
            <div className="sidebarIcon">
              <TbLayoutSidebarLeftCollapseFilled className="sI"/>
            </div>
          </button>: <Link to="/signup"><button className="signbtn2">Signup</button></Link>}
          
        </div>
      </div>
      {openSidebar ? <Sidebar /> : null}
    </>
  );
}

export default Header;
