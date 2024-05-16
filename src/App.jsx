import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound.jsx";
import QR from "./pages/QR/QR.jsx";
// import Start from "./pages/Start/Start.jsx";
import Login from "./pages/Login/Login.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import AdminCommunity from "../src/components/AdminComponents/AdminCommunity.jsx";
import AdminLostItem from "../src/components/AdminComponents/AdminLostItem.jsx";
import AdminNotice from "../src/components/AdminComponents/AdminNotice.jsx";
import SearchCommunity from "./components/AdminComponents/SearchCommunity.jsx";
import SearchLostItem from "./components/AdminComponents/SearchLostItem.jsx";
import PlusNewLostItem from "./components/AdminComponents/PlusNewLostItem.jsx";
const App = () => {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <>
      <QR />
      <div className="content">
        <Routes>
          <Route path="/" exact={true} element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/api/admin/login" element={<Login />} />
          <Route path="admin" element={<Admin />} />
          <Route path="lostitem" element={<AdminLostItem />} />
          <Route path="notice" element={<AdminNotice />} />
          <Route path="community" element={<AdminCommunity />} />
          <Route path="searchcommunity" element={<SearchCommunity />} />
          <Route path="searchlostitem" element={<SearchLostItem />} />
          <Route path="plusitem" element={<PlusNewLostItem />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
