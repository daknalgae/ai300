import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../routes/Home";

export default function AppRouter() {
  return (
    <div>
      <Router>
        <Routes>
          <>
            <Route exact path="/" element={<Home />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        </Routes>
      </Router>
    </div>
  );
}
