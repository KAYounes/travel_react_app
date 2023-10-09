import { Routes, Route } from "react-router-dom";
//
import Home from "../home";
import Dashboard from "../Admin";
import TourCard from "../TourCard/TourCard";
import TourCardPlaceholder from "../TourCard/TourCardPlaceholder";
import AdminCardEditor from "../AdminCardEditor/AdminCardEditor";
import NoPageFound from "../NoPageFound/NoPageFound";
//
import { IKContext } from "imagekitio-react";
import { IKIO_ENDPOINT as IK_URL_ENDPOINT, IKIO_PUBKEY as IK_API_PUB_KEY } from "../../constants";
//

// Clears console after hot reload
if (import.meta.hot) {
  import.meta.hot.on("vite:beforeUpdate", () => console.clear());
}

export default function App() {
  return (
    <IKContext urlEndpoint={IK_URL_ENDPOINT} publicKey={IK_API_PUB_KEY}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/edit" element={<AdminCardEditor />}>
          <Route index />
          <Route path=":id" />
        </Route>
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </IKContext>
  );
}