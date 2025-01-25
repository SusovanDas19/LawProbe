import Card from "./Card";
import { GiBlackBook, GiPikeman, GiBookmark } from "react-icons/gi";
import { GoLaw } from "react-icons/go";
import { VscLaw } from "react-icons/vsc";
import { ImHammer2 } from "react-icons/im";
import { RiGovernmentLine, RiExternalLinkLine } from "react-icons/ri";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { lawTypeAtom, specificLawTypeAtom } from "../store/atoms/lawTypeAtom";

function HomePage() {
  return (
    <div className="home container">
      <div className="heading">
        <h1>A Clear Path to Understanding Indian Law</h1>
        <p>
          Easily navigate India's legal system with comprehensive information on
          laws, procedures, and resources—all in one place.
        </p>
      </div>
      <div className="legalStr">
        <LegalStructure />
      </div>
      <div className="lawtype">
        <LawType />
      </div>
      <div className="knowMoreLink">
        <Knowmore />
      </div>
    </div>
  );
}

function Knowmore() {
  const setLawtype = useSetRecoilState(lawTypeAtom);
  const setSpecificLawtype = useSetRecoilState(specificLawTypeAtom)

  const handleLinkClick = (lawtype,specificLawtype) => {
    setLawtype(lawtype);
    setSpecificLawtype(specificLawtype);
  }

  return (
    <>
      <div>
        <h2>Know more about Major Laws</h2>
      </div>
      <div className="str">
        <div className="strCard">
          <Link to="/knowMore" onClick={()=>handleLinkClick("Criminal","ipc")}>
            <Card>
              <h2 className="strH3">
                Indian Penal Code (IPC)
                <RiExternalLinkLine className="kmIcon"/>
              </h2>
              <p>
                The Indian Penal Code was the official criminal code in the
                Republic of India
              </p>
            </Card>
          </Link>
        </div>
        <div className="strCard">
          <Link to="/knowMore" onClick={()=>handleLinkClick("Criminal","crpc")}>
            <Card>
              <h2 className="strH3">
                Code of Criminal Procedure (CrPC)
                <RiExternalLinkLine className="kmIcon"/>
              </h2>
              <p>
                Outlines procedures for criminal trials, including arrest,
                investigation, and bail.
              </p>
            </Card>
          </Link>
        </div>
        <div className="strCard">
          <Link to="/knowMore" onClick={()=>handleLinkClick("Civil","cpc")}>
            <Card>
              <h2 className="strH3">
                Code of Civil Procedure (CPC)
                <RiExternalLinkLine className="kmIcon"/>
              </h2>
              <p>
                Sets the rules for civil court proceedings, including filing
                suits, summons, and judgments.
              </p>
            </Card>
          </Link>
        </div>
      </div>
    </>
  );
}

function LawType() {
  return (
    <>
      <div>
        <h2>Type of Law in India</h2>
      </div>
      <div className="str">
        <div className="strCard">
          <Card>
            <h3 className="strH3">
              <MdOutlineFamilyRestroom className="strIcon"/>
              Civil Law
            </h3>
            <p>
              Governs private rights and obligations, covering areas such as
              family law, contracts, property, and torts.
            </p>
          </Card>
        </div>
        <div className="strCard">
          <Card>
            <h3 className="strH3">
              <GiPikeman className="strIcon" />
              Criminal Law
            </h3>
            <p>
              Addresses societal offenses like theft, assault, and murder,
              governed by IPC and CrPC
            </p>
          </Card>
        </div>
        <div className="strCard">
          <Card>
            <h3 className="strH3">
              <RiGovernmentLine className="strIcon" />
              Administrative Law
            </h3>
            <p>
              Governs actions and decisions of governmental administrative
              agencies, ensuring they comply with the law.
            </p>
          </Card>
        </div>
        <div className="strCard">
          <Card>
            <h3 className="strH3">
              <GiBookmark className="strIcon" />
              Constitutional Law
            </h3>
            <p>
              Focuses on interpreting the Constitution, covering fundamental
              rights, government powers, and amendments.
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}

function LegalStructure() {
  return (
    <>
      <div>
        <h2>Indian Legal Structure</h2>
      </div>
      <div className="str">
        <div className="strCard">
          <Card>
            <h3 className="strH3">
              <GiBlackBook className="strIcon" />
              The Constitution of India
            </h3>
            <p>
              The Constitution is the supreme law of the land and forms the
              foundation of India's legal system
            </p>
          </Card>
        </div>
        <div className="strCard">
          <Card>
            <h3 className="strH3">
              <GoLaw className="strIcon" />
              Supreme Court
            </h3>
            <p>
              The apex court of India, located in New Delhi, has the highest
              authority on constitutional and legal matters.
            </p>
          </Card>
        </div>
        <div className="strCard">
          <Card>
            <h3 className="strH3">
              <ImHammer2 className="strIcon" />
              High Courts
            </h3>
            <p>
              Each state (or group of states/union territories) has a High Court
              that serves as the highest judicial authority.
            </p>
          </Card>
        </div>
        <div className="strCard">
          <Card>
            <h3 className="strH3">
              <VscLaw className="strIcon" />
              Dist. & Sub. Courts
            </h3>
            <p>
              Each district has a district court and Subordinate courts , such
              as family & magistrates courts
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}

export default HomePage;
