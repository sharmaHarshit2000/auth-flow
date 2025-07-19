import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/auth/SignupPage";
import SignupVerify from "./components/auth/SignupVerifyForm";
import LoginForm from "./components/auth/LoginForm";
import LoginVerifyPage from "./components/auth/LoginVerifyForm";


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


