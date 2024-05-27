import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import IssueCreationPage from "./pages/IssueCreationPage";
import IssueListPage from "./pages/IssueListPage";
import { CurrentUserProvider } from "./contexts/CurrentUserProvider";
import IssueDetailsPage from "./pages/IssueDetailsPage";
import LabelListPage from "./pages/LabelListPage";
import MilestoneListPage from "./pages/MilestoneListPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <CurrentUserProvider>
          <Routes>
            <Route path={"/"} element={<IssueListPage />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/issue"} element={<IssueCreationPage />} />
            <Route path={"/issue/:id"} element={<IssueDetailsPage />} />
            <Route path={"/label"} element={<LabelListPage />} />
            <Route path={"/milestone"} element={<MilestoneListPage />} />
          </Routes>
        </CurrentUserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
