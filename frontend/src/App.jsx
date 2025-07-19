import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import SignupVerify from "./components/SignupVerify";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup/verify" element={<SignupVerify />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;


