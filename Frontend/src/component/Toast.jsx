import { ImCancelCircle } from "react-icons/im"; //wrong
import { RiErrorWarningFill } from "react-icons/ri"; //invalid
import { FcOk } from "react-icons/fc"; //correct
import "../Response.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { showToastAtom, toastIconColorAtom, toastMsgAtom } from "../store/atoms/toastAtom";
import { useEffect } from "react";

function Toast() {
  const [showToast, setShowToast] = useRecoilState(showToastAtom);
  const toastMsg = useRecoilValue(toastMsgAtom);
  const toastIcon = useRecoilValue(toastIconColorAtom);

  useEffect(() => {
    // Show the toast when the message or icon changes
    if (toastMsg || toastIcon) {
      setShowToast(true);

      // Hide the toast after 3 seconds
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);

      return () => clearTimeout(timer); // Cleanup the timer on unmount
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
        <p>{toastMsg}</p>
      </div>
    </div>
  );
}

export default Toast;
