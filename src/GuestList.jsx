import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import "./GuestList.css"; // Create this file if you'd like to style

function GuestList() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "guests"));
        const guestList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGuests(guestList);
      } catch (error) {
        console.error("Error fetching guests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  return (
    <div className="guest-list-container">
      <h1>Guest List</h1>
      {loading ? (
        <p>Loading guests...</p>
      ) : (
        <ul>
          {guests.map((guest) => (
            <li key={guest.id}>{guest.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GuestList;
