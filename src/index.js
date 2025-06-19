import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import SearchPage from "./components/SearchPage/SearchPage";
import FilterSearch from "./components/FilterSearch/FilterSearch";
import Detail from "./components/Details/Detail";
import Favorites from "./components/Favourite/Favorites";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/home" element={<Home />} />
          <Route path="/search-page" element={<SearchPage />} />
          <Route path="/filter-search" element={<FilterSearch />} />
          <Route path="/anime/:id" element={<Detail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
