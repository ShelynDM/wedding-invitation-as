import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import GuestList from "./GuestList";

function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/guest-list" element={<GuestList />} />
      </Routes>
    </Router>
  );
}

export default Root;
