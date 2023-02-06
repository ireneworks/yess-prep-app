import { BrowserRouter, Route, Routes } from "react-router-dom";
import CatViewer from "./pages/catViewer/catViewer";
import WorkingHours from "./pages/workingHours/workingHours";
import Layout from "./components/layout/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<CatViewer />} />
          <Route path="cat-viewer" element={<CatViewer />} />
          <Route path="working-hours" element={<WorkingHours />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
