import { Route, Routes } from "react-router-dom";
import { Home } from './Home';
import EventsPage from "./EventsPage";

export function Body() {
  return (
    <Routes>
      <Route path="/events-example" element={<EventsPage />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}