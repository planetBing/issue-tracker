import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import IssueCreationPage from "./pages/IssueCreationPage";
import IssueListPage from "./pages/IssueListPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<IssueListPage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/issue"} element={<IssueCreationPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
