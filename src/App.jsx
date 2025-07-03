import { useState } from "react";
import "./App.css";
import coupleImage from "./assets/couple.png";
import line from "./assets/line.png";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [showModal, setShowModal] = useState(true);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [rsvpName, setRsvpName] = useState("");
  const [showFinalConfirmation, setShowFinalConfirmation] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [showSeeYouModal, setShowSeeYouModal] = useState(false);
  const [inputError, setInputError] = useState(false);

  const handleRSVPInitialConfirm = (e) => {
    e.preventDefault(); // prevent default form behavior (if wrapped inside a form)
    if (!rsvpName.trim()) {
      setInputError(true);
    } else {
      setInputError(false);
      setShowFinalConfirmation(true);
    }
  };

  const handleRSVPFinalConfirm = async (e) => {
    e.preventDefault();
    if (!rsvpName.trim()) {
      setInputError(true);
      return;
    }

    try {
      await addDoc(collection(db, "guests"), {
        name: rsvpName.trim(),
        timestamp: new Date(),
      });
      setGuestName(rsvpName);
      setShowRSVPModal(false);
      setShowFinalConfirmation(false);
      setShowSeeYouModal(true);
      setInputError(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleNotNow = (e) => {
    e.preventDefault();
    setShowRSVPModal(false);
    setShowFinalConfirmation(false);
    setRsvpName("");
    setInputError(false);
  };

  return (
    <>
      {/* Start-up Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>
              Welcome to our wedding invitation! We are thrilled to have you
              here. Please take a moment to read through the details of our
              special day. If you have any questions or need assistance, feel
              free to reach out. We can't wait to celebrate with you!
            </p>
            <p>To RSVP please click the RSVP button and enter your name.</p>
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* RSVP Modal */}
      {showRSVPModal && (
        <div className="modal">
          <div className="modal-content">
            {!showFinalConfirmation ? (
              <>
                <p>
                  Please RSVP by July 15. We appreciate your confirmation. Thank
                  you!
                </p>
                <form onSubmit={handleRSVPInitialConfirm}>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={rsvpName}
                    onChange={(e) => {
                      setRsvpName(e.target.value);
                      setInputError(false);
                    }}
                    className="input-field"
                  />
                  {inputError && (
                    <p className="error-message">
                      Please enter your name to confirm your RSVP.
                    </p>
                  )}
                  <button type="submit" className="confirm-btn">
                    Enter
                  </button>
                </form>
              </>
            ) : (
              <>
                <p>
                  By proceeding, you acknowledge and confirm your attendance on
                  our special day. We look forward to celebrating with you!
                </p>
                <div className="confirm-buttons">
                  <button className="secondary-btn" onClick={handleNotNow}>
                    Not Now
                  </button>
                  <button
                    className="confirm-btn"
                    onClick={handleRSVPFinalConfirm}
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* See You Modal */}
      {showSeeYouModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Thank you, {guestName}, for your confirmation!</h2>
            <p>See you on our special day!</p>
            <button
              className="close-btn"
              onClick={() => setShowSeeYouModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Main Invitation */}
      <div className="invitation">
        <h2 className="header">WEDDING INVITATION</h2>
        <img src={coupleImage} alt="Couple" className="couple-img" />
        <h1 className="names">Shelyn & Aaron</h1>
        <img src={line} alt="Decorative Line" className="line" />
        <div className="date-time">
          <p className="date">08 . 02 . 25</p>
          <p className="time">Saturday at 3:00 PM</p>
          <button
            className="rsvp"
            onClick={() => {
              setShowRSVPModal(true);
              setShowFinalConfirmation(false);
              setRsvpName("");
              setInputError(false);
            }}
          >
            RSVP
          </button>
          <p className="location">23 Martindale Crt NE, Calgary AB, T3J 2V8</p>
          <p className="dresscode">
            Guests are encouraged to wear a semi-formal dresscode
          </p>
        </div>
        <div className="note">
          <p>A NOTE ON GIFTS:</p>
          <p>
            Your love, laughter, and company at our wedding are well
            appreciated. However, if you wish to help us celebrate with a gift,
            a contribution towards our wishing well will be warmly received.
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
