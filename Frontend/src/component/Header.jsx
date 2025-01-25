import React from "react";
import whiteLogo from "../assets/logoWhite.png";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useRecoilState } from "recoil";
import { sidebarAtom } from "../store/atoms/sidebarAtom";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";

function Header() {
  const [openSidebar, setSidebar] = useRecoilState(sidebarAtom);
  return (
    <>
      <div className="header">
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
          <div className="theamChange">
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
          <div>
            <button onClick={() => setSidebar((curr) => !curr)}>
              <div className="sidebarIcon">
                <TbLayoutSidebarLeftCollapseFilled />
              </div>
             
                {/* <GoSidebarExpand className="sidebarIcon"/> */}
             
            </button>
          </div>
        </div>
      </div>
      {openSidebar ? <Sidebar /> : null}
    </>
  );
}

export default Header;
