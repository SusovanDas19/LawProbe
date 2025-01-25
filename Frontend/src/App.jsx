import { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Outlet,
  useLocation,
  Navigate,
} from "react-router-dom";
import { RecoilRoot, useRecoilState } from "recoil";
import Header from "./component/Header";
import HomePage from "./component/HomePage";
import Footer from "./component/Footer";
import { showFooterAtom } from "./store/atoms/showFooterAtom";
import KnowMore from "./component/KnowMore";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Toast from "./component/Toast";
import { showToastAtom } from "./store/atoms/toastAtom";
import SavedLaws from "./component/SavedLaws";
import ReadLater from "./component/ReadLater";
import AboutUs from "./component/AboutUs";
import ContactUs from "./component/ContactUs";
import Terms from "./component/Terms";
import LawProbeAI from "./component/LawProbeAI";

function App() {
  const token = localStorage.getItem("token");
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={token ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/signup"
              element={token ? <Navigate to="/" /> : <Signup />}
            />

            <Route path="/" element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/knowMore" element={<KnowMore />} />
              <Route path="/laws/saved" element={<SavedLaws />} />
              <Route path="/laws/readLater" element={<ReadLater />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/contactUs" element={<ContactUs />} />
              <Route path="/termsOfService" element={<Terms />} />
              <Route path="/lawprobeAI" element={<LawProbeAI/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

function Layout() {
  const [showFooter, setShowFooter] = useRecoilState(showFooterAtom);
  const location = useLocation();
  const [showToast, setShowToast] = useRecoilState(showToastAtom);
  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      setShowFooter(isBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    setShowFooter(false);
  }, [location]);

  return (
    <div className="layout">
      <div className="header">{<Header />}</div>
      <div className="main">
        {<Outlet />}
        {showToast && <Toast />}
      </div>
      {showFooter && (
        <div className="footer">
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
