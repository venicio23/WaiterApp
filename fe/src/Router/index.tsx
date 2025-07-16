import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Dashboard } from "../view/pages/Dashboard/Index";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>

        <Route>
          <Route path="/" element={<Dashboard />}></Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
