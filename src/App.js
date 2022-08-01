import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AdvanceSearch from "./pages/AdvanceSearch";
import AboutPage from "./pages/AboutPage";
import Layout from "./components/layout/Layout";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/AboutPage" element={<AboutPage />} />
        <Route path="/AdvanceSearch" element={<AdvanceSearch />} />
      </Routes>
    </Layout>
  );
}

export default App;
