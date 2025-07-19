import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import SignupVerify from "./components/SignupVerify";
import LoginForm from "./components/LoginForm";
import LoginVerifyPage from "./components/LoginVerify";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup/verify" element={<SignupVerify />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login/verify" element={<LoginVerifyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;


