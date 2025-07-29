import { ImCancelCircle } from "react-icons/im";
import { RiErrorWarningFill } from "react-icons/ri";
import { FcOk } from "react-icons/fc";
import "../Response.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { showToastAtom, toastIconColorAtom, toastMsgAtom } from "../store/atoms/toastAtom";
import { useEffect } from "react";

function Toast() {
  const [showToast, setShowToast] = useRecoilState(showToastAtom);
  const toastMsg = useRecoilValue(toastMsgAtom);
  const toastIcon = useRecoilValue(toastIconColorAtom);

  useEffect(() => {
    if (toastMsg || toastIcon) {
      setShowToast(true);

      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);

      return () => clearTimeout(timer); 
    }
  }, [toastMsg, toastIcon, showToast]);

  return (
    <div className={`toastBox ${showToast ? 'visible' : 'hidden'}`}>
      <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        {toastIcon === "red" && <ImCancelCircle className="red" />}
        {toastIcon === "green" && <FcOk className="green" />}
        {toastIcon === "yellow" && <RiErrorWarningFill className="yellow" />}
      </div>
      <div>
        <p className="toastMessage">{toastMsg}</p>
      </div>
    </div>
  );
}

export default Toast;
