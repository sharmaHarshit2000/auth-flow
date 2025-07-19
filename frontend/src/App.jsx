import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AuthRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;