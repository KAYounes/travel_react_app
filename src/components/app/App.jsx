import { Routes, Route } from "react-router-dom";

import Home from "../home";
import Dashboard from "../Admin"
import TourCard from "../TourCard/TourCard";
import TourCardPlaceholder from "../TourCard/TourCardPlaceholder";
import AdminCardEditor from "../AdminCardEditor/AdminCardEditor";
import NoPageFound from "../NoPageFound/NoPageFound";

// Clears console after hot reload
if (import.meta.hot) {
  import.meta.hot.on("vite:beforeUpdate", () => console.clear());
}

function App()
{
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/edit" element={<AdminCardEditor />}>
        <Route index/>
        <Route path=":id" />
      </Route>
      <Route path="*" element={<NoPageFound />}/>
      
    </Routes>
  )
}

export default App
