import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import IssueCreationPage from "./pages/IssueCreationPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/issue"} element={<IssueCreationPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
