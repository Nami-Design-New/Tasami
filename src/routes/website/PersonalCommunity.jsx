import { Routes, Route } from "react-router";
import CommunityHeader from "./CommunityHeader";
import CommunityTabs from "../..//ui/website/CommunityTabs";
import Consultations from "./Consultations";
import Encounters from "./Encounters";
import Posts from "./Posts";
import Views from "./Views";

export default function PersonalCommunity() {
  return (
    <section className="page community-page">
      <div className="container">
        <CommunityHeader />
        <CommunityTabs />

        <Routes>
          <Route path="consultations" element={<Consultations />} />
          <Route path="Encounters" element={<Encounters />} />
          <Route path="posts" element={<Posts />} />
          <Route path="views" element={<Views />} />
        </Routes>
      </div>
    </section>
  );
}
