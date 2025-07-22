import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Dashboard } from "../view/pages/Dashboard";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
