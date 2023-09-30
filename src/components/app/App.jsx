import { Routes, Route } from "react-router-dom";

import Home from "../home";
import Dashboard from "../Admin"

// Clears console after hot reload
if (import.meta.hot) {
  import.meta.hot.on("vite:beforeUpdate", () => console.clear());
}

function App()
{
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="admin" element={<Dashboard />}/>
    </Routes>
  )
}

export default App
