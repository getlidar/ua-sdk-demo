import { Route, Routes } from "react-router-dom";
import { Home } from './Home';
import { ApiForm } from "./ApiForm";
import { EventsPage } from "./EventsPage";

export function Body() {
  return(
    <Routes>
      <Route path="/events-example" element={<EventsPage/>} />
      <Route path="/ua-example" element={<ApiForm/>} />
      <Route path="*" element={<Home/>} />
    </Routes>
  );
}